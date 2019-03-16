import { DynamoService } from "../dynamo-service";
import { Request, Response, Router } from "express";
import * as bodyParser from "body-parser";
import {
  Session,
  UpsertOptions,
  GetAllOptions,
  GetOptions,
  DeleteOptions,
} from "../models";
import { verifyToken } from "./verify-token";
import * as logger from "winston";
import { AWSError } from "aws-sdk";
import { ObjectUtils, SessionService } from "../utils";

const express = require("express");
const router: Router = express.Router();

const uuid = require("uuid/v4");
const dynamoService = new DynamoService();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.post("", verifyToken, (req: Request, res: Response) => {
  logger.info("Created new session...");
  const id = uuid();
  const session = { ...req.body, session_id: id };
  ObjectUtils.mapEmptyStrings(session);
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
router.get("", verifyToken, (req: Request, res: Response) => {
  dynamoService.connect();
  const params: GetAllOptions<Session> = new GetAllOptions("session");
  dynamoService
    .getAll(params)
    .then((response: any) => {
      const newRes = SessionService.getClients(response);
      console.log(newRes);
      res.send({ code: 200, body: newRes });
    })
    .catch((err: AWSError) => {
      logger.error(`ERROR: ${err}`);
      return res.send({ code: err.code, message: `Error: ${err}` });
    });
});
router.get("/:id", (req: Request, res: Response) => {
  const key: any = {
    session_id: req.params.id,
  };
  const params: GetOptions<Session> = new GetOptions<Session>("session", key);
  dynamoService.connect();
  dynamoService
    .get(params)
    .then((response: any) => {
      res.send(response);
    })
    .catch((err: AWSError) => {
      logger.error(`ERROR: ${err}`);
      return res.send({ code: err.code, message: `Error: ${err}` });
    });
});
router.delete("/:id", (req: Request, res: Response) => {
  const key: any = {
    session_id: req.params.id,
  };
  dynamoService.connect();
  const params: DeleteOptions<Session> = new DeleteOptions<Session>(
    "session",
    key,
  );
  dynamoService
    .delete(params)
    .then((response: any) => {
      res.send(response);
    })
    .catch((err: AWSError) => {
      logger.error(`ERROR: ${err}`);
      return res.send({ code: err.code, message: `Error: ${err}` });
    });
});

export const sessionController: Router = router;
