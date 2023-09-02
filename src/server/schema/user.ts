import { z as schema } from "zod";

export const userSchema = schema.object({
  id: schema.string().uuid(),
  name: schema.string().nonempty(),
  email: schema.string().email(),
  password: schema.string().nonempty(),
  admin: schema.boolean(),
});

export type User = schema.infer<typeof userSchema>;
