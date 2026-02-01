import { useState } from "react";
import { forceDeleteFollowApi } from "../services/followType";
export const useForceDeleteFollow = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forceDeleteCategory = async (id: string) => {
      try {
        setLoading(true)
        await forceDeleteFollowApi(id);
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
