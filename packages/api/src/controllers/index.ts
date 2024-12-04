import { type Request, type Response } from "express";

export function helloWorld(_req: Request, res: Response) {
  res.send({ "message": "Hello World!" });
}
