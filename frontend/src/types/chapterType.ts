export type ChapterType = "TEXT" | "IMAGE";

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
  storyId: string;
  createdAt: string;
  updatedAt: string;
  isDeleted:boolean;
  __v?: number;
}

export interface ChapterListResponse {
  message: string;
  story: {
    _id: string;
    name: string;
    slug: string;
  };
  total: number;
  data: Chapter[];
}

export interface ChapterDetailResponse {
  message: string;
  story: {
    _id: string;
    name: string;
    slug: string;
  };
  data: Chapter;
}