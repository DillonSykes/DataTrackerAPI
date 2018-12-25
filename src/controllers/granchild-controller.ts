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
import {GrandChild} from "../models/GrandChild";

const express = require("express");
const router: Router = express.Router();

const uuid = require("uuid/v4");
const dynamoService = new DynamoService();
const clientService = new ClientService();
dynamoService.connect();
router.post("/new", verifyToken, (req: Request, res: Response) => {
  logger.info("Creating new Grand Child...");
  const grandChildren: GrandChild[] = req.body.grandChildren;
  const session_id: string = req.body.sessionId;
  logger.debug(`Grand Children: ${JSON.stringify(grandChildren)}`);
  Promise.all(grandChildren.map((grandChild: GrandChild) => {
    grandChild.session_id = session_id;
    grandChild.grandchild_id = uuid();
    grandChild = ObjectUtils.mapEmptyStrings(grandChild);
    const params: UpsertOptions<GrandChild> = new UpsertOptions("grandchildren", grandChild);
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
        sessionId: session_id,
        message: `Successfully inserted grand children into session: ${JSON.stringify(session_id)}`,
      });
    })
    .catch((err: AWSError) => {
      logger.error(`ERROR: ${err}`);
      return res.send({status: false, message: `Error: ${err}`});
    });
});

export const grandChildController: Router = router;
