import { supabase } from "@server/infra/database/supabase";
import { User, userSchema } from "@server/schema/user";
import { CreateUser } from "@server/types/user";

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

async function findUserByEmail(userBody: CreateUser): Promise<User> {
  const { data, error } = await supabase
    .from("NAME_TABLE_USERS")
    .select("*")
    .eq("email", `${userBody.email}`)
    .eq("password", `${userBody.password}`)
    .single();

  if (error) throw new Error(error.message);

  const parsedData = userSchema.safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

async function insertNewUser(userBody: CreateUser): Promise<User> {
  const { data, error } = await supabase
    .from("NAME_TABLE_USERS")
    .insert([userBody])
    .select("*")
    .single();
  if (error) {
    if (error.code === "23505") {
      throw new Error("Email já cadastrado.");
    }
    throw new Error(error.message);
  }

  const parsedData = userSchema.safeParse(data);
  if (!parsedData.success) throw new Error(parsedData.error.message);

  return parsedData.data;
}

async function alterUserRole(userId: string, role: string): Promise<User> {
  const { data, error } = await supabase
    .from("NAME_TABLE_USERS")
    .update({ role })
    .eq("id", `${userId}`)
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
  findUserByEmail: (userBody: CreateUser) => Promise<User>;
  insertNewUser: (userBody: CreateUser) => Promise<User>;
  alterUserRole: (userId: string, role: string) => Promise<User>;
}

export const userRepository: UserRepository = {
  findAllUsers,
  findUserById,
  findUserByEmail,
  insertNewUser,
  alterUserRole,
};
