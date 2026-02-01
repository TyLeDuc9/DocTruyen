import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllUsersApi } from "../services/userApi";
import type { User, GetUserParams } from "../types/userType";

export const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<GetUserParams>({
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 20,
    sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
    search: searchParams.get("search") || undefined,
    role:
      (searchParams.get("role") as "user" | "admin" | "author") || undefined,
  });
  const [searchText, setSearchText] = useState(filters.search || "");

  useEffect(() => {
    setFilters({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 20,
      sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
      search: searchParams.get("search") || undefined,
      role:
        (searchParams.get("role") as "user" | "admin" | "author") || undefined,
    });
  }, [searchParams]);

  const updateURL = (newFilters: GetUserParams) => {
    const params: Record<string, string> = {};
    if (newFilters.page) params.page = String(newFilters.page);
    if (newFilters.limit) params.limit = String(newFilters.limit);
    if (newFilters.sort) params.sort = newFilters.sort;
    if (newFilters.search) params.search = newFilters.search;
    if (newFilters.role) params.role = newFilters.role;

    setSearchParams(params);
  };

  const updateFilter = (data: Partial<GetUserParams>) => {
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
      role: undefined,
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
        const data = await getAllUsersApi(filters);
        setAllUsers(data.data);
        setTotalUsers(data.totalUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [filters]);

  return {
    allUsers,
    loading,
    error,
    totalUsers,
    filters,
    updateFilter,
    handleReset,
    handleSearch,
    setSearchText,
    searchText,
  };
};
