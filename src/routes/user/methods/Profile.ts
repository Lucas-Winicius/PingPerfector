import { Request, Response } from "express";
import jwt from "../../../lib/jwt";
import responsePattern from "../../../lib/responsePattern";
import User from "../../../lib/DBManagement/User";

async function Profile(req: Request, res: Response) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token);

  if (!decoded) {
    const response = responsePattern({
      mode: "error",
      status: 401,
      message:
        "Oops! Something went wrong. It appears the token you provided is invalid. Verify it and try again.",
    });

    return res.status(response.status).json(response);
  }

  const user = await User.get(decoded.nick, true);

  res.status(200).json(user);
}

export default Profile;
