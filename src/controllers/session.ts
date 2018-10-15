import {ClientService} from "../utils/client_utils";
import {DynamoService} from "../aws-utls/dynamo-service";
import {Request, Response, Router} from "express";
import {Client} from "../models/client";
import * as bodyParser from "body-parser";
import {Session} from "../models/session";
import {verifyToken} from "./verifyToken";
import * as logger from "winston";
import {UpsertOptions} from "../models/upsert-options";
import {AWSError} from "aws-sdk";
import {ObjectUtils} from "../utils/object-utils";

const express = require("express");
const router: Router = express.Router();

const uuid = require("uuid/v4");
const dynamoService = new DynamoService();
const clientService = new ClientService();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post("/new", verifyToken, (req: Request, res: Response) => {
  logger.info("Creating new session...");
  const client1: Client = req.body.client1;
  logger.debug("Client 1: " + JSON.stringify(client1));
  const client2: Client = req.body.client2;
  logger.debug("Client 2:" + JSON.stringify(client2));
  const childCaretaker: string = req.body.child_caretaker;
  const itemArray: any[] = [];
  const session_id: string = uuid();
  let session: any = {
    session_id: session_id,
    client_1: "",
    client_2: "",
    child_caretaker: "",
  };
  console.log(JSON.stringify(session));
  if (client1) {
    const client: Client = clientService.mapIdsToClient(client1, session_id);
    const formatedClient: Client = ObjectUtils.mapEmptyStrings(client);
    logger.debug(`Formated Client 1: ${JSON.stringify(formatedClient)}`);
    // itemArray.push(formatedClient);
    // session = {...session, client_1: client1.client_id};
    // session.client_1 = client.client_id;
  }
  if (client2) {
    const client: Client = clientService.mapIdsToClient(client2, session_id);
    const formatedClient: Client = ObjectUtils.mapEmptyStrings(client);
    logger.debug(`Formated Client 1: ${JSON.stringify(formatedClient)}`);
    itemArray.push(formatedClient);
    session.client_2 = client.client_id;
  }
  if (childCaretaker) {
    session.child_caretaker = childCaretaker;
  }
  const formatedSession: Client = ObjectUtils.mapEmptyStrings(session);
  logger.debug(`Formated Session: ${JSON.stringify(formatedSession)}`);
  session = {...session, client_1: client1};
  console.log(session);
  itemArray.push(formatedSession);
  dynamoService.connect();
  Promise.all(itemArray.map((item: any) => {
    let tableName: string = "";
    if (item.client_id) {
      tableName = "client";
    } else {
      tableName = "session";
    }

    const params: UpsertOptions<any> = new UpsertOptions(tableName, item);
    logger.debug(`Inserting params: ${JSON.stringify(params)}`);
    return dynamoService.upsert(params)
      .then((resp: boolean) => {
        if (resp) {
          return true;
        }
      });
  }))
    .then(() => {
      res.send({
        status: true,
        sessionId: session.session_id,
        message: `Successfully inserted session: ${JSON.stringify(session.session_id)}`
      });
    })
    .catch((err: AWSError) => {
      logger.error(`ERROR: ${err}`);
      return res.send({status: false, message: `Error: ${err}`});
    });

});
export const sessionController: Router = router;
