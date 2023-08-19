import { z as schema } from "zod";

export const userSchema = schema.object({
  id: schema.string().uuid(),
  name: schema.string().nonempty(),
  email: schema.string().email(),
  password: schema.string().nonempty(),
  role: schema.string().nonempty(),
});

export type User = schema.infer<typeof userSchema>;
