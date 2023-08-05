import { supabase } from "@server/infra/database/supabase";
import { Band, bandSchema } from "@server/schema/band";
import { BandBody } from "@server/types/band";

async function findAllBands(): Promise<Band[]> {
  const { data, error } = await supabase.from("NAME_TABLE_BANDS").select("*");
  if (error) throw new Error(error.message);

  const parsedData = bandSchema.array().safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

async function findBandById(bandId: string): Promise<Band> {
  const { data, error } = await supabase
    .from("NAME_TABLE_BANDS")
    .select("*")
    .eq("id", `${bandId}`)
    .single();
  if (error) throw new Error(error.message);

  const parsedData = bandSchema.safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

async function insertNewBand(bandBody: BandBody): Promise<Band> {
  const { data, error } = await supabase
    .from("NAME_TABLE_BANDS")
    .insert([bandBody])
    .select("*")
    .single();
  if (error) throw new Error(error.message);

  const parsedData = bandSchema.safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

interface BandRepository {
  findAllBands: () => Promise<Band[]>;
  findBandById: (bandId: string) => Promise<Band>;
  insertNewBand: (bandBody: BandBody) => Promise<Band>;
}

export const bandRepository: BandRepository = {
  findAllBands,
  findBandById,
  insertNewBand,
};
