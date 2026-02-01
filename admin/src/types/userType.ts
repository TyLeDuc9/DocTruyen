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
export type BlockUserResponse = {
  success: boolean;
  message: string;
  user: User;
};
export interface GetAllUsersResponse {
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  totalUsers: number;
  data: User[];
}
export interface GetUserParams {
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
  search?: string;
  role?: "user" | "admin" | "author";
}
export type GetMeResponse = {
  user: User;
};
export type UpdateUserResponse = {
  message: string;
  user: User;
};
