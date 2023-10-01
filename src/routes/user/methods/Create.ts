import { Request, Response } from "express";
import Validate from "../../../lib/Validations";
import responsePattern from "../../../lib/responsePattern";
import Treatments from "../../../lib/Treatments";
import User from "../../../lib/DBManagement/User";
import jwt from "../../../lib/jwt";

async function Create(req: Request, res: Response) {
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

  const processedData = await Treatments.treatUsers(body);
  const createdUser = await User.create(processedData);
  const userToken = jwt.create(createdUser.data);

  return res
    .cookie("UserAuthentication", userToken, {
      domain: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    })
    .status(createdUser.status)
    .json({
      user: createdUser,
      token: userToken,
    });
}

export default Create;
