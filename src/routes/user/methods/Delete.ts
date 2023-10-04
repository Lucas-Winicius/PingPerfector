import { Request, Response } from "express";
import User from "../../../lib/DBManagement/User";
import responsePattern from "../../../lib/responsePattern";

async function Delete(req: Request, res: Response) {
  User.delete(req.body.decodedToken.nick);

  res
    .status(202)
    .cookie("UserAuthentication", "", {
      path: "/",
      expires: new Date(Date.now()),
    })
    .json(
      responsePattern({
        mode: "success",
        status: 202,
        message: "User deleted successfully.",
      }),
    );
}

export default Delete;
