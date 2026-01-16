export interface Story {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  totalChapters: number;
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
