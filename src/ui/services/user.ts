import { User, userSchema } from "@server/schema/user";
import { CreateUser, UserLogin } from "@server/types/user";
import { LoggedUser } from "@ui/types/user";

function getUsers(): Promise<User[]> {
  return fetch("/api/users").then(async (response) => {
    if (!response.ok) throw new Error("Failed to Request Users");

    const userResponse = await response.json();
    const users = userSchema.array().safeParse(userResponse);
    if (!users.success) throw new Error(users.error.message);

    return users.data;
  });
}

function getUserById(userId: string): Promise<User> {
  return fetch(`/api/users/${userId}`).then(async (response) => {
    if (!response.ok) throw new Error("Failed to Request User");

    const userResponse = await response.json();
    const user = userSchema.safeParse(userResponse);
    if (!user.success) throw new Error(user.error.message);

    return user.data;
  });
}

function login(userLogin: UserLogin): Promise<LoggedUser> {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLogin),
  }).then(async (response) => {
    if (!response.ok) throw new Error("Failed to Login");

    const userResponse: LoggedUser = await response.json();

    const token = response.headers.get("token");
    if (!token) throw new Error("Failed to Request Token");
    localStorage.setItem("token", token);

    return userResponse;
  });
}

function registerUser(userBody: CreateUser): Promise<LoggedUser> {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userBody),
  }).then(async (response) => {
    if (!response.ok) {
      return await response.json().then(({ error }) => {
        throw new Error(error.message);
      });
    }

    const userResponse: LoggedUser = await response.json();
    const token = response.headers.get("token");
    if (!token) throw new Error("Failed to Request Token");
    localStorage.setItem("token", token);

    return userResponse;
  });
}

function updateUserRole(userId: string, admin: boolean): Promise<User> {
  console.log(userId, admin);
  return fetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // token: localStorage.getItem("token") || "",
    },
    body: JSON.stringify({ admin }),
  }).then(async (response) => {
    if (!response.ok) {
      return await response.json().then(({ error }) => {
        throw new Error(error.message);
      });
    }

    const userResponse: User = await response.json();
    return userResponse;
  });
}

interface UserService {
  getUsers: () => Promise<User[]>;
  getUserById: (userId: string) => Promise<User>;
  login: (userBody: UserLogin) => Promise<LoggedUser>;
  registerUser: (userBody: CreateUser) => Promise<LoggedUser>;
  updateUserRole: (userId: string, admin: boolean) => Promise<User>;
}

export const userService: UserService = {
  getUsers,
  getUserById,
  login,
  registerUser,
  updateUserRole,
};
