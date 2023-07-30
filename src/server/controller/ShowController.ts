import { showRepository } from "@server/repository/ShowRepository";
import { NextApiRequest, NextApiResponse } from "next";

async function getShows(request: NextApiRequest, response: NextApiResponse) {
  try {
    showRepository.getAllShows().then((shows) => {
      response.status(200).json(shows);
    });
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Request Shows",
      },
    });
  }
}

export const showController = {
  getShows,
};
