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

async function findAllBandsWithoutShow(): Promise<Band[]> {
  const { data, error } = await supabase
    .from("NAME_TABLE_BANDS")
    .select("*")
    .is("show_id", null);
  if (error) throw new Error(error.message);

  const parsedData = bandSchema.array().safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

async function findBandByName(bandName: string): Promise<Band | null> {
  const { data, error } = await supabase
    .from("NAME_TABLE_BANDS")
    .select("*")
    .eq("name", `${bandName}`)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(error.message);
  }

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

async function insertShowIdInBand(showId: string, bandId: string) {
  const { error } = await supabase
    .from("NAME_TABLE_BANDS")
    .update({ show_id: showId })
    .eq("id", `${bandId}`);

  if (error) throw new Error(error.message);
}

async function removeBandById(bandId: string) {
  const { error } = await supabase
    .from("NAME_TABLE_BANDS")
    .delete()
    .eq("id", `${bandId}`);

  if (error) throw new Error(error.message);
}

async function editBand(bandBody: BandBody): Promise<Band> {
  const { error, data } = await supabase
    .from("NAME_TABLE_BANDS")
    .update(bandBody)
    .eq("name", `${bandBody.name}`)
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
  findAllBandsWithoutShow: () => Promise<Band[]>;
  findBandByName: (bandName: string) => Promise<Band | null>;
  insertNewBand: (bandBody: BandBody) => Promise<Band>;
  insertShowIdInBand: (showId: string, bandId: string) => Promise<void>;
  removeBandById: (bandId: string) => Promise<void>;
  editBand: (bandBody: BandBody) => Promise<Band>;
}

export const bandRepository: BandRepository = {
  findAllBands,
  findBandById,
  findAllBandsWithoutShow,
  findBandByName,
  insertNewBand,
  insertShowIdInBand,
  removeBandById,
  editBand,
};
