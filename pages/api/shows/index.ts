import { showController } from "@server/controller/ShowController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    await showController.getShowsByDate(request, response);
    return;
  }

  response.status(405).json({
    error: {
      message: `Method ${request.method} not allowed`,
    },
  });
}
