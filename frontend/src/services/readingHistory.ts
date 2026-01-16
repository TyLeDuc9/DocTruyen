import axiosInstance from "../utils/axiosInstance";
import type {
  ReadingHistoryData,
  ReadingHistoryResponse,
  ReadingHistoryRequest,
  ReadingHistoryListResponse,
} from "../types/readingHistoryType";

export const saveReadingHistory = async (
  data: ReadingHistoryRequest
): Promise<ReadingHistoryData> => {
  const res = await axiosInstance.post<ReadingHistoryResponse>(
    "/reading-history/story",
    data
  );

  return res.data.data;
};

export const getReadingHistory = async (): Promise<ReadingHistoryData[]> => {
  const res = await axiosInstance.get<ReadingHistoryListResponse>(
    "/reading-history/story"
  );
  return res.data.data;
};
