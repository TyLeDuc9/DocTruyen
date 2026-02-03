export interface Notify {
  _id: string;
  userId: NotifyUser;
  title: string;
  message: string;
  storyId?:NotifyStory;
  chapterId?:NotifyChapter;
  link?: string;
  createdAt?: string;
  updatedAt: string | undefined

}
export interface NotifyUser {
  _id: string;
  email: string;
}
export interface NotifyStory {
  _id: string;
  name: string;
  thumbnail: string;
}
export interface NotifyChapter {
  _id: string;
  title: string;
  images: string;
}
export interface CreateNotifyRequest {
  title: string;
  message: string;
  storyId?: string | null;
  chapterId?: string | null;
  link?: string;
}
export interface GetAllNotifyResponse {
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  totalNotifies: number;
  data: Notify[];
}

export interface GetNotifyParams {
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
}
