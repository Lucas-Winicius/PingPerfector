import { Router } from "express";
import methodsRoutes from "./user/methods";

const routes = Router();

routes.use(methodsRoutes);

export default routes;
