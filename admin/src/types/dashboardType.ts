
export interface DashboardOverview {
  totalUsers: number;
  totalStories: number;
  totalChapters: number;
  totalViews: number;
}
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
export interface TopViewedStory {
  _id: string;
  name: string;
  slug: string;
  views: number;
  thumbnail: string;
  author?: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "DROPPED";
}
export interface UserRegisterByDate {
  date: string;
  total: number;
}
