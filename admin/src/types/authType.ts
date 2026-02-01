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
