import { Router } from "express";
import Create from "./Create";
import Get from "./Get";
import Profile from "./Profile";

const methodsRoutes = Router();

methodsRoutes.post("/user", Create);
methodsRoutes.get("/user", Get);
methodsRoutes.get("/user/profile", Profile);

export default methodsRoutes;
