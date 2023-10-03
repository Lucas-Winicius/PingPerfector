import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import redis from "../../lib/redis";

async function Ping(req: Request, res: Response) {
  const currentMsFromClient = Number(req.query.now);

  await prisma.user.findFirst();
  await redis.ping();

  return res.status(200).json({
    ping: Date.now() - currentMsFromClient,
  });
}

export default Ping;
