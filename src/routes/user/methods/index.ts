import { Router } from "express";
import Create from "./Create";
import GetUser from "./Read";

const routes = Router();

routes.post("/user", Create);
routes.get("/user", GetUser);
routes.get("/user/:nick", GetUser);

export default routes;
