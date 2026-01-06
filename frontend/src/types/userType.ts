export type User = {
  id: string;
  userName?: string;
  email: string;
  role: "user" | "admin" | "author";
  avatarUrl?: string;
};