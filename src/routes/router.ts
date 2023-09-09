import express from "express";
import Ping from "./ping";

const routes = express.Router();

routes.all("/ping", Ping);

export default routes;
