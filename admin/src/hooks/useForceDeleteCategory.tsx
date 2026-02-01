import { useState } from "react";
import { forceDeleteCategoryApi } from "../services/categoryApi";

export const useForceDeleteCategory = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forceDeleteCategory = async (id: string) => {
    try {
      setLoading(true)
      await forceDeleteCategoryApi(id);
      onSuccess?.(); 
    }catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    forceDeleteCategory,
    loading,
    error,
  };
};
