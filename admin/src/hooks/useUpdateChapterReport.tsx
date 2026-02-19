import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateChapterReport } from "../services/chapterReport";
import type { ChapterReportStatus } from "../types/chapterReportType";

export const useUpdateChapterReport = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [status, setStatus] = useState<ChapterReportStatus>("PENDING");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setLoading(true);
      await updateChapterReport(id, { status });
      navigate("/admin/chapter-report");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return {
    status,
    setStatus,
    handleSubmit,
    loading,
    error,
  };
};