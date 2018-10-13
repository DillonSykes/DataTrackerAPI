import {Request, Response, Router} from "express";

const express = require("express");
const router: Router  = express.Router();

import {verifyToken} from "./verifyToken";
import * as bodyParser from "body-parser";
import {DynamoService} from "../aws-utls/dynamo-service";
import {DeleteOptions} from "../models/delete-options";
const dynamoService = new DynamoService();
dynamoService.connect();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// router.get()
router.delete("/delete", (req: Request, res: Response) => {
  const key: any = {
    client_id: req.body.client_id,
  };
  const params: DeleteOptions<any> = new DeleteOptions("client", key);
  dynamoService.delete(params)
    .then( (resp: boolean) => {
      if (resp) {
        res.send({status: true, message: `Client with id ${req.body.client_id} was deleted from ${params.TableName}`});
      }
    })
    .catch((err: any) => {
      res.send({status: false, Error: `Client with id ${req.body.client_id} was not deleted error: ${err.message}`});

    });
});

export const clientController: Router = router;
