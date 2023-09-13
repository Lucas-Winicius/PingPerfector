import express from "express";
import UserMethods from "./user/methods/index";
import Ping from "./ping";

const routes = express.Router();

// Ping
routes.all("/ping", Ping);

// User
routes.use(UserMethods);

export default routes;
