import axios from "axios";
import { API } from "../config/api";
import type {
  ChapterListResponse,
  ChapterDetailResponse,
} from "../types/chapterType";

const API_CHAPTER = `${API}/chapter`;

export const getDetailChapter = async (chapterSlug: string) => {
  try {
    const res = await axios.get<ChapterDetailResponse>(
      `${API_CHAPTER}/detail/${chapterSlug}`
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message;
    }
    throw new Error("Unknown error");
  }
};

export const getChaptersByStorySlug = async (storySlug: string) => {
  try {
    const res = await axios.get<ChapterListResponse>(
      `${API_CHAPTER}/${storySlug}`
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message;
    }
    throw new Error("Unknown error");
  }
};
