import axios from "axios";
import { API } from "../config/api";
import type {
  GetStoryListResponse,
  GetStoriesByCategoryResponse,
  GetStoryBySlugResponse
} from "../types/storyType";
import type { GetStoryParams } from "../types/storyType";
const API_STORY = `${API}/story`;

export const getStorySlug=async(slug:string):Promise<GetStoryBySlugResponse>=>{
  try {
    const res=await axios.get<GetStoryBySlugResponse>(`${API_STORY}/${slug}`)
    return res.data
    
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message;
    }
    throw new Error("Unknown error");
  }
}

export const getAllStory = async (
  params?: GetStoryParams
): Promise<GetStoriesByCategoryResponse> => {
  try {
    const res = await axios.get<GetStoriesByCategoryResponse>(
      `${API_STORY}/all`,
      { params }
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
  params?: GetStoryParams
): Promise<GetStoriesByCategoryResponse> => {
  try {
    const res = await axios.get<GetStoriesByCategoryResponse>(
      `${API_STORY}/category/${slug}`,
      { params }
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
