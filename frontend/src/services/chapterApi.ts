import axiosPublic from "../utils/axiosPublic";
import { API } from "../config/api";
import type {
  ChapterListResponse,
  ChapterDetailResponse,
} from "../types/chapterType";

const API_CHAPTER = `${API}/chapter`;

export const getDetailChapter = async (chapterSlug: string) => {
  try {
    const res = await axiosPublic.get<ChapterDetailResponse>(
      `${API_CHAPTER}/detail/${chapterSlug}`
    );
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error.message;
    }
    throw new Error("Unknown error");
  }
};

export const getChaptersByStorySlug = async (storySlug: string) => {
  try {
    const res = await axiosPublic.get<ChapterListResponse>(
      `${API_CHAPTER}/${storySlug}`
    );
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error.message;
    }
    throw new Error("Unknown error");
  }
};