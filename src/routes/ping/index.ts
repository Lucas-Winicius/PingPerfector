import { Request, Response } from "express";
import prisma from "../../lib/prisma";

async function Ping(req: Request, res: Response) {
  const { now } = req.query;

  try {
    await prisma.user.findMany();
  } catch (_) {
    return res.json({
      ping: Date.now() - Number(now),
      message:
        "It was not possible to establish a connection with the database.",
    });
  } finally {
    prisma.$disconnect;
  }

  return res.json({ ms: Date.now() - Number(now) });
}

export default Ping;
