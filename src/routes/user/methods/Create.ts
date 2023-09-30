import { Request, Response } from "express";
import Validate from "../../../lib/Validations";
import responsePattern from "../../../lib/responsePattern";
import Treatments from "../../../lib/Treatments";
import User from "../../../lib/DBManagement/User";

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

  return res.status(createdUser.status).json(createdUser);
}

export default Create;
