export interface Story {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  totalChapters: number;
}
export interface DeleteChapterRequest {
  chapterId: string;
}
export interface GetChapterHistoryListResponse {
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  totalChapters: number;
  data: ChapterHistoryItem[];
}
export interface ChapterHistoryItem {
  lastChapter: Chapter;
  lastReadAt: string;
}
export interface GetChapterParams {
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
}

export interface ChapterHistoryReponse {
  message: string;
  data: {
    lastChapter: Chapter;
    lastReadAt: string;
  };
}
export interface Chapter {
  id: string;
  title: string;
  displayNumber: string;
  slug: string;
  chapterMain: number;
  chapterSub: number;
  storyId?: string;
}
export interface ReadingHistoryRequest {
  storyId: string;
  chapterId?: string;
}
export interface ReadingHistoryListResponse {
  message: string;
  data: ReadingHistoryData[];
}
export interface ReadingHistoryData {
  story: Story;
  lastChapterId: string | null;
  lastReadAt: string;
}
export interface ReadingHistoryResponse {
  message: string;
  data: ReadingHistoryData;
}
