import { showRepository } from "@server/repository/ShowRepository";
import { Show } from "@server/schema/show";
import { ShowBody } from "@server/types/show";
import { NextApiRequest, NextApiResponse } from "next";

async function getShows(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  try {
    showRepository.findAllShows().then((shows: Show[]) => {
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

async function createShow(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  try {
    const showBody = request.body as ShowBody;
    showRepository.insertNewShow(showBody).then((show: Show) => {
      response.status(200).json(show);
    });
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Create Show",
      },
    });
  }
}

interface ShowController {
  getShows: (request: NextApiRequest, response: NextApiResponse) => void;
  getShowsByDate: (request: NextApiRequest, response: NextApiResponse) => void;
  createShow: (request: NextApiRequest, response: NextApiResponse) => void;
}

export const showController: ShowController = {
  getShows,
  getShowsByDate,
  createShow,
};
