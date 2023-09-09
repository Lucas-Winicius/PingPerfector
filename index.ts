import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./src/routes/router";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on: http://localhost:${process.env.PORT}`);
});
