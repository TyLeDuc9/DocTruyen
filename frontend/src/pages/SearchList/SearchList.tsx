import { useAllStory } from "../../hooks/useAllStory";
import { ItemStory } from "../../components/ItemStory/ItemStory";
import { PaginationStory } from "../../components/PaginationStory/PaginationStory";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
export const SearchList = () => {
  const { allStory, totalStories, filters, updateFilter, loading } =
    useAllStory();
  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  return (
    <div className="container">
      <section className="flex text-black font-medium uppercase items-center my-4 text-xl">
        <FaSearch className="mr-2 text-main" />
        <h1 className="text-main">
          Kết quả tìm kiếm cho:{" "}
          <span className="text-red-500">{filters.keyword}</span>
        </h1>
      </section>

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
