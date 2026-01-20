import { useGetTopWeek } from "../../hooks/useGetTopWeek";
import { ItemStory } from "../../components/ItemStory/ItemStory";
import { PaginationStory } from "../../components/PaginationStory/PaginationStory";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { FaTrophy } from "react-icons/fa";
export const TopWeek = () => {
  const { storyWeek, loading, error, totalStories, updateFilter, filters } =
    useGetTopWeek();
  const [searchParms, setSearchParams] = useSearchParams();
  const pageUrl = Number(searchParms.get("page") || 1);

  useEffect(() => {
    updateFilter({ page: pageUrl });
  }, [pageUrl]);

  if (loading) return <p>Đang tải danh sách...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container">
      <section className=" flex text-red-400 font-medium uppercase items-center my-4 text-xl">
        <FaTrophy className="mr-2 my-4"/>
        <h1>
          Top truyện của tuần
        </h1>
      </section>

      <div className="grid grid-cols-6 gap-x-6 gap-y-10">
        {storyWeek.map((item) => (
          <ItemStory key={item._id} itemStory={item} />
        ))}
      </div>
      <PaginationStory
        currentPage={filters.page || 1}
        pageSize={filters.limit || 36}
        total={totalStories}
        onChange={(page) => {
          setSearchParams({ page: String(page) });
          updateFilter({ page });
        }}
      />
    </div>
  );
};
