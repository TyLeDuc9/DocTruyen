import { useState } from "react";
import { softDeleteCateoryApi } from "../services/categoryApi";
export const useSoftDeleteCategory = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const softDeleteCategory = async (id: string) => {
    try {
      setLoading(true);
      await softDeleteCateoryApi(id);
      onSuccess?.(); 
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    softDeleteCategory,
    loading,
    error,
  };
};
