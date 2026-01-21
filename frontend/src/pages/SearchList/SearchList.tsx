import { useAllStory } from "../../hooks/useAllStory";
import { ItemStory } from "../../components/ItemStory/ItemStory";
import { PaginationStory } from "../../components/PaginationStory/PaginationStory";
import { FaSearch } from "react-icons/fa";

export const SearchList = () => {
  const {
    allStory,
    totalStories,
    filters,
    updateFilter,
  } = useAllStory();

  return (
    <div className="container">
      <section className="flex text-black font-medium uppercase items-center my-4 text-xl">
        <FaSearch className="mr-2" />
        <h1>
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
