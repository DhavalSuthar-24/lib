import { QldbDriver, RetryConfig, Result, TransactionExecutor } from "amazon-qldb-driver-nodejs";
import { Agent } from "https";
import { PinoLogger } from "nestjs-pino";
import { IImmutableRepo } from "./i-immutable.repo";
import { IQldbLedgerOptions } from "./options";
import { ClientConfiguration } from "aws-sdk/clients/acm";
import { QldbException } from "./qldb.exception";
import { IRecordHistory } from "./types";
import { first, last, map, omit, toPairs } from "@bit-core-api/shared-utils-lib";

export abstract class QldbBaseRepo<T extends Object, TKey> implements IImmutableRepo<T, TKey> {
  protected readonly agentForQldb: Agent;
  protected readonly serviceConfigurationOptions: ClientConfiguration;
  protected readonly retryConfig: RetryConfig;

  constructor(protected readonly qldbLedgerOptions: IQldbLedgerOptions, protected readonly logger: PinoLogger) {
    this.agentForQldb = new Agent({
      keepAlive: true,
      maxSockets: qldbLedgerOptions.maxConcurrentTransactions,
    });

    this.serviceConfigurationOptions = {
      region: qldbLedgerOptions.region,
      httpOptions: {
        agent: this.agentForQldb,
      },
    };

    this.retryConfig = new RetryConfig(qldbLedgerOptions.retryLimit);
  }

  public get idColumnName(): keyof T {
    return "id" as keyof T;
  }

  public async getAsync(pk: TKey): Promise<T> {
    this.logger.info(`[${this.qldbLedgerOptions.ledgerName} ledger]: Getting data on table ${this.qldbLedgerOptions.tableName} with ${this.idColumnName as string}: ${pk}`);
    try {
      const result = await this.execute(`SELECT * FROM ${this.qldbLedgerOptions.tableName} WHERE ${this.idColumnName as string} = ?`, pk);
      return first(this.mapResultsToObjects<T>(result));
    } catch (ex) {
      this.logger.error(ex);
      throw new QldbException(ex);
    }
  }

  /**
   * Amazon QLDB stores the complete history of every document in a table. You can see all three revisions of the document you previously inserted, updated, and deleted in Updating and deleting documents by querying the built-in history function.
   * The history function in QLDB is a PartiQL extension that returns revisions from the system-defined view of your table. So, it includes both your data and the associated metadata in the same schema as the committed view.
   * @param pk
   * @returns Promise<IRecordHistory<T>[]>
   */
  public async getHistoryAsync(pk: TKey): Promise<IRecordHistory<T>[]> {
    this.logger.info(`[${this.qldbLedgerOptions.ledgerName} ledger]: Getting history data on table ${this.qldbLedgerOptions.tableName} with ${this.idColumnName as string}: ${pk}`);
    try {
      const result = await this.execute(`SELECT * FROM history(${this.qldbLedgerOptions.tableName}) AS h WHERE h.data.${this.idColumnName as string} = ?`, pk);
      return this.mapResultsToObjects<IRecordHistory<T>>(result);
    } catch (ex) {
      this.logger.error(ex);
      throw new QldbException(ex);
    }
  }

  public async createAsync(entry: T): Promise<T> {
    this.logger.info(`[${this.qldbLedgerOptions.ledgerName} ledger]: Inserting entry to table ${this.qldbLedgerOptions.tableName}`);
    this.logger.debug(entry, `"Entry received"`);

    try {
      const result = await this.execute(`INSERT INTO ${this.qldbLedgerOptions.tableName} ?`, [entry]);
      return first(this.mapResultsToObjects<T>(result));
    } catch (ex) {
      this.logger.error(ex);
      throw new QldbException(ex);
    }
  }

  public async updateAsync(entry: T): Promise<T> {
    this.logger.info(
      `[${this.qldbLedgerOptions.ledgerName} ledger]: Updating entry to table ${this.qldbLedgerOptions.tableName} with ${this.idColumnName as string} ${entry[this.idColumnName]}`,
    );
    this.logger.debug(entry, `"Entry received"`);
    try {
      const pairs = toPairs(omit(entry, [this.idColumnName]));
      let keys = map(pairs, first);
      keys = map(keys, (k) => `u.${k} = ?`);
      const values = map(pairs, last);
      const query = `UPDATE ${this.qldbLedgerOptions.tableName} AS u SET ${keys.join(", ")} WHERE ${this.idColumnName as string} = ?`;
      this.logger.debug(query);
      const result = await this.execute(query, ...values, entry[this.idColumnName]);
      return first(this.mapResultsToObjects<T>(result));
    } catch (ex) {
      this.logger.error(ex);
      throw new QldbException(ex);
    }
  }

  public async deleteAsync(pk: TKey): Promise<boolean> {
    this.logger.info(`[${this.qldbLedgerOptions.ledgerName} ledger]: Deleting entry to table ${this.qldbLedgerOptions.tableName} with ${this.idColumnName as string}: ${pk}`);
    try {
      await this.execute(`DELETE FROM ${this.qldbLedgerOptions.tableName} WHERE ${this.idColumnName as string} = ?`, pk);
      return true;
    } catch (ex) {
      this.logger.error(ex);
      throw new QldbException(ex);
    }
  }

  public async execute(statement: string, ...parameters: any[]): Promise<Result> {
    const driver = this.createDriver();
    return await driver
      .executeLambda(async (txn: TransactionExecutor) => await txn.execute(statement, ...parameters))
      .finally(() => {
        driver.close();
      });
  }

  public mapResultsToObjects<T>(result: Result, subproperty?: string): T[] {
    if (!result) {
      return null;
    }

    const resultList = result.getResultList();

    if (!resultList?.length) {
      return null;
    }

    return resultList.map((value) => {
      const parsedJson = JSON.parse(JSON.stringify(value));

      return subproperty ? parsedJson[subproperty] : parsedJson;
    });
  }

  private createDriver(): QldbDriver {
    return new QldbDriver(this.qldbLedgerOptions.ledgerName, this.serviceConfigurationOptions, this.qldbLedgerOptions.maxConcurrentTransactions, this.retryConfig);
  }
}
