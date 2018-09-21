import * as AWS from "aws-sdk";
import {Client} from "../models/client";
import {Session} from "../models/session";
export class DynamoService {
  public docClient: AWS.DynamoDB.DocumentClient;
  constructor() {
    this.docClient = new AWS.DynamoDB.DocumentClient( {
      region: "us-east-1",
      endpoint: "https://dynamodb.us-east-1.amazonaws.com",
      convertEmptyValues: true,
      accessKeyId: 'AKIAJONIHSHNEEJKQFIA',
      secretAccessKey: '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',
    });
  }
  private createInput(tableName: string, obj: any): any {
    const params: any = {
      TableName: tableName,
      Key: obj
    };
    return params;
  }
  public addClientToDb (client: Client): void {
    const params: any = this.createInput("client", client);
    this.docClient.put(params, (err, data) => {
      if (err) {
        console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    });
  }
  public addSessionToDb (session: Session): void {
    const params: any = this.createInput("session", session);
    this.docClient.put(params, (err, data) => {
      if (err) {
        console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    });
  }
  public async login (username: string, password: string): Promise<any>{
    const params: any = {
      TableName: 'users',
      Key: {
        "username": username,
      }
    };
    let data = await this.docClient.get(params).promise();
    // console.log("DATA: ",data);
    if (data && data.Item ) {
      return data.Item;
    } else {
      return "Item not found";
    }
  }
}
