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
