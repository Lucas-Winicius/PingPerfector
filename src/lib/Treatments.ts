import UserTypes from "../@types/UserTypes";

class Treatments {
  async treatUsers(body: UserTypes) {
    return {
      name: body.name,
      nick: body.nick,
      userCode: "",
      email: body.email.toLowerCase(),
      pass: body.pass,
    };
  }
}

export default new Treatments();
