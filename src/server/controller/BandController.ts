import { bandRepository } from "@server/repository/BandRepository";
import { NextApiRequest, NextApiResponse } from "next";

async function getBands(request: NextApiRequest, response: NextApiResponse) {
  try {
    bandRepository.getAllBands().then((bands) => {
      response.status(200).json(bands);
    });
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Request Bands",
      },
    });
  }
}

export const bandController = {
  getBands,
};
