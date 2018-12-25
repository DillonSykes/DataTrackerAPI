import {UpsertOptions} from "../models/upsert-options";
import {config, ConfigModel} from "./config";
import {AWSError, DynamoDB} from "aws-sdk";
import * as logger from "winston";
import {GetOptions} from "../models/get-params";
import {DeleteOptions} from "../models/delete-options";
import {ObjectUtils} from "../utils/object-utils";
import {GetAllOptions} from "../models/get-all-params";

export interface IDynamoService {
  /**
   * Establish a connection with the DynamoDB.
   */
  connect(): void;

  upsert<T>(params: UpsertOptions<T>): Promise<boolean>;

  get<T>(params: GetOptions<T>): Promise<any>;

  delete<T>(params: DeleteOptions<T>): Promise<boolean>;
}

export class DynamoService implements IDynamoService {
  private config: ConfigModel;
  private dynamoDB!: DynamoDB.DocumentClient;

  constructor() {
    this.config = config;
    this.dynamoDB = new DynamoDB.DocumentClient();
  }

  public connect(): void {
    try {
      logger.debug(`Connecting to DynamoBD`);
      this.dynamoDB = new DynamoDB.DocumentClient({
        apiVersion: this.config.AWS_API_VERSION,
        region: this.config.DYNAMO_REGION,
      });

    } catch (err) {
      const message = `An error occurred while attempting to connect to DynamoDB: ${err}`;
      throw new Error(message);
    }
  }

  public upsert<T>(params: UpsertOptions<T>): Promise<boolean> {
    return this.dynamoDB.put(params)
      .promise()
      .then(() => {
        logger.info(`Successful upsert into table: ${params.TableName}`);
        return true;
      })
      .catch((err: AWSError) => {
        logger.error(`Failed to upsert into table: ${params.TableName}`);
        throw new Error(err.message);
      });
  }

  public async get<T>(params: GetOptions<T>): Promise<any> {
    try {
      const data = await this.dynamoDB.get(params).promise();
      if (data && data.Item) {
        return data.Item;
      } else {
        return false;
      }
    } catch {
      logger.error(`Error occurred while trying to get ${JSON.stringify(params.Key)} from table ${params.TableName}`);
    }
  }
  public async getAll<T>(params: GetAllOptions<T>): Promise<any> {
    try {
      const data = await this.dynamoDB.scan(params).promise();
      if (data) {
        return data.Items;
      } else {
        return false;
      }
    } catch {
      logger.error(`Error occurred while trying to get ${JSON.stringify(params)} from table ${params.TableName}`);
    }
  }

  public async delete<T>(params: DeleteOptions<T>): Promise<any> {
    try {
      const response = await this.dynamoDB.delete(params).promise();
      console.log(response);
      if (ObjectUtils.isEmptyObject(response)) {
        logger.info("Nothing was deleted");
        throw new Error(`Delete did work, this may be due to the item may not exist.`);
      }
      return true;
    } catch (err) {
      const key: string = JSON.stringify(params.Key);
      logger.error(`Error deleting ${key} from table ${params.TableName} with error: ${err.message}`);
      throw new Error(`Error deleting ${key} from table ${params.TableName} with error: ${err.message}`);
    }
  }
}
