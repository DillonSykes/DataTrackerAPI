import {Request, Response, Router} from "express";

const express = require('express');
const router: Router  = express.Router();

import {verifyToken} from "./verifyToken";
import * as bodyParser from "body-parser";

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/new', verifyToken, (req: Request, res: Response) => {
  
});

export const clientController: Router = router;
