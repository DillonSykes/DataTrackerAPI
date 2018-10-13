import {Request, Response, Router} from "express";
import * as bodyParser from "body-parser";
import {DynamoService} from "../aws-utls/dynamo-service";
import {GetOptions} from "../models/get-params";
import {IUser} from "../models/user";
import {AWSError} from "aws-sdk";
import * as logger from "winston";

const jwt = require("jsonwebtoken");
const express = require("express");
const router: Router = express.Router();
const dynamoService = new DynamoService();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post("/login", (req: Request, res: Response) => {
  const username: string = req.body.username;
  const password: string = req.body.password;
  const key: any = {
    username: username,
  };
  const params: GetOptions<IUser> = new GetOptions("users", key);
  dynamoService.connect();
  dynamoService.get(params)
    .then((data: any) => {
      logger.debug("Data returned from DB client: " + JSON.stringify(data));
      if (data === false) {
        return res.send({Error: "No user found."});
      }
      if (data.password === password) {
        const token = jwt.sign({id: req.body.name}, process.env.SECRET, {expiresIn: 86400});
        res.status(200).send({auth: true, token: token, expiresIn: 86400});
      } else {
        return res.send({Error: "Password is incorrect."});
      }
    })
    .catch((err: AWSError) => {
      logger.error(`ERROR: ${err}`);
      res.send({auth: false, message: `${err}`});
    });
});
router.get("/", (req, res) => {
  res.send({data: "USER"});
});
export const userController: Router = router;
