import { Request, Response } from "express";
import User from "../../../lib/DBManagement/User";
import responsePattern from "../../../lib/responsePattern";

async function Get(req: Request, res: Response) {
  const userNick = req.query.user as string;

  if (!userNick) {
    return res.status(400).json(
      responsePattern({
        mode: "error",
        status: 400,
        message: "Error: Missing 'user' parameter.",
      }),
    );
  }

  const user = await User.get(userNick);

  res.status(user.status).json(user);
}

export default Get;
