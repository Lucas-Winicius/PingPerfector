import { Request, Response } from "express";
import prisma from "../../../lib/prisma";

async function GetUser(req: Request, res: Response) {
  const nick = req.params.nick;

  if (!nick) {
    return res
      .status(400)
      .json({ error: "Please provide the user's nickname." });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { nick },
      select: {
        id: true,
        name: true,
        nick: true,
        email: true,
        pass: false,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      return res.status(404).json("user not found");
    }

    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json(e);
  }
}

export default GetUser;
