import { supabase } from "@server/infra/database/supabase";
import { Show, showSchema } from "@server/schema/show";

async function findAllShows(): Promise<Show[]> {
  const { data, error } = await supabase.from("NAME_TABLE_SHOWS").select("*");
  if (error) throw new Error(error.message);

  const parsedData = showSchema.array().safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

async function findShowsByDate(weekDay: string): Promise<Show[]> {
  console.log("WEEKDAY: ", weekDay);
  const { data, error } = await supabase
    .from("NAME_TABLE_SHOWS")
    .select("*")
    .eq("week_day", `${weekDay}`);
  if (error) throw new Error(error.message);

  const parsedData = showSchema.array().safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

export const showRepository = {
  findAllShows,
  findShowsByDate,
};
