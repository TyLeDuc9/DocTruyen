import { useState, useEffect } from "react";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCategorySlugStory } from "../../hooks/useCategorySlugStory";
import { useCategorySlug } from "../../hooks/useCategorySlug";
import { useAllCategory } from "../../hooks/useAllCategory";
import { ItemStory } from "../../components/ItemStory/ItemStory";
import { PaginationStory } from "../../components/PaginationStory/PaginationStory";
import { FilterStory } from "../../components/Filter/FilterStory";
import type { GetStoryParams, StoryStatus } from "../../types/storyType";

export const Category: React.FC = () => {
  const { setComponentsLoading } = useLoading();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { categories, loading } = useAllCategory();
  const { categorySlug } = useCategorySlug(slug || "");

  const [filters, setFilters] = useState<GetStoryParams>({
    page: Number(searchParams.get("page")) || 1,
    limit: 36,
    sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
    status: searchParams.get("status") as StoryStatus | undefined,
    country: searchParams.get("country") || undefined,
  });

  const updateURL = (newFilters: GetStoryParams) => {
    const params: Record<string, string> = {};

    if (newFilters.page) params.page = String(newFilters.page);
    if (newFilters.sort) params.sort = newFilters.sort;
    if (newFilters.status) params.status = newFilters.status;
    if (newFilters.country) params.country = newFilters.country;

    setSearchParams(params);
  };

  const updateFilter = (data: Partial<GetStoryParams>) => {
    const newFilters = { ...filters, ...data };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const { stories, totalStories } = useCategorySlugStory({
    slug: slug || "",
    params: filters,
  });
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  return (
    <div className="lg:w-[80%] w-[90%] mx-auto">
      <h1 className="text-main lg:mt-8 mt-4 lg:text-xl text-lg font-medium">
        {categorySlug?.name}
      </h1>

      <div className="bg-white text-sm p-8 shadow-lg my-4">
        <p>{categorySlug?.content}</p>
      </div>

      <FilterStory
        categories={categories}
        filters={filters}
        onCategoryChange={(slug) => navigate(`/the-loai/${slug}`)}
        onSortChange={(sort) => updateFilter({ sort, page: 1 })}
        onStatusChange={(status) => updateFilter({ status, page: 1 })}
        onCountryChange={(country) => updateFilter({ country, page: 1 })}
      />

      <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 ml-2  gap-x-6  gap-y-6 lg:gap-y-10">
        {stories.map((item) => (
          <ItemStory key={item._id} itemStory={item} />
        ))}
      </div>

      <PaginationStory
        currentPage={filters.page || 1}
        pageSize={filters.limit || 36}
        total={totalStories}
        onChange={(page) => updateFilter({ page })}
      />
    </div>
  );
};
