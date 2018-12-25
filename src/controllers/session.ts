import { ClientService } from "../utils/client_utils";
import { DynamoService } from "../aws-utls/dynamo-service";
import { Request, Response, Router } from "express";
import { Client } from "../models/client";
import * as bodyParser from "body-parser";
import { Session } from "../models/session";
import { verifyToken } from "./verifyToken";
import * as logger from "winston";
import { UpsertOptions } from "../models/upsert-options";
import { AWSError } from "aws-sdk";
import { ObjectUtils } from "../utils/object-utils";

const express = require("express");
const router: Router = express.Router();

const uuid = require("uuid/v4");
const dynamoService = new DynamoService();
const clientService = new ClientService();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.post("", verifyToken, (req: Request, res: Response) => {
  logger.info("Created new session...");
  const id = uuid();
  const sessionWithID = { ...req.body, session_id: id };
  const session = ObjectUtils.mapEmptyStrings(sessionWithID);
  logger.debug(session);
  dynamoService.connect();
  const params: UpsertOptions<Session> = new UpsertOptions("session", session);
  logger.debug(`Inserting params: ${JSON.stringify(params)}`);
  dynamoService
    .upsert(params)
    .then((response: boolean) => {
      if (response) {
        res.send({ code: 200, message: `Session: ${id} saved.` });
      }
    })
    .catch((err: AWSError) => {
      logger.error(`ERROR: ${err}`);
      return res.send({ status: err.code, message: `Error: ${err}` });
    });
});

export const sessionController: Router = router;
