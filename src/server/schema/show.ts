import { z as schema } from "zod";

export const showSchema = schema.object({
  id: schema.string().uuid(),
  week_day: schema.string().nonempty(),
  start_time: schema.number().nonnegative(),
  end_time: schema.number().nonnegative(),
  band_id: schema.string().uuid(),
});

export type Show = schema.infer<typeof showSchema>;
