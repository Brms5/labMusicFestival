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

async function deleteShow(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  try {
    const showId = request.query.id as string;
    showRepository.removeShow(showId).then(() => {
      response.status(204).json({
        message: "Show Deleted",
      });
    });
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Delete Show",
      },
    });
  }
}

async function updateShow(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  try {
    const showBody = {
      id: request.body.showId,
      week_day: request.body.day,
      start_time: request.body.startTime,
      end_time: request.body.endTime,
      band_id: request.body.band,
    };
    showRepository.editShow(showBody).then((show: Show) => {
      response.status(200).json(show);
    });
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Update Show",
      },
    });
  }
}

interface ShowController {
  getShows: (request: NextApiRequest, response: NextApiResponse) => void;
  getShowsByDate: (request: NextApiRequest, response: NextApiResponse) => void;
  createShow: (request: NextApiRequest, response: NextApiResponse) => void;
  deleteShow: (request: NextApiRequest, response: NextApiResponse) => void;
  updateShow: (request: NextApiRequest, response: NextApiResponse) => void;
}

export const showController: ShowController = {
  getShows,
  getShowsByDate,
  createShow,
  deleteShow,
  updateShow,
};
