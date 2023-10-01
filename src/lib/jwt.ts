import jwt from "jsonwebtoken";
import UserTypes from "../@types/UserTypes";

class JsonWebToken {
  create(data: string | object) {
    const string = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
    return string;
  }

  verify(token: string): null | UserTypes {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as UserTypes;
      return decoded;
    } catch (err) {
      return null;
    }
  }
}

export default new JsonWebToken();
