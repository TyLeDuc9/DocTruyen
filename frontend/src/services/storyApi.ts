import axios from "axios";
import { API } from "../config/api";
import type {
  GetStoryListResponse,
  GetStoriesByCategoryResponse,
  GetStoryBySlugResponse,
} from "../types/storyType";
import type { GetStoryParams } from "../types/storyType";
const API_STORY = `${API}/story`;

export const getStorySlug = async (
  slug: string,
): Promise<GetStoryBySlugResponse> => {
  try {
    const res = await axios.get<GetStoryBySlugResponse>(`${API_STORY}/${slug}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message;
    }
    throw new Error("Unknown error");
  }
};
export const getStoryComplete=async(params?:GetStoryParams):Promise<GetStoriesByCategoryResponse>=>{
  const res=await axios.get(`${API}/story/complete`, {params})
  return res.data
}
export const getTopView=async(params?:GetStoryParams):Promise<GetStoriesByCategoryResponse>=>{
  const res=await axios.get(`${API}/story/top-view`, {params})
  return res.data
}
export const getTopDay = async (
  params?: GetStoryParams,
): Promise<GetStoriesByCategoryResponse> => {
  const res = await axios.get(`${API}/story/top-day`, { params });
  return res.data;
};
export const getTopWeek = async (
  params?: GetStoryParams,
): Promise<GetStoriesByCategoryResponse> => {
  const res = await axios.get(`${API}/story/top-week`, { params });
  return res.data;
};
export const getTopMonth = async (
  params?: GetStoryParams,
): Promise<GetStoriesByCategoryResponse> => {
  const res = await axios.get(`${API}/story/top-month`, {
    params,
  });

  return res.data;
};

export const getAllStory = async (
  params?: GetStoryParams,
): Promise<GetStoriesByCategoryResponse> => {
  try {
    const res = await axios.get<GetStoriesByCategoryResponse>(
      `${API_STORY}/all`,
      { params },
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message;
    }
    throw new Error("Unknown error");
  }
};

export const getCategorySlugStory = async (
  slug: string,
  params?: GetStoryParams,
): Promise<GetStoriesByCategoryResponse> => {
  try {
    const res = await axios.get<GetStoriesByCategoryResponse>(
      `${API_STORY}/category/${slug}`,
      { params },
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message;
    }
    throw new Error("Unknown error");
  }
};

export const getLatestStory = async (): Promise<GetStoryListResponse> => {
  try {
    const res = await axios.get<GetStoryListResponse>(`${API_STORY}/latest`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message;
    }
    throw new Error("Unknown error");
  }
};

export const getRandomStory = async (): Promise<GetStoryListResponse> => {
  try {
    const res = await axios.get<GetStoryListResponse>(`${API_STORY}/random`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message;
    }
    throw new Error("Unknown error");
  }
};
