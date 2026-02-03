import { useState } from "react";
import { deleteNotifyApi } from "../services/notifyApi";
export const useDeleteNotify = (onSuccess?: () => void) => {
  const [error, setError] = useState<string | null>(null);

  const deleteNotify = async (id: string) => {
    try {
    
      await deleteNotifyApi(id);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } 
  };
  return {
    deleteNotify,
    error,
  };
};
