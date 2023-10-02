import { Request, Response } from "express";
import User from "../../../lib/DBManagement/User";

async function Profile(req: Request, res: Response) {
  const user = await User.get(req.body.decodedToken.nick, true);

  res.status(200).json(user);
}

export default Profile;
