import UserTypes from "../../@types/UserTypes";
import prisma from "../prisma";
import redis from "../redis";
import responsePattern from "../responsePattern";

class UserDatabase {
  private queue: UserTypes[];

  constructor() {
    this.clearQueue();
    this.queue = [];
  }

  clearQueue() {
    const autoFunction = async () => {
      try {
        if (this.queue.length) {
          await prisma.user.createMany({
            data: this.queue,
            skipDuplicates: true,
          });
          this.queue = [];
        }
      } catch (e) {
        console.log();
      }
    };
    setInterval(autoFunction, 5000);
  }

  async create(data: UserTypes) {
    this.queue.push(data);

    return responsePattern({
      mode: "success",
      status: 202,
      message:
        "The user creation request has been accepted and is being processed in the background.",
      data,
    });
  }

  async get(nick?: string) {
    try {
      const cacheData = await redis.get(`user:${nick}`);

      if (cacheData) {
        const user = JSON.parse(cacheData);

        return responsePattern({
          mode: "success",
          message: "Great news! We've located the user you were looking for.",
          data: user,
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

  async getByUserCode(userCode: string) {
    try {
      const user = await prisma.user.findFirst({ where: { userCode } });

      if (!user) {
        return responsePattern({
          mode: "success",
          status: 404,
          message: "Sorry, we couldn't find the user you were looking for.",
        });
      }

      redis.setEx(`user:${user.nick}`, 7200, JSON.stringify(user));

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

  async update(nick: string, userCode: string, data: UserTypes) {
    try {
      const user = await prisma.user.update({ where: { userCode }, data });

      if (!user) {
        return responsePattern({
          mode: "success",
          status: 404,
          message:
            "Sorry, we couldn't find the user you're attempting to edit.",
        });
      }
      
      redis.setEx(`user:${nick}`, 7200, JSON.stringify(user));

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
