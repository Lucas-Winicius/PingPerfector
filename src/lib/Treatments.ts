import UserTypes from "../@types/UserTypes";
import generateCode from "./generateCode";

class Treatments {
  async treatUsers(body: UserTypes, userCode?: string) {
    return {
      name: body.name,
      nick: body.nick,
      userCode: userCode ?? generateCode(20),
      email: body.email.toLowerCase(),
      pass: body.pass,
    };
  }
}

export default new Treatments();
