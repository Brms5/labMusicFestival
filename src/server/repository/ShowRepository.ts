import { supabase } from "@server/infra/database/supabase";
import { Show, showSchema } from "@server/schema/show";
import { ShowBody } from "@server/types/show";
import { bandRepository } from "./BandRepository";

async function findAllShows(): Promise<Show[]> {
  const { data, error } = await supabase.from("NAME_TABLE_SHOWS").select("*");
  if (error) throw new Error(error.message);

  const parsedData = showSchema.array().safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

async function findShowsByDate(weekDay: string): Promise<Show[]> {
  const { data, error } = await supabase
    .from("NAME_TABLE_SHOWS")
    .select("*")
    .eq("week_day", `${weekDay}`);
  if (error) throw new Error(error.message);

  const parsedData = showSchema.array().safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

async function insertNewShow(showBody: ShowBody): Promise<Show> {
  const { data, error } = await supabase
    .from("NAME_TABLE_SHOWS")
    .insert([showBody])
    .select("*")
    .single();
  if (error) throw new Error(error.message);

  bandRepository.insertShowIdInBand(data.id, showBody.band_id);

  const parsedData = showSchema.safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

async function removeShow(showId: string): Promise<void> {
  const { error } = await supabase
    .from("NAME_TABLE_SHOWS")
    .delete()
    .eq("id", showId);
  if (error) throw new Error(error.message);
}

async function editShow(showBody: Show): Promise<Show> {
  const { data, error } = await supabase
    .from("NAME_TABLE_SHOWS")
    .update(showBody)
    .eq("id", showBody.id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);

  const parsedData = showSchema.safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

interface ShowRepository {
  findAllShows: () => Promise<Show[]>;
  findShowsByDate: (weekDay: string) => Promise<Show[]>;
  insertNewShow: (showBody: ShowBody) => Promise<Show>;
  removeShow: (showId: string) => Promise<void>;
  editShow: (showBody: Show) => Promise<Show>;
}

export const showRepository: ShowRepository = {
  findAllShows,
  findShowsByDate,
  insertNewShow,
  removeShow,
  editShow,
};
