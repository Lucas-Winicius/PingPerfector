import { Router } from "express";
import Create from "./Create";
import GetUser from "./Read";
import Update from "./Update";
import Auth from "../../../middleware/Auth";
import Profile from "./Profile";

const routes = Router();

routes.post("/user", Create);

routes.get("/user/profile", Auth, Profile);
routes.get("/user/:nick", GetUser);
routes.get("/user", GetUser);

routes.put("/user/:nick", Auth, Update);

export default routes;
