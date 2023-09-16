import { Request, Response } from "express";

async function Profile(req: Request, res: Response) {
  res.send(req.token);
}

export default Profile;
