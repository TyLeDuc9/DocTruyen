import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllChapterReport } from "../services/chapterReport";
import type {
  GetAllChapterReportParams,
  ChapterReportAdminItem,
  ChapterReportStatus,
} from "../types/chapterReportType";
export const useAllChapterReport = () => {
  const [allReport, setAllReport] = useState<ChapterReportAdminItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalReport, setTotalReport] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<GetAllChapterReportParams>({
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 20,
    sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
    search: searchParams.get("search") || undefined,
    status: searchParams.get("status") as ChapterReportStatus,
  });
  const [searchText, setSearchText] = useState(filters.search || "");

  useEffect(() => {
    setFilters({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 20,
      sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
      search: searchParams.get("search") || undefined,
      status: searchParams.get("type") as ChapterReportStatus,
    });
  }, [searchParams]);

  const updateURL = (newFilters: GetAllChapterReportParams) => {
    const params: Record<string, string> = {};
    if (newFilters.page) params.page = String(newFilters.page);
    if (newFilters.limit) params.limit = String(newFilters.limit);
    if (newFilters.sort) params.sort = newFilters.sort;
    if (newFilters.search) params.search = newFilters.search;
    if (newFilters.status) params.status = newFilters.status;

    setSearchParams(params);
  };

  const updateFilter = (data: Partial<GetAllChapterReportParams>) => {
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
    });
  };

  const handleSearch = () => {
    updateFilter({ search: searchText.trim() || undefined });
  };

  useEffect(() => {
    const fetchAllReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAllChapterReport(filters);
        setAllReport(res.data);
        setTotalReport(res.totalReports);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchAllReport();
  }, [filters]);
  return {
    allReport,
    loading,
    error,
    totalReport,
    filters,
    updateFilter,
    handleReset,
    handleSearch,
    setSearchText,
    searchText,
  };
};
