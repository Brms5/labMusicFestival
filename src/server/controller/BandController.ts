import { bandRepository } from "@server/repository/BandRepository";
import { CreateBand } from "@server/types/band";
import { NextApiRequest, NextApiResponse } from "next";

async function getBands(request: NextApiRequest, response: NextApiResponse) {
  try {
    bandRepository.findAllBands().then((bands) => {
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

async function getBandById(request: NextApiRequest, response: NextApiResponse) {
  try {
    const bandId = request.query.bandId;
    bandRepository.findBandById(bandId as string).then((band) => {
      response.status(200).json(band);
    });
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Request Band",
      },
    });
  }
}

async function createBand(request: NextApiRequest, response: NextApiResponse) {
  try {
    const bandBody: CreateBand = request.body;
    const band = await bandRepository.insertNewBand(bandBody);
    response.status(201).json(band);
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Create Band",
      },
    });
  }
}

interface BandController {
  getBands: (request: NextApiRequest, response: NextApiResponse) => void;
  getBandById: (request: NextApiRequest, response: NextApiResponse) => void;
  createBand: (request: NextApiRequest, response: NextApiResponse) => void;
}

export const bandController: BandController = {
  getBands,
  getBandById,
  createBand,
};
