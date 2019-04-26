import dotenv = require("dotenv");
dotenv.config();

import * as envalid from "envalid";
const { str } = envalid;

export class ConfigModel {
  LOG_LEVEL: string;
  DYNAMO_REGION: string;
  AWS_API_VERSION: string;
  SECRET: string;
  PORT: string;
  USER_TABLE: string;
  SESSION_TABLE: string;
}

export const config = envalid.cleanEnv<ConfigModel>(process.env, {
  LOG_LEVEL: str(),
  DYNAMO_REGION: str(),
  AWS_API_VERSION: str(),
  SECRET: str(),
  PORT: str(),
  USER_TABLE: str(),
  SESSION_TABLE: str(),
});
