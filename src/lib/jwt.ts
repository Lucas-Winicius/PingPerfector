import jwt from "jsonwebtoken";

class JsonWebToken {
  create(data: string | object) {
    const string = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
    return string;
  }
}

export default new JsonWebToken();
