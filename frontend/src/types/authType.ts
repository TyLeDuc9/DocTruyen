import type { User } from "./userType";

export type LoginResponse = {
  message: string;
  accessToken: string;
  user: User;
};

export type RegisterResponse = {
  message: string;
  user: {
    id: string;
    email: string;
    role: "user" | "admin" | "author";
  };
};
