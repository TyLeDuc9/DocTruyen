import { ItemStory } from "../../components/ItemStory/ItemStory";
import { PaginationStory } from "../../components/PaginationStory/PaginationStory";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { FaTrophy } from "react-icons/fa";
import { useGetTopDay } from "../../hooks/useGetTopDay";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
export const TopDay = () => {
  const { storyDay, loading, error, totalStories, updateFilter, filters } =
    useGetTopDay();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageUrl = Number(searchParams.get("page")) || 1;
  useEffect(() => {
    updateFilter({ page: pageUrl });
  }, [pageUrl]);
  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="container">
      <section className=" flex text-red-400 font-medium uppercase items-center my-4 text-xl">
        <FaTrophy className="mr-2 my-4" />
        <h1>Top truyện của ngày</h1>
      </section>
      <div className="grid grid-cols-6 gap-x-6 gap-y-10">
        {storyDay.map((item) => (
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
