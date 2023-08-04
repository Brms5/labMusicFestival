import { Band, bandSchema } from "@server/schema/band";

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

interface BandService {
  getBands: () => Promise<Band[]>;
  getBandById: (bandId: string) => Promise<Band>;
}

export const bandService: BandService = {
  getBands,
  getBandById,
};
