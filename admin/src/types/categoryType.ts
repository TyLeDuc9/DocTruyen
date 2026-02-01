export interface Category {
  _id: string;
  name: string;
  content: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted:boolean
}
export interface GetCategoryBySlugResponse {
  message: string;
  category: Category;
}
export interface CategoryUpdateRequest {
  name?: string;
  content?: string;
}
export interface CategoryCreateRequest{
  name:string,
  content:string
}
export interface GetCategorySelectResponse {
  total: number;
  page: number;
  totalPages: number;
  category: Category[];
}
export interface GetAllCategoryResponse {
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  totalCategories: number;
  data: Category[];
}
export interface CategoryParams {
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
  search?: string;
}
