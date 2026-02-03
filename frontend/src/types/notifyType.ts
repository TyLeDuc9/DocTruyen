export interface Notify {
  _id: string;
  userId: string;
  title: string;
  message: string;
  storyId?: StoryShort | null;
  chapterId?: ChapterShort | null;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StoryShort {
  _id: string;
  name: string;
  slug: string;
  thumbnail?: string;
}

export interface ChapterShort {
  _id: string;
  title: string;
  slug: string;
  images:string
  displayNumber?: number;
}
export interface GetNotificationsResponse {
  success: boolean;
  page: number;
  limit: number;
  totalPages: number;
  totalNotify: number;
  data: Notify[];
}

export interface GetNotifyParams {
  page?: number;
  limit?: number;
}
