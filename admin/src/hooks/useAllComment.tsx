import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllCommentApi } from "../services/commentApi";
import type { Comment, GetCommentsParams } from "../types/commentType";

export const useAllComment = () => {
  const [allComment, setAllComment] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalComment, settotalComment] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<GetCommentsParams>({
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 20,
    sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
    
  });
  useEffect(() => {
    setFilters({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 20,
      sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
    });
  }, [searchParams]);

  const updateURL = (newFilters: GetCommentsParams) => {
    const params: Record<string, string> = {};
    if (newFilters.page) params.page = String(newFilters.page);
    if (newFilters.limit) params.limit = String(newFilters.limit);
    if (newFilters.sort) params.sort = newFilters.sort;

    setSearchParams(params);
  };

  const updateFilter = (data: Partial<GetCommentsParams>) => {
    const newFilters = { ...filters, ...data };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleReset = () => {
    updateFilter({
      page: 1,
      limit: 20,
      sort: undefined,
    });
  };

  useEffect(() => {
    const fetchAllComment = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllCommentApi(filters);
        setAllComment(data.data);
        settotalComment(data.totalComments);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchAllComment();
  }, [filters]);
  return {
    allComment,
    loading,
    error,
    totalComment,
    filters,
    updateFilter,
    handleReset,
  };
};
