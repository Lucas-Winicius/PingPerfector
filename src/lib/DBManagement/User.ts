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
        const { pass, email, ...user } = JSON.parse(cacheData);
        return responsePattern({
          mode: "success",
          message: "Great news! We've located the user you were looking for.",
          data: sensitiveinfo ? { ...user, pass, email } : user,
        });
      }

      const user = await prisma.user.findFirst({ where: { nick } });

      if (!user) {
        return responsePattern({
          mode: "success",
          status: 404,
          message: "Sorry, we couldn't find the user you were looking for.",
        });
      }

      redis.setEx(`user:${user.nick}`, 7200, JSON.stringify(user));

      const { pass: _, email: __, ...userDisassembled } = user;

      _ || __; // to hide the error of unused variables

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

  async update(nick: string, data: UserTypes) {
    try {
      const user = await prisma.user.update({ where: { nick }, data });

      if (!user) {
        return responsePattern({
          mode: "success",
          status: 404,
          message:
            "Sorry, we couldn't find the user you're attempting to edit.",
        });
      }
      redis.setEx(`user:${nick}`, 7200, JSON.stringify(user));

      console.log(user);

      return responsePattern({
        mode: "success",
        status: 200,
        message: "Changes to user profile saved.",
        data: user,
      });
    } catch (error) {
      return responsePattern({
        mode: "error",
        message: "Oops! Something went wrong while editing the user.",
        data: error,
      });
    }
  }

  async delete(nick: string) {
    try {
      const deletedUser = await prisma.user.delete({ where: { nick } });

      if (!deletedUser) {
        return responsePattern({
          mode: "success",
          status: 404,
          message:
            "User not found: The specified user cannot be deleted because it doesn't exist.",
        });
      }

      redis.del(`user:${nick}`);

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
