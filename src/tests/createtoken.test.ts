import jwt from "../lib/jwt";

const token = jwt.create("TESTE");

console.log(token);
