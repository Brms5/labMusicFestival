import { z as schema } from "zod";

export const bandSchema = schema.object({
  id: schema.string().uuid(),
  name: schema.string(),
  music_genre: schema.string(),
  responsible: schema.string(),
});

export type Band = schema.infer<typeof bandSchema>;
