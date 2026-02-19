export type ChapterReportStatus = "PENDING" | "FIXED" | "REJECTED";
export interface UpdateChapterReportStatus {
  status: ChapterReportStatus;
}
export interface GetAllChapterReportParams {
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest" | "old";
  status?: ChapterReportStatus;
  chapterId?: string;
  search?: string;
}
export interface GetAllChapterReportResponse {
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  totalReports: number;
  data: ChapterReportAdminItem[];
}
export interface ChapterReportAdminItem {
  _id: string;
  chapterId: {
    _id: string;
    title: string;
    slug: string;
    chapterNumber: number;
  };
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  reason: string;
  status: ChapterReportStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ChapterReport {
  _id: string;
  chapterId: string;
  userId: string;
  reason: string;
  status: ChapterReportStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChapterReport {
  chapterId: string;
  reason: string;
}