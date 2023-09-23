import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json(Date.now());
});

app.listen(3000, () => {
  console.log("Server started");
});
