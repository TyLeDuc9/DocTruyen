import { useState } from "react";
import { blockUserApi } from "../services/userApi";

export const useBlockUser = (onSuccess?:()=>void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const blockUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await blockUserApi(id);
      onSuccess?.()
      return res.user; 
    } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
  };

  return {
    blockUser,
    loading,
    error,
  };
};
