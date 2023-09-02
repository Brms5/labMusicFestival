import { showController } from "@server/controller/ShowController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    if (request.query.weekday) {
      await showController.getShowsByDate(request, response);
    } else {
      await showController.getShows(request, response);
    }
    return;
  }

  if (request.method === "DELETE") {
    await showController.deleteShow(request, response);
    return;
  }

  if (request.method === "POST") {
    await showController.createShow(request, response);
    return;
  }

  response.status(405).json({
    error: {
      message: `Method ${request.method} not allowed`,
    },
  });
}
