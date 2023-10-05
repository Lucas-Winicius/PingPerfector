import { Request, Response } from "express";
import prisma from "../../../lib/prisma";
import responsePattern from "../../../lib/responsePattern";

async function CountUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany();

  const response = responsePattern({
    mode: "success",
    status: 200,
    message: "here is the user count",
    data: {
      count: users.length,
      users,
    },
  });

  res.status(response.status).json(response);
}

export default CountUsers;
