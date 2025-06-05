import { PinoLogger } from "nestjs-pino";
import { createClient, RedisClientType } from "redis";
import { OnApplicationBootstrap } from "@nestjs/common";
import { fromJson, isNilOrEmpty, toJson } from "@bit-core-api/shared-utils-lib";
import { IBaseRedisService } from "./i-base-redis.service";
import { RedisException } from "./exceptions";
import { IRedisOptions } from "./options";
import { ServiceConnectionStatusCheck } from "../types/service-connection-status-check";

export abstract class BaseRedisService implements OnApplicationBootstrap, IBaseRedisService {
  private connected = false;
  private ready = false;
  private reconnecting = false;
  private reconnectionAttemps = 0;
  private redisClient: RedisClientType;

  protected constructor(protected readonly options: IRedisOptions, protected readonly logger: PinoLogger) {}

  public async onApplicationBootstrap(): Promise<void> {
    this.logger.info(`Connecting to Redis at host: ${this.options.host}, port: ${this.options.port}`);
    this.createClient();
    this.addListeners();
    await this.startConnectionAsync();
  }

  public connectAsync(): Promise<void> {
    // This service is already connected on application bootstrap.
    return Promise.resolve();
  }

  public async checkConnectionStatusAsync(): Promise<ServiceConnectionStatusCheck> {
    if (!this.connected) {
      return ServiceConnectionStatusCheck.buildDisconnected("Not connected");
    }

    if (!this.ready) {
      return ServiceConnectionStatusCheck.buildConnected();
    }

    try {
      const response = await this.redisClient.ping();
      this.logger.info(`Redis PING response: ${response}`);
      return ServiceConnectionStatusCheck.buildReady();
    } catch (ex) {
      this.logger.warn("Redis connection failed");
      this.logger.error(ex);
      return ServiceConnectionStatusCheck.buildDisconnected(ex.message);
    }
  }

  public async setAsync<T>(key: string, value: T, expiration?: number, prefix?: string): Promise<T> {
    try {
      key = !isNilOrEmpty(prefix) ? `${prefix}:${key}` : key;
      await this.redisClient.set(key, toJson(value), { EX: expiration });
      const result = await this.redisClient.get(key);
      return fromJson(result);
    } catch (ex) {
      this.logger.error(ex);
      throw new RedisException(ex);
    }
  }

  public async getAsync<T>(key: string): Promise<T> {
    try {
      const value = await this.redisClient.get(key);
      return !isNilOrEmpty(value) ? fromJson(value) : null;
    } catch (ex) {
      this.logger.error(ex);
      throw new RedisException(ex);
    }
  }

  public async deleteAsync(key: string): Promise<boolean> {
    try {
      await this.redisClient.del(key);
      return true;
    } catch (ex) {
      this.logger.error(ex);
      throw new RedisException(ex);
    }
  }

  public async getKeyExpirationTimeAsync(key: string): Promise<number> {
    try {
      return await this.redisClient.ttl(key);
    } catch (ex) {
      this.logger.error(ex);
      throw new RedisException(ex);
    }
  }

  /**
   * Creates a new Redis client.
   */
  private createClient() {
    //TODO: @devs Need to update this logic when AWS secret is implemented, currently we are not able to remove redis password key or set value as 0 in github secret
    const authPart =
      !isNilOrEmpty(this.options.username) && !isNilOrEmpty(this.options.password) && this.options.password !== "null_value"
        ? `${this.options.username}:${this.options.password}@`
        : "";
    this.redisClient = createClient({
      name: this.options.connectionName,
      url: `${this.options.transport}://${authPart}${this.options.host}:${this.options.port}`,
      socket: {
        connectTimeout: this.options.reconnectionDelayInMilliseconds,
        // Disable reconnect strategy, we will handle it manually. It seems to be buggy.
        reconnectStrategy: false,
      },
    });
  }

  /**
   * Adds listeners to the Redis client.
   */
  private addListeners(): void {
    this.redisClient.on("error", (error) => {
      this.logger.error(error, "Redis error");
      this.connected = false;
      this.ready = false;
      this.startReconnectionStrategy();
    });
    this.redisClient.on("ready", () => {
      this.logger.info("Redis ready");
      this.ready = true;
    });
    this.redisClient.on("connect", () => {
      this.logger.info("Redis connected");
      this.connected = true;
    });
    this.redisClient.on("disconnect", () => {
      this.logger.warn("Redis disconnected");
      this.connected = false;
      // Important not to call startReconnectionStrategy here, it is already called on error.
    });
  }

  /**
   * Starts the connection to Redis. In case of failure, it will start the reconnection strategy.
   */
  private async startConnectionAsync(): Promise<void> {
    this.logger.info("Connecting to Redis");
    try {
      await this.redisClient.connect();
    } catch (ex) {
      this.logger.warn("Failed to connect to Redis");
      this.startReconnectionStrategy();
    }
  }

  /**
   * Starts the reconnection strategy. It will try to reconnect to Redis after a delay.
   */
  private startReconnectionStrategy(): void {
    if (this.reconnecting) {
      this.logger.debug("Reconnection strategy already started.");
      return;
    }

    this.logger.debug("Starting reconnection strategy.");
    if (this.connected) {
      this.redisClient.disconnect();
    }

    this.reconnecting = true;
    setTimeout(() => {
      this.logger.info("Attempting to reconnect to Redis");
      this.redisClient
        .connect()
        .then(() => {
          this.reconnecting = false;
          this.reconnectionAttemps = 0;
        })
        .catch((ex) => {
          this.reconnecting = false;
          this.reconnectionAttemps++;
          this.logger.error(ex);

          if (this.reconnectionAttemps > this.options.maxReconnectionAttempts) {
            this.logger.error("Reconnection attempts failed. Stopping reconnection strategy.");
            return;
          }

          this.startReconnectionStrategy();
        });
    }, this.options.reconnectionDelayInMilliseconds);
  }
}
