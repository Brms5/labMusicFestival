import { bandRepository } from "@server/repository/BandRepository";
import { BandBody } from "@server/types/band";
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

async function getBandsWithoutShow(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    bandRepository.findAllBandsWithoutShow().then((bands) => {
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

async function getBandByName(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const bandName = request.query.bandName;
    bandRepository.findBandByName(bandName as string).then((band) => {
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
    const bandBody: BandBody = request.body;
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

async function deleteBandById(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const bandId = request.query.bandId;
    await bandRepository.removeBandById(bandId as string);
    response.status(204).json({
      message: "Band Deleted",
    });
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Delete Band",
      },
    });
  }
}

async function updateBand(request: NextApiRequest, response: NextApiResponse) {
  try {
    const bandBody: BandBody = request.body;
    const band = await bandRepository.editBand(bandBody);
    response.status(200).json(band);
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Failed to Update Band",
      },
    });
  }
}

interface BandController {
  getBands: (request: NextApiRequest, response: NextApiResponse) => void;
  getBandById: (request: NextApiRequest, response: NextApiResponse) => void;
  getBandsWithoutShow: (
    request: NextApiRequest,
    response: NextApiResponse
  ) => void;
  getBandByName: (request: NextApiRequest, response: NextApiResponse) => void;
  createBand: (request: NextApiRequest, response: NextApiResponse) => void;
  deleteBandById: (request: NextApiRequest, response: NextApiResponse) => void;
  updateBand: (request: NextApiRequest, response: NextApiResponse) => void;
}

export const bandController: BandController = {
  getBands,
  getBandById,
  getBandsWithoutShow,
  getBandByName,
  createBand,
  deleteBandById,
  updateBand,
};
