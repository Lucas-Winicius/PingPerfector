import express from "express";
import "dotenv/config";
import routes from "./src/routes/router";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
