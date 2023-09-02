import { Band, bandSchema } from "@server/schema/band";
import { BandBody } from "@ui/types/band";

function getBands(): Promise<Band[]> {
  return fetch("/api/bands").then(async (response) => {
    if (!response.ok) throw new Error("Failed to Request Bands");

    const bandResponse = await response.json();
    const bands = bandSchema.array().safeParse(bandResponse);
    if (!bands.success) throw new Error(bands.error.message);

    return bands.data;
  });
}

function getBandById(bandId: string): Promise<Band> {
  return fetch(`/api/bands/${bandId}`).then(async (response) => {
    if (!response.ok) throw new Error("Failed to Request Band");

    const bandResponse = await response.json();
    const band = bandSchema.safeParse(bandResponse);
    if (!band.success) throw new Error(band.error.message);

    return band.data;
  });
}

function getBandsWithoutShow(): Promise<Band[]> {
  return fetch("/api/bands/no-show").then(async (response) => {
    if (!response.ok) throw new Error("Failed to Request Bands");

    const bandResponse = await response.json();
    const bands = bandSchema.array().safeParse(bandResponse);
    if (!bands.success) throw new Error(bands.error.message);

    return bands.data;
  });
}

function getBandByName(bandName: string): Promise<Band> {
  return fetch(`/api/bands/name/${bandName}`).then(async (response) => {
    if (!response.ok) throw new Error("Failed to Request Band");

    const bandResponse = await response.json();
    return bandResponse;
  });
}

function createBand(band: BandBody): Promise<Band> {
  return fetch("/api/bands", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(band),
  }).then(async (response) => {
    if (!response.ok) throw new Error("Failed to Create Band");

    const bandResponse = await response.json();
    const band = bandSchema.safeParse(bandResponse);
    if (!band.success) throw new Error(band.error.message);

    return band.data;
  });
}

function deleteBand(bandId: string): Promise<void> {
  return fetch(`/api/bands/${bandId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) throw new Error("Failed to Delete Band");
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

interface BandService {
  getBands: () => Promise<Band[]>;
  getBandById: (bandId: string) => Promise<Band>;
  getBandsWithoutShow: () => Promise<Band[]>;
  getBandByName: (bandName: string) => Promise<Band>;
  createBand: (band: BandBody) => Promise<Band>;
  deleteBand: (bandId: string) => Promise<void>;
}

export const bandService: BandService = {
  getBands,
  getBandById,
  getBandsWithoutShow,
  getBandByName,
  createBand,
  deleteBand,
};
