import type { Category } from "./categoryType";
export type StoryStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "DROPPED";
export interface Story {
  _id: string;
  name: string;
  alternateName: string[];
  slug: string;
  author?: string;
  status: StoryStatus;
  views: number;
  thumbnail: string;
  country?: string;
  totalChapters: number;
  description?: string;
  categoryId: Category[] | string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetStoriesByCategoryResponse {
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  totalStories: number;
  story: Story[];
}

export interface GetStoryListResponse {
  message: string;
  story: Story[];
}

export interface GetStoryBySlugResponse {
  message: string;
  data: Story;
}

export interface GetStoryParams {
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
  country?: string;
  status?: StoryStatus;
  keyword?: string;
}
