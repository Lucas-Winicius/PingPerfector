import { NextFunction, Request, Response } from "express";
import prisma from "../../../lib/prisma";
import defaultSettings from "../../../lib/defaultSettings";

async function Profile(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await prisma.user.findFirst({
      where: { id: req.unencryptedToken.id },
      select: defaultSettings("userNoPass"),
    });

    if (!user) {
      res.status(404).json("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error.name);
  }
}

export default Profile;
