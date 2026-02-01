import { useState } from "react";
import { restoreCategoryApi } from "../services/categoryApi";

export const useRestoreCategory = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const restoreCategory = async (id: string) => {
    try {
      setLoading(true);
      const res = await restoreCategoryApi(id);
      onSuccess?.(); 
      return res;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    restoreCategory,
    loading,
    error,
  };
};
