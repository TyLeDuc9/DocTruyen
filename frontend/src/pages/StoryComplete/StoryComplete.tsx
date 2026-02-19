import { useStoryComplete } from "../../hooks/useStoryComplete";
import { ItemStory } from "../../components/ItemStory/ItemStory";
import { PaginationStory } from "../../components/PaginationStory/PaginationStory";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
export const StoryComplete = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const { storyComplete, loading, error, filters, totalStories, updateFilter } =
    useStoryComplete();
  useEffect(() => {
    updateFilter({ page: pageFromUrl });
  }, [pageFromUrl]);
  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="lg:w-[80%] w-[90%] mx-auto">
      <section className=" flex text-main font-medium uppercase items-center my-4 lg:text-xl text-lg">
        <FaCheckCircle className="mr-2 my-4" />
        <h1>Truyện đã hoàn thành</h1>
      </section>
      <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 ml-2  gap-x-6  gap-y-6 lg:gap-y-10">
        {storyComplete.map((item) => (
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
