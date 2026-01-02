import axios from "axios";
import { API } from "../config/api";
import type {
  GetAllCategoryResponse,
  GetCategoryBySlugResponse,
} from "../types/categoryType";
const API_CATEGORY = `${API}/category`;

export const getCategorySlug = async (
  slug: string
): Promise<GetCategoryBySlugResponse> => {
  try {
    const res = await axios.get<GetCategoryBySlugResponse>(
      `${API_CATEGORY}/${slug}`
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message;
    }
    throw new Error("Unknown error");
  }
};

export const getAllCategory = async (
  page: number = 1,
  limit: number = 60
): Promise<GetAllCategoryResponse> => {
  try {
    const res = await axios.get<GetAllCategoryResponse>(`${API_CATEGORY}/all`, {
      params: { page, limit },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};
