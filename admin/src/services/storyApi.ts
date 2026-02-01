import axios from "axios";
import axiosAdmin from "../utils/axiosAdmin";
import { API } from "../config/api";
import type {
  GetAllStoryResponse,
  GetStoryBySlugResponse,
  GetStoryParams,
  CreateStoryRequest,
  CreateStoryResponse,
  UpdateStoryRequest,
  UpdateStoryResponse,
} from "../types/storyType";

export const getSelectStory=async()=>{
  const res=await axios.get(`${API}/story/select`)
  return res.data
}

export const getStorySlug = async (
  slug: string,
): Promise<GetStoryBySlugResponse> => {
  try {
    const res = await axios.get<GetStoryBySlugResponse>(`${API}/story/${slug}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message;
    }
    throw new Error("Unknown error");
  }
};
export const updateStoryApi = async (
  id: string,
  data: UpdateStoryRequest,
): Promise<UpdateStoryResponse> => {
  const formData = new FormData();

  if (data.name) formData.append("name", data.name);

  if (data.alternateName) {
    data.alternateName.forEach(n =>
      formData.append("alternateName", n),
    );
  }

  if (data.author) formData.append("author", data.author);
  if (data.status) formData.append("status", data.status);
  if (data.country) formData.append("country", data.country);
  if (data.description) formData.append("description", data.description);

  if (data.totalChapters !== undefined) {
    formData.append("totalChapters", String(data.totalChapters)); // ✅
  }

  if (data.categoryId) {
    data.categoryId.forEach(id =>
      formData.append("categoryId", id),
    );
  }

  if (data.thumbnail instanceof File) {
    formData.append("thumbnail", data.thumbnail);
  }

  const res = await axiosAdmin.put(`/story/update/${id}`, formData);
  return res.data;
};


export const softDeleteStoryApi = async (id: string) => {
  const res = await axiosAdmin.patch(`/story/soft/${id}`);
  return res.data;
};

export const restoreStoryApi = async (id: string) => {
  const res = await axiosAdmin.patch(`/story/restore/${id}`);
  return res.data;
};

export const createStoryApi = async (
  data: CreateStoryRequest,
): Promise<CreateStoryResponse> => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("thumbnail", data.thumbnail);

  if (data.alternateName?.length) {
    data.alternateName.forEach(n =>
      formData.append("alternateName", n),
    );
  }

  if (data.author) formData.append("author", data.author);
  if (data.status) formData.append("status", data.status);
  if (data.country) formData.append("country", data.country);
  if (data.description) formData.append("description", data.description);

  if (data.totalChapters !== undefined) {
    formData.append("totalChapters", String(data.totalChapters)); 
  }

  if (data.categoryId?.length) {
    data.categoryId.forEach(id =>
      formData.append("categoryId", id),
    );
  }

  const res = await axiosAdmin.post("/story/create", formData);
  return res.data;
};


export const getAllStoryAdmin = async (
  params: GetStoryParams,
): Promise<GetAllStoryResponse> => {
  const res = await axios.get<GetAllStoryResponse>(`${API}/story/all-admin`, {
    params,
  });
  return res.data;
};
