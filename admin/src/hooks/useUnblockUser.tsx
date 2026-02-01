import { useState } from "react";
import { unblokedUserApi } from "../services/userApi";

export const useUnblockUser = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const UnblockUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await unblokedUserApi(id);
      onSuccess?.();
      return res.user;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    UnblockUser,
    loading,
    error,
  };
};
