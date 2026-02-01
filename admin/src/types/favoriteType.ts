import type {BaseFilterParams} from '../types/filterParams'
export type FavoriteAllResponse = {
  success: boolean;
  page: number;
  limit: number;
  totalPages: number;
  totalFavorites: number;
  data: Favorite[];
};
export type Favorite = {
  _id: string;
  userId: UserFavorite;
  storyId: StoryFavorite;
  createdAt: string;
  updatedAt: string;
};
export type StoryFavorite = {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
  status?: string;
  views?: number;
};
export interface FavoriteParams extends BaseFilterParams {}

export type UserFavorite = {
  _id: string;
  userName: string;
  email: string;
  avatarUrl?: string;
  role: string;
};