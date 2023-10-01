import UserTypes from "../../@types/UserTypes";
import prisma from "../prisma";
import redis from "../redis";
import responsePattern from "../responsePattern";

class UserDatabase {
  async create(data: UserTypes) {
    try {
      const response = await prisma.user.create({ data });
      redis.setEx(`user:${response.nick}`, 7200, JSON.stringify(response));

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

  async get(nick: string, sensitiveinfo?: boolean) {
    try {
      const cacheData = await redis.get(`user:${nick}`);

      if (cacheData) {
        console.log("Encontrado em cache");
        const { pass, email, ...user } = JSON.parse(cacheData);
        return responsePattern({
          mode: "success",
          message: "Great news! We've located the user you were looking for.",
          data: sensitiveinfo ? { ...user, pass, email } : user,
        });
      }

      const user = await prisma.user.findFirst({ where: { nick } });
      console.log("Buscando na base de dados");

      if (!user) {
        return responsePattern({
          mode: "success",
          status: 404,
          message: "Sorry, we couldn't find the user you were looking for.",
        });
      }

      redis.setEx(`user:${user.nick}`, 7200, JSON.stringify(user));

      const { pass: _, email: __, ...userDisassembled } = user;

      _ || __;

      return responsePattern({
        mode: "success",
        message: "The user's details have been successfully retrieved.",
        data: sensitiveinfo ? user : userDisassembled,
      });
    } catch (error) {
      return responsePattern({
        mode: "error",
        message: "We encountered an issue while trying to fetch user data.",
        data: error,
      });
    }
  }

  async update(id: string | number, data: UserTypes) {
    const intId = Number(id);
    try {
      const user = await prisma.user.update({ where: { id: intId }, data });
      redis.setEx(`user:${id}`, 7200, JSON.stringify(user));

      if (!user) {
        return responsePattern({
          mode: "success",
          status: 404,
          message:
            "Sorry, we couldn't find the user you're attempting to edit.",
        });
      }
    } catch (error) {
      return responsePattern({
        mode: "error",
        message: "Oops! Something went wrong while editing the user.",
        data: error,
      });
    }
  }

  async delete(id: string | number) {
    const intId = Number(id);
    try {
      const deletedUser = await prisma.user.delete({ where: { id: intId } });

      if (!deletedUser) {
        return responsePattern({
          mode: "success",
          status: 404,
          message:
            "User not found: The specified user cannot be deleted because it doesn't exist.",
        });
      }

      redis.del(`user:${id}`);

      return responsePattern({
        mode: "success",
        message: "The user has been successfully removed.",
        data: deletedUser,
      });
    } catch (error) {
      return responsePattern({
        mode: "error",
        message: "Oops! Something went wrong while deleting the user.",
        data: error,
      });
    }
  }
}

export default new UserDatabase();
