import UserTypes from "../../@types/UserTypes";
import prisma from "../prisma";
import redis from "../redis";
import responsePattern from "../responsePattern";

class UserDatabase {
  async createUser(data: UserTypes) {
    try {
      const response = await prisma.user.create({ data });
      redis.setEx(`user:${response.id}`, 7200, JSON.stringify(response));

      return responsePattern({
        mode: "success",
        status: 201,
        message: "Congratulations! Your user account has been created.",
        data,
      });
    } catch (error) {
      return responsePattern({
        mode: "error",
        message:
          "Oops! Something went wrong on the server. Please try again later.",
        data: error,
      });
    }
  }

  async getUser(id: string | number) {
    const intId = Number(id);
    try {
      const cacheData = await redis.get(`user:${id}`);

      if (cacheData) {
        console.log("Encontrado em cache");
        const user = JSON.parse(cacheData);
        return responsePattern({
          mode: "success",
          message: "Great news! We've located the user you were looking for.",
          data: user,
        });
      }

      const user = await prisma.user.findFirst({ where: { id: intId } });
      console.log("Buscando na base de dados");

      if (!user) {
        return responsePattern({
          mode: "success",
          status: 404,
          message: "Sorry, we couldn't find the user you were looking for.",
        });
      }

      redis.setEx(`user:${user.id}`, 7200, JSON.stringify(user));

      return responsePattern({
        mode: "success",
        message: "The user's details have been successfully retrieved.",
        data: user,
      });
    } catch (error) {
      return responsePattern({
        mode: "error",
        message: "We encountered an issue while trying to fetch user data.",
        data: error,
      });
    }
  }
}

export default new UserDatabase();
