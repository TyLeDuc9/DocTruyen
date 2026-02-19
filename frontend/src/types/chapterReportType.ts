export type ChapterReportStatus = "PENDING" | "FIXED" | "REJECTED";

export interface ChapterReport {
  _id: string;
  chapterId: string;
  userId: string;
  reason: string;
  status: ChapterReportStatus;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChapterReport {
  chapterId: string;
  reason: string;
}