import { Router } from "express";
import Create from "./Create";

const methodsRoutes = Router();

methodsRoutes.post("/user", Create);

export default methodsRoutes;
