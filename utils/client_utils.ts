import uuid = require("uuid/v4");
import {DynamoService} from "../aws-utls/dynamo-service";
import {Client} from "../models/client";


export class ClientService {

  constructor() {}

  public mapIdsToClient(client: Client, session_id: string) {
    let newClient: Client = {...client, client_id: uuid(), session_id: session_id};
    return newClient;
  }

}
