import type { User } from "./userType";

export type ChangePassRequest = {
  oldPassword: string;
  newPassword: string;
};

export type LoginResponse = {
  message: string;
  accessToken: string;
  user: User;
};
export type AuthRequest={
  email:string,
  password:string
}
export type RegisterResponse = {
  message: string;
  user: {
    id: string;
    email: string;
    role: "user" | "admin" | "author";
  };
};
