import { useEffect, useState } from "react";
import { getAllCategory } from "../services/categoryApi";
import type { Category } from "../types/categoryType";

export const useAllCategory = (page: number = 1, limit: number = 60) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getAllCategory(page, limit);
        setCategories(res.category);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [page, limit]);

  return {
    categories,
    loading,
    error,
  };
};
