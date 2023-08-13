import { userRepository } from "@server/repository/UserRepository";
import { UserBody } from "@server/types/user";
import { NextApiRequest, NextApiResponse } from "next";
import jsonwebtoken from "jsonwebtoken";
import { User } from "@server/schema/user";
import { LoggedUser } from "@ui/types/user";

async function getUsers(request: NextApiRequest, response: NextApiResponse) {
  try {
    userRepository.findAllUsers().then((users) => {
      response.status(200).json(users);
    });
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Request Users",
      },
    });
  }
}

async function getUserById(request: NextApiRequest, response: NextApiResponse) {
  try {
    const userId = request.query.userId;
    userRepository.findUserById(userId as string).then((user) => {
      response.status(200).json(user);
    });
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Request User",
      },
    });
  }
}

async function login(request: NextApiRequest, response: NextApiResponse) {
  try {
    const userBody: UserBody = request.body;
    const user: User = await userRepository.findUserByEmail(userBody.email);

    const loggedUser: LoggedUser = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      "SECRET_KEY",
      {
        expiresIn: "1h",
      }
    );

    response.setHeader("token", `${token}`);
    response.status(200).json(loggedUser);
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Login",
      },
    });
  }
}

async function registerUser(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const userBody: UserBody = request.body;
    userBody.role = "normal";
    const user = await userRepository.insertNewUser(userBody);

    const token = jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      "SECRET_KEY",
      {
        expiresIn: "1h",
      }
    );

    response.setHeader("token", `${token}`);
    response.status(201).json(user);
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Create User",
      },
    });
  }
}

interface UserController {
  getUsers: (request: NextApiRequest, response: NextApiResponse) => void;
  getUserById: (request: NextApiRequest, response: NextApiResponse) => void;
  login: (request: NextApiRequest, response: NextApiResponse) => void;
  registerUser: (request: NextApiRequest, response: NextApiResponse) => void;
}

export const userController: UserController = {
  getUsers,
  getUserById,
  login,
  registerUser,
};
