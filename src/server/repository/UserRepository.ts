import { supabase } from "@server/infra/database/supabase";
import { User, userSchema } from "@server/schema/user";
import { UserBody } from "@server/types/user";

async function findAllUsers(): Promise<User[]> {
  const { data, error } = await supabase.from("NAME_TABLE_USERS").select("*");
  if (error) throw new Error(error.message);

  const parsedData = userSchema.array().safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

async function findUserById(userId: string): Promise<User> {
  const { data, error } = await supabase
    .from("NAME_TABLE_USERS")
    .select("*")
    .eq("id", `${userId}`)
    .single();
  if (error) throw new Error(error.message);

  const parsedData = userSchema.safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

async function findUserByEmail(email: string): Promise<User> {
  const { data, error } = await supabase
    .from("NAME_TABLE_USERS")
    .select("*")
    .eq("email", `${email}`)
    .single();
  if (error) throw new Error(error.message);

  const parsedData = userSchema.safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

async function insertNewUser(userBody: UserBody): Promise<User> {
  const { data, error } = await supabase
    .from("NAME_TABLE_USERS")
    .insert([userBody])
    .select("*")
    .single();
  if (error) throw new Error(error.message);

  const parsedData = userSchema.safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

interface UserRepository {
  findAllUsers: () => Promise<User[]>;
  findUserById: (userId: string) => Promise<User>;
  findUserByEmail: (email: string) => Promise<User>;
  insertNewUser: (userBody: UserBody) => Promise<User>;
}

export const userRepository: UserRepository = {
  findAllUsers,
  findUserById,
  findUserByEmail,
  insertNewUser,
};
