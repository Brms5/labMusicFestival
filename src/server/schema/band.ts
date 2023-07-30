import { z as schema } from "zod";

export const bandSchema = schema.object({
  id: schema.string().uuid(),
  name: schema.string().nonempty(),
  music_genre: schema.string().nonempty(),
  responsible: schema.string().nonempty(),
});

export type Band = schema.infer<typeof bandSchema>;
