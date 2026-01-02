import { useState, useEffect } from "react";
import { getCategorySlug } from "../services/categoryApi";
import type { Category } from "../types/categoryType";

export const useCategorySlug = (slug: string) => {
  const [categorySlug, setCategorySlug] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCategorySlug(slug);
        setCategorySlug(data.category);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  return { categorySlug, loading, error };
};
