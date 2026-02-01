import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllChapter } from "../services/chapterApi";
import type { Chapter, ChapterParams } from "../types/chapterType";
export const useAllChapter = () => {
  const [allChapter, setAllChapter] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalChapter, setTotalChapter] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ChapterParams>({
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 20,
    sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
    search: searchParams.get("search") || undefined,
    type: searchParams.get("type") as "TEXT" | "IMAGE" | "MIXED",
  });
  const [searchText, setSearchText] = useState(filters.search || "");
  useEffect(() => {
    setFilters({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 20,
      sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
      search: searchParams.get("search") || undefined,
      type: searchParams.get("type") as "TEXT" | "IMAGE" | "MIXED",
    });
  }, [searchParams]);

  const updateURL = (newFilters: ChapterParams) => {
    const params: Record<string, string> = {};
    if (newFilters.page) params.page = String(newFilters.page);
    if (newFilters.limit) params.limit = String(newFilters.limit);
    if (newFilters.sort) params.sort = newFilters.sort;
    if (newFilters.search) params.search = newFilters.search;
    if (newFilters.type) params.type = newFilters.type;

    setSearchParams(params);
  };

  const updateFilter = (data: Partial<ChapterParams>) => {
    const newFilters = { ...filters, ...data };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleReset = () => {
    setSearchText("");
    updateFilter({
      page: 1,
      limit: 20,
      sort: undefined,
      search: undefined,
      type: undefined,
    });
  };

  const handleSearch = () => {
    updateFilter({ search: searchText.trim() || undefined });
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllChapter(filters);
        setAllChapter(data.data);
        setTotalChapter(data.totalChapters);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [filters]);
  return {
    allChapter,
    loading,
    error,
    totalChapter,
    filters,
    updateFilter,
    handleReset,
    handleSearch,
    setSearchText,
    searchText,
  };
};
