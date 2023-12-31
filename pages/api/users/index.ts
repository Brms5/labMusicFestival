import { userController } from "@server/controller/UserController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    await userController.getUsers(request, response);
    return;
  }

  if (request.method === "POST") {
    await userController.registerUser(request, response);
    return;
  }

  response.status(405).json({
    error: {
      message: `Method ${request.method} not allowed`,
    },
  });
}
