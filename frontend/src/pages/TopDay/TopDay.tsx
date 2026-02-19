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
    <div className="lg:w-[80%] w-[90%] mx-auto">
      <section className=" flex text-red-400 font-medium uppercase items-center my-4 lg:text-xl text-lg">
        <FaTrophy className="mr-2 my-4" />
        <h1>Top truyện của ngày</h1>
      </section>
      <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 ml-2  gap-x-6  gap-y-6 lg:gap-y-10">
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
