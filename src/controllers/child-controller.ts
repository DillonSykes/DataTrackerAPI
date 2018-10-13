import {ClientService} from "../utils/client_utils";
import {DynamoService} from "../aws-utls/dynamo-service";
import {Request, Response, Router} from "express";
import * as bodyParser from "body-parser";
import * as logger from "winston";
import {UpsertOptions} from "../models/upsert-options";
import {AWSError} from "aws-sdk";
import {ObjectUtils} from "../utils/object-utils";
import {Child} from "../models/child";

const express = require("express");
const router: Router = express.Router();

const uuid = require("uuid/v4");
const dynamoService = new DynamoService();
const clientService = new ClientService();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post("/new", (req: Request, res: Response) => {
  const children: Child[] = req.body.children;
  const session_id = req.body.sessionId;
  Promise.all(children.map((child: Child) => {
    child.session_id = session_id;
    child.child_id = uuid();
    child = ObjectUtils.mapEmptyStrings(child);
    logger.debug(`Child: ${JSON.stringify(child)}`);
    const parmas: UpsertOptions<Child> = new UpsertOptions("children", child);
    return dynamoService.upsert(parmas)
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
        message: `Successfully inserted children into session: ${JSON.stringify(session_id)}`
      });
    })
    .catch((err: AWSError) => {
      logger.error(`ERROR: ${err}`);
      return res.send({status: false, message: `Error: ${err}`});
    });
});

export const childController: Router = router;
