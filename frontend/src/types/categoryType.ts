export interface Category {
  _id: string;
  name: string;
  content: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface GetCategoryBySlugResponse {
  message: string;
  category: Category;
}
export interface GetAllCategoryResponse {
  total: number;
  page: number;
  totalPages: number;
  category: Category[];
}
export interface CategoryUpdate {
  name: string;
  content: string;
}