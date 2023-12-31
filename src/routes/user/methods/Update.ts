import { Request, Response } from "express";
import User from "../../../lib/DBManagement/User";
import Validate from "../../../lib/Validations";
import responsePattern from "../../../lib/responsePattern";
import Treatments from "../../../lib/Treatments";
import jwt from "../../../lib/jwt";

async function Update(req: Request, res: Response) {
  const body = req.body;

  const error = Validate(body);

  if (error.length) {
    return res.status(400).json(
      responsePattern({
        mode: "error",
        status: 400,
        data: error,
      }),
    );
  }

  const processedData = await Treatments.treatUsers(
    body,
    req.body.decodedToken.userCode,
  );
  const editedUser = await User.update(
    req.body.decodedToken.nick,
    req.body.decodedToken.userCode,
    processedData,
  );

  const userToken = jwt.create(editedUser.data);

  res
    .cookie("UserAuthentication", userToken, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    })
    .status(editedUser.status)
    .json({ editedUser, token: userToken });
}

export default Update;
