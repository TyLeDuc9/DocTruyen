import axiosAdmin from "../utils/axiosAdmin";
import axios from "axios";
import { API } from "../config/api";
import type {
  GetAllCategoryResponse,
  CategoryParams,
  Category,
  CategoryCreateRequest,
  CategoryUpdateRequest,
  GetCategorySelectResponse,
  GetCategoryBySlugResponse

} from "../types/categoryType";
export const getSelectCategory = async (
  page: number = 1,
  limit: number = 60
): Promise<GetCategorySelectResponse> => {
    const res = await axios.get<GetCategorySelectResponse>(`${API}/category/all`, {
      params: { page, limit },
    });
    return res.data;
};
export const getCategorySlug = async (
  slug: string,
): Promise<GetCategoryBySlugResponse> => {
  const res = await axiosAdmin.get<GetCategoryBySlugResponse>(
    `category/${slug}`,
  );
  return res.data;
};
export const updateCategoryApi = (id: string, data: CategoryUpdateRequest) => {
  return axiosAdmin.put(`/category/${id}`, data);
};
export const softDeleteCateoryApi = async (id: string) => {
  const res = await axiosAdmin.delete(`/category/soft/${id}`);
  return res.data;
};
export const restoreCategoryApi = async (id: string) => {
  const res = await axiosAdmin.patch(`/category/restore/${id}`);
  return res.data.category;
};
export const forceDeleteCategoryApi = async (id: string) => {
  const res = await axiosAdmin.delete(`/category/force/${id}`);
  return res.data;
};
export const createCateoryApi = async (
  data: CategoryCreateRequest,
): Promise<Category> => {
  const res = await axiosAdmin.post<Category>("/category/create", data);
  return res.data;
};

export const getAllCategoryApi = async (
  params: CategoryParams,
): Promise<GetAllCategoryResponse> => {
  const res = await axiosAdmin.get<GetAllCategoryResponse>(
    "/category/all-admin",
    { params },
  );
  return res.data;
};
