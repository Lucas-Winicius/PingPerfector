import express from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./src/routes/router";
import ErrorHandler from "./src/middleware/ErrorHandler";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on: http://localhost:${process.env.PORT}`);
});
