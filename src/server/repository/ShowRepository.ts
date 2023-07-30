import { supabase } from "@server/infra/database/supabase";
import { Show, showSchema } from "@server/schema/show";

async function getAllShows(): Promise<Show[]> {
  const { data, error } = await supabase.from("NAME_TABLE_SHOWS").select("*");
  if (error) throw new Error(error.message);

  const parsedData = showSchema.array().safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

export const showRepository = {
  getAllShows,
};
