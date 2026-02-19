import { useState } from "react";
import { deleteChapterReportApi } from "../services/chapterReport";
export const useDeleteChapterReport = (onSuccess?: () => void) => {
  const [error, setError] = useState<string | null>(null);
  const deleteChapterReport = async (id: string) => {
    try {
      await deleteChapterReportApi(id);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    }
  };
  return {
    deleteChapterReport,
    error,
  };
};
