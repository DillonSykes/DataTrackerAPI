import * as jwt from "jsonwebtoken";
import { config } from "../config";
import { Response, Request, NextFunction } from "express";
export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
): any {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  console.log(token);
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, config.SECRET, (err: any, decoded: any) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    // if everything good, save to request for use in other routes
    console.log("Good token");
    // req.name = decoded.id;
    next();
  });
}
