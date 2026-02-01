import type {BaseFilterParams} from '../types/filterParams'
export type FollowAllResponse = {
  success: boolean;
  page: number;
  limit: number;
  totalPages: number;
  totalFavorites: number;
  data: Follow[];
};
export interface FollowParams extends BaseFilterParams{}
export type Follow = {
  _id: string;
  userId: UserFollow;
  storyId: StoryFollow;
  createdAt: string;
  updatedAt: string;
};
export type StoryFollow = {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
  status?: string;
  views?: number;
};
export type UserFollow = {
  _id: string;
  userName: string;
  email: string;
  avatarUrl?: string;
  role: string;
};