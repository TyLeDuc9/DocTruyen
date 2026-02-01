import { ItemStory } from "../../components/ItemStory/ItemStory";
import { PaginationStory } from "../../components/PaginationStory/PaginationStory";
import { FilterStory } from "../../components/Filter/FilterStory";
import { useAllStory } from "../../hooks/useAllStory";
import { useAllCategory } from "../../hooks/useAllCategory";
import { useLoading } from "../../context/LoadingContext";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useEffect } from "react";
export const AllStory = () => {
  const { setComponentsLoading } = useLoading();
  const { categories } = useAllCategory();
  const {
    allStory,
    totalStories,
    filters,
    updateFilter,
    navigate,
    loading,
    error,
  } = useAllStory();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error) return <div>Lỗi tải thể loại</div>;
  return (
    <div className="container">
      <h1 className="text-main mt-8 text-xl font-medium">Tất cả truyện</h1>

      <FilterStory
        categories={categories}
        filters={filters}
        onCategoryChange={(slug) => navigate(`/the-loai/${slug}`)}
        onSortChange={(sort) => updateFilter({ sort, page: 1 })}
        onStatusChange={(status) => updateFilter({ status, page: 1 })}
        onCountryChange={(country) => updateFilter({ country, page: 1 })}
      />

      <div className="grid grid-cols-6 gap-x-6 gap-y-10">
        {allStory.map((item) => (
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
