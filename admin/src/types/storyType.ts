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
  isDeleted: boolean;
}
export interface UpdateStoryFormState {
  name: string;
  alternateName: string[];
  author: string;
  country: string;
  status: StoryStatus;
  categoryId: string[];
  description: string;
  totalChapters: string;
  thumbnail?: File | string;
}
export interface UpdateStoryRequest {
  name?: string;
  alternateName?: string[];
  author?: string;
  status?: StoryStatus;
  country?: string;
  description?: string;
  categoryId?: string[];
  totalChapters?: number; 
  thumbnail?: File | string;
}

export interface UpdateStoryResponse {
  message: string;
  data: Story;
}

export interface GetStoryBySlugResponse {
  message: string;
  data: Story;
}
export interface CreateStoryRequest {
  name: string;
  alternateName: string[];
  author?: string;
  status?: StoryStatus;
  country?: string;
  description?: string;
  categoryId?: string[];
  thumbnail: File;
  totalChapters?: number;
}

export interface CreateStoryResponse extends Story {}
export interface GetAllStoryResponse {
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  totalStories: number;
  data: Story[];
}
export interface GetStoryParams {
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
  status?: StoryStatus;
  categorySlug?: string;
  search?: string;
}
