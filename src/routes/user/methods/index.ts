import { Router } from "express";
import Create from "./Create";

const routes = Router();

routes.post("/user", Create);

export default routes;
