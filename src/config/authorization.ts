import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
//import dotenv from "dotenv";

export function generateToken(email: string): string {
  return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
}

export function authorizeUser(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.sendStatus(401);
    return;
  }

  //if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    //if (err) return res.sendStatus(403);
    //req.user = user;
    next();
  });
}
