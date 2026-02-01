export interface BaseFilterParams {
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest" | "old";
}