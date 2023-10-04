import { Router } from "express";
import Create from "./Create";
import Get from "./Get";
import Profile from "./Profile";
import AuthVerification from "../../../middlewares/AuthVerification";
import Update from "./Update";
import Delete from "./Delete";

const methodsRoutes = Router();

methodsRoutes.post("/user", Create);
methodsRoutes.get("/user", Get);
methodsRoutes.get("/user/profile", AuthVerification, Profile);
methodsRoutes.put("/user", AuthVerification, Update);
methodsRoutes.delete("/user", AuthVerification, Delete);

export default methodsRoutes;
