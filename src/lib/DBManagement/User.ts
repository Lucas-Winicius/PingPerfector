import UserTypes from "../../@types/UserTypes";
import prisma from "../prisma";
import redis from "../redis";

class UserDatabase {
  async createUser(data: UserTypes) {
    try {
      const response = await prisma.user.create({ data });
      await redis.setEx(`user:${response.id}`, 7200, JSON.stringify(response));

      return {
        status: 201,
        message: "Congratulations! Your user account has been created.",
        data: response,
      };
    } catch (error) {
      return {
        status: 500,
        message:
          "Oops! Something went wrong on the server. Please try again later.",
        error,
      };
    }
  }

  async getUser(id: string | number) {
    console.log(id);
  }
}

export default new UserDatabase();
