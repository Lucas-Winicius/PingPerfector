import express from "express";
import Ping from "./ping";

const routes = express.Router();

// Ping
routes.all("/ping", Ping);

export default routes;
