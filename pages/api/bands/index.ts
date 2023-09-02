import { bandController } from "@server/controller/BandController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    await bandController.getBands(request, response);
    return;
  }

  if (request.method === "POST") {
    await bandController.createBand(request, response);
    return;
  }

  if (request.method === "PUT") {
    await bandController.updateBand(request, response);
    return;
  }

  response.status(405).json({
    error: {
      message: `Method ${request.method} not allowed`,
    },
  });
}
