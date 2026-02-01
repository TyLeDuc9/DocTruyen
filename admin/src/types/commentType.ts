import type {BaseFilterParams} from '../types/filterParams'
export interface User {
  _id: string;
  userName: string;
  email: string;
}

export interface Story {
  _id: string;
  name: string;
}

export interface Chapter {
  _id: string;
  chapterMain: string;
  title:string
}

export interface Reply {
  _id: string;
  userId: User;   
  content: string;
  likes: string[];
  dislikes: string[];
  createdAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  userId: User;
  storyId: Story;
  chapterId: Chapter | null;   
  likes: string[];
  dislikes: string[];
  replies: Reply[];           
  createdAt: string;
  updatedAt: string;
}

export interface CommentResponse {
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  totalComments: number;
  data: Comment[];
}

export interface GetCommentsParams extends BaseFilterParams{}