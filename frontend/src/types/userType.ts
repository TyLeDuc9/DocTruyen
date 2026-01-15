import type { ReactNode } from "react";
export type User = {
  _id: string;
  id?: string;
  email: string;
  userName?: string;
  avatarUrl?: string;
  role: "user" | "admin" | "author";
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
};
export type GetMeResponse = {
  user: User;
};
export type UpdateUserResponse = {
  message: string;
  user: User;
};
export type MenuItem = {
  id: number;
  name: string;
  icon: ReactNode;
  to?: string;
  external?: boolean;
  url?: string;
  action?: () => void;
};