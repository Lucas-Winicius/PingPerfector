import { Router } from "express";
import Create from "./Create";
import Get from "./Get";

const methodsRoutes = Router();

methodsRoutes.post("/user", Create);
methodsRoutes.get("/user", Get);

export default methodsRoutes;
