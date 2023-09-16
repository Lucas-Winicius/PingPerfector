import { Request, Response } from "express";

async function Update(req: Request, res: Response) {
  res.send(req.token);
}

export default Update;
