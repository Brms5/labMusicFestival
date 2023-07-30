import { supabase } from "@server/infra/database/supabase";
import { Band, bandSchema } from "@server/schema/band";

async function getAllBands(): Promise<Band[]> {
  const { data, error } = await supabase.from("NAME_TABLE_BANDS").select("*");
  if (error) throw new Error(error.message);

  const parsedData = bandSchema.array().safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

export const bandRepository = {
  getAllBands,
};
