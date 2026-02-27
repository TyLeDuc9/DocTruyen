
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

import { ItemStory } from "../../components/ItemStory/ItemStory";
import { PaginationStory } from "../../components/PaginationStory/PaginationStory";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";

import { useAllStory } from "../../hooks/useAllStory";
import { useStoryFilters } from "../../hooks/useStoryFilters";
import { useLoading } from "../../context/LoadingContext";

export const SearchList = () => {
  const { setComponentsLoading } = useLoading();

  const { filters, updateFilter } = useStoryFilters();

  
  const { allStory, totalStories, loading, error } = useAllStory(filters);

  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading, setComponentsLoading]);

  if (loading) return <ComponentLoading />;
  if (error) return <div>Lỗi tải kết quả tìm kiếm</div>;

  return (
    <div className="lg:w-[80%] w-[90%] mx-auto">
      <section className="flex text-black font-medium uppercase items-center my-4 lg:text-xl text-lg">
        <FaSearch className="mr-2 text-main" />
        <h1 className="text-main">
          Kết quả tìm kiếm cho:{" "}
          <span className="text-red-500">
            {filters.keyword || "Tất cả"}
          </span>
        </h1>
      </section>

      <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 ml-2 gap-x-6 gap-y-6 lg:gap-y-10">
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