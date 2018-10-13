import uuid = require("uuid/v4");
import {Client} from "../models/client";

export class ClientService {
  public mapIdsToClient(client: Client, session_id: string): any {
    const newClient: Client = {...client, client_id: uuid(), session_id: session_id};
    return newClient;
  }

}
