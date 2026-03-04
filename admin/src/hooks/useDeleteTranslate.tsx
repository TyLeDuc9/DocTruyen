import  { useState } from "react";
import { deleteTranslateApi } from "../services/translateApi";
export const useDeleteTranslate = () => {
  const [error, setError] = useState<string | null>(null);

  const deleteTranslate = async (id: string) => {
    try {
      await deleteTranslateApi(id);
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } 
  };
  return { error, deleteTranslate };
};
