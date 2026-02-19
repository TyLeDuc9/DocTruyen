import axiosInstance from "../utils/axiosInstance";
import { API } from "../config/api";
import type { CreateChapterReport } from "../types/chapterReportType";
const API_CHAPTER_REPORT = `${API}/chapter-report`;
export const createChapterReport = async (
  data: CreateChapterReport
) => {
  return axiosInstance.post(`${API_CHAPTER_REPORT}/create`, data);
};