import { userRepository } from "@server/repository/UserRepository";
import { LoggedUserResponse, CreateUser } from "@server/types/user";
import { NextApiRequest, NextApiResponse } from "next";
import jsonwebtoken from "jsonwebtoken";
import { User } from "@server/schema/user";

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
    const userBody: CreateUser = request.body;
    const user: User = await userRepository.findUserByEmail(userBody);

    const loggedUser: LoggedUserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
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
    const userBody: CreateUser = request.body;
    userBody.role = "normal";
    const user = await userRepository.insertNewUser(userBody);

    const loggedUser: LoggedUserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      "SECRET_KEY",
      {
        expiresIn: "1h",
      }
    );

    response.setHeader("token", `${token}`);
    response.status(201).json(loggedUser);
  } catch (error) {
    if (error instanceof Error) {
      response.status(400).json({
        error: {
          message: error.message,
        },
      });
    }
  }
}

async function updateUserRole(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const userId = request.query.userid;
    const role = request.body.role;
    userRepository.alterUserRole(userId as string, role as string).then(() => {
      response.status(200).json({
        message: "User Role Updated",
      });
    });
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Update User Role",
      },
    });
  }
}

interface UserController {
  getUsers: (request: NextApiRequest, response: NextApiResponse) => void;
  getUserById: (request: NextApiRequest, response: NextApiResponse) => void;
  login: (request: NextApiRequest, response: NextApiResponse) => void;
  registerUser: (request: NextApiRequest, response: NextApiResponse) => void;
  updateUserRole: (request: NextApiRequest, response: NextApiResponse) => void;
}

export const userController: UserController = {
  getUsers,
  getUserById,
  login,
  registerUser,
  updateUserRole,
};
