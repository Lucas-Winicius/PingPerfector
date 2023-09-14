import { Router } from "express";
import Create from "./Create";
import GetUser from "./Read";
import Update from "./Update";

const routes = Router();

routes.post("/user", Create);

routes.get("/user", GetUser);
routes.get("/user/:nick", GetUser);

routes.put("/user/:nick", Update);

export default routes;
