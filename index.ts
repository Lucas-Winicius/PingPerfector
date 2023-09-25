import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json(Date.now());
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
