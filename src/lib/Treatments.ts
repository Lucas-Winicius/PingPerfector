import UserTypes from "../@types/UserTypes";

class Treatments {
  async treatUsers(body: UserTypes) {
    return {
      name: body.name,
      nick: body.nick,
      email: body.email.toLowerCase(),
      pass: body.pass, // Tratar senha depois
    };
  }
}

export default new Treatments();
