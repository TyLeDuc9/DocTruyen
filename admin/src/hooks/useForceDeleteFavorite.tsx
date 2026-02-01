import { useState } from "react";
import { forceDeleteFavoriteApi } from "../services/favoriteApi";
export const useForceDeleteFavorite = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forceDeleteFavorite = async (id: string) => {
      try {
        setLoading(true)
        await forceDeleteFavoriteApi(id);
        onSuccess?.(); 
      }catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
  
    return {
      forceDeleteFavorite,
      loading,
      error,
    };
};
