export type ChapterType = "TEXT" | "IMAGE" | "MIXED";
export interface StoryBasic {
  _id: string;
  name: string;
  slug: string;
}
export interface Chapter {
  _id: string;
  title: string;
  slug: string;
  chapterMain: number;
  chapterSub: number;
  displayNumber: string;
  content: string | null;
  images: string[];
  type: ChapterType;
  views: number;
  storyId: StoryBasic; 
  createdAt: string;
  updatedAt: string;
  isDeleted:boolean
  __v?: number;
}
export interface CreateChapterRequest {
  title: string;
  chapterMain: number;
  chapterSub?: number;        
  content?: string | null;  
  storyId: string;
}
export interface CreateChapterResponse {
  message: string;
  data: Chapter;
}


export interface GetAllChapterResponse {
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  totalChapters: number;
  data: Chapter[];
}

export interface ChapterParams {
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest" | "old";
  type?: ChapterType;
  search?: string; 
}
