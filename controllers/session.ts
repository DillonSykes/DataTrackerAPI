import {ClientService} from "../utils/client_utils";
import {DynamoService} from "../aws-utls/dynamo-service";
import {Request, Response, Router} from 'express'
import {Client} from "../models/client";
import * as bodyParser from "body-parser";
import {Session} from "../models/session";

const express = require('express');
const router: Router = express.Router();
const verifyToken = require("./verifyToken");
const uuid = require("uuid/v4");
const dynamoService = new DynamoService();
const clientService = new ClientService();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/new', verifyToken, (req: Request, res: Response) => {
  const client1: Client = req.body.client1;
  console.log(JSON.stringify(client1));
  const client2: Client = req.body.client2;
  console.log(JSON.stringify(client2));
  const childCaretaker: string = req.body.child_caretaker;
  const clientArray: Client[] = [];
  const session_id: string = uuid();
  let session: Session = {
    session_id: session_id,
    client_1: "",
    client_2: "",
    child_caretaker: "N/A",
  };
  console.log(JSON.stringify(session));
  if(client1){
    let client: Client = clientService.mapIdsToClient(client1, session_id);
    clientArray.push(client);
    // session = {...session, client_1: client1.client_id};
    session.client_1 = client.client_id;
  }
  if (client2){
    let client: Client = clientService.mapIdsToClient(client2, session_id);
    clientArray.push(client);
    session.client_2 = client.client_id;
  }
  if (childCaretaker) {
    session.child_caretaker = childCaretaker;
  }

  console.log(JSON.stringify(session));
  dynamoService.addSessionToDb(session);
  clientArray.forEach((aClient) => {
    dynamoService.addClientToDb(aClient);
  });

  res.send({status: true, message: `Successfully inserted session: ${JSON.stringify(session)} `})
});
export const sessionController: Router = router;
