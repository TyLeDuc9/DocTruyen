import { useState } from "react";
import { createChapterReport } from "../services/chapterReport";
import type { CreateChapterReport } from "../types/chapterReportType";

export const useCreateChapterReport = (chapterId: string) => {
  const [showForm, setShowForm] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const closeForm = () => {
    setShowForm(false);
    setReason("");
    setError(null);
  };

  const submitReport = async () => {
    if (!reason.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const payload: CreateChapterReport = {
        chapterId,
        reason,
      };
      await createChapterReport(payload);
      closeForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    showForm,
    reason,
    loading,
    error,
    toggleForm,
    closeForm,
    setReason,
    submitReport,
  };
};