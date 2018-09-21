import {Request, Response, Router} from "express";
const jwt = require("jsonwebtoken");
const express = require('express');
const router: Router = express.Router();
import * as bodyParser from "body-parser";
import {DynamoService} from "../aws-utls/dynamo-service";

const dynamoService = new DynamoService();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post("/login", (req: Request, res: Response) => {
  const username: string = req.body.username;
  const password: string = req.body.password;
  dynamoService.login(username, password)
    .then((data: any) => {
      if (data === "Item not found") {
        return res.send({Error: "No user found."});
      }
      if (data.password === password) {
        const token = jwt.sign({id: req.body.name}, process.env.SECRET, {expiresIn: 8600});
        res.status(200).send({auth: true, token: token, expiresIn: 8600});
      } else {
        return res.send({Error: "Password is incorrect."});
      }
    });
});
router.get("/", (req, res) => {
  res.send({data: "USER"});
});
export const userController: Router = router;
