import * as AWS from "aws-sdk";
import { PinoLogger } from "nestjs-pino";
import { ICryptoKey } from "./i-crypto-key";
import { ICryptoKeyOptions } from "./options";
import { InjectSentry, SentryService } from "@ntegral/nestjs-sentry";
import { Signer } from "@web3-kms-signer/core";
import { KMSWallets } from "@web3-kms-signer/kms-wallets";
import { KMSProviderAWS } from "@web3-kms-signer/kms-provider-aws";
import { CryptoKeyManagementException } from "./exceptions";
import { KMS_DESCRIPTION, KMS_KEY_SPEC, KMS_KEY_USAGE } from "../constants";
import { includes } from "@bit-core-api/shared-utils-lib";
import { KMSClientConfig } from "@aws-sdk/client-kms";

export abstract class CryptoKeyManagement implements ICryptoKey {
  protected readonly awsConfig: AWS.ConfigurationOptions;
  protected readonly cryptoKey: AWS.KMS;

  constructor(protected readonly storageOptions: ICryptoKeyOptions, protected readonly logger: PinoLogger, @InjectSentry() protected readonly sentry: SentryService) {
    this.awsConfig = {
      region: storageOptions.region,
      credentials: {
        accessKeyId: storageOptions.accessKeyId,
        secretAccessKey: storageOptions.secretAccessKey,
      },
    };
    AWS.config.update(this.awsConfig);
    // Create an instance of the KMS service
    this.cryptoKey = new AWS.KMS();
  }

  public async createCryptoKeyAsync(): Promise<string> {
    try {
      const params: AWS.KMS.CreateKeyRequest = {
        Description: KMS_DESCRIPTION,
        KeyUsage: KMS_KEY_USAGE,
        KeySpec: KMS_KEY_SPEC,
      };
      const data: AWS.KMS.CreateKeyResponse = await this.cryptoKey.createKey(params).promise();
      return data?.KeyMetadata?.KeyId;
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new CryptoKeyManagementException(ex);
    }
  }

  public async getWalletAddressAsync(cryptoKeyId: string, cryptoSigner: Signer): Promise<string> {
    try {
      const walletAddress = await cryptoSigner.wallets.getAddressHex(cryptoKeyId);
      return walletAddress;
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new CryptoKeyManagementException(ex);
    }
  }

  public async getPublicKeyAsync(cryptoKeyId: string): Promise<Buffer> {
    try {
      const getPublicKeyParams: AWS.KMS.GetPublicKeyRequest = {
        KeyId: cryptoKeyId,
      };
      const data: AWS.KMS.GetPublicKeyResponse = await this.cryptoKey.getPublicKey(getPublicKeyParams).promise();
      return Buffer.from(data?.PublicKey.toString("base64"), "hex");
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new CryptoKeyManagementException(ex);
    }
  }

  public async createSignerAsync(chainId: number): Promise<Signer> {
    try {
      const provider = new KMSProviderAWS(this.awsConfig as KMSClientConfig);

      const signer = new Signer(new KMSWallets(provider), chainId);
      return signer;
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new CryptoKeyManagementException(ex);
    }
  }

  public async deleteCryptoKeyAsync(cryptoKeyId: string, daysUntilDeletion: number = 7): Promise<boolean> {
    try {
      if (daysUntilDeletion < 7 || daysUntilDeletion > 30) {
        throw new Error("Deletion period must be between 7 and 30 days.");
      }

      const params: AWS.KMS.ScheduleKeyDeletionRequest = {
        KeyId: cryptoKeyId,
        PendingWindowInDays: daysUntilDeletion, // Deletion period between 7 and 30 days
      };

      await this.cryptoKey.scheduleKeyDeletion(params).promise();
      this.logger.info(`Crypto key ${cryptoKeyId} scheduled for deletion in ${daysUntilDeletion} days.`);
      return true;
    } catch (ex) {
      this.logger.error(ex);
      this.sentryLog(ex);
      throw new CryptoKeyManagementException(ex);
    }
  }

  private sentryLog(ex: Error): void {
    let error = "";
    if (includes(ex.stack, "403")) {
      error = "Invalid token";
    } else if (includes(ex.stack, "400")) {
      error = "Invalid bucket";
    }
    this.sentry.error(`Crypto key management Error: ${error}`);
  }
}
