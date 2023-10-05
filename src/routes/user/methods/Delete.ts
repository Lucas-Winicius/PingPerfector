import { Request, Response } from "express";
import User from "../../../lib/DBManagement/User";

async function Delete(req: Request, res: Response) {
  const response =  User.delete(req.body.decodedToken.userCode);

  res
    .status(response.status)
    .cookie("UserAuthentication", "", {
      path: "/",
      expires: new Date(Date.now()),
    })
    .json(response);
}

export default Delete;
