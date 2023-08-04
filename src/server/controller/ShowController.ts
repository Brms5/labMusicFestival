import { showRepository } from "@server/repository/ShowRepository";
import { Show } from "@server/schema/show";
import { NextApiRequest, NextApiResponse } from "next";

async function getShowsByDate(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  try {
    const weekDay = request.query.weekday as string;
    showRepository.findShowsByDate(weekDay).then((shows: Show[]) => {
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

interface ShowController {
  getShowsByDate: (request: NextApiRequest, response: NextApiResponse) => void;
}

export const showController: ShowController = {
  getShowsByDate,
};
