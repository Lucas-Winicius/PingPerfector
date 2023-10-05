import { Request, Response } from "express";
import User from "../../../lib/DBManagement/User";

async function Profile(req: Request, res: Response) {
  const user = await User.getByUserCode(req.body.decodedToken.userCode);

  res.status(user.status).json(user);
}

export default Profile;
