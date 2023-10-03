import { Router } from "express";
import methodsRoutes from "./user/methods";
import Ping from "./ping";

const routes = Router();

routes.use(methodsRoutes);
routes.all("/ping", Ping);

export default routes;
