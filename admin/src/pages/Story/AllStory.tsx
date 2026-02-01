import { useAllStory } from "../../hooks/useAllStory";
import { useAllCategory } from "../../hooks/useAllCategory";
import { FilterStory } from "../../components/Filter/FilterStory";
import { ItemStory } from "../../components/ItemStory/ItemStory";
import { PaginationItem } from "../../components/PaginationItem/PaginationItem";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
export const AllStory = () => {
  const {
    allStory,
    loading,
    error,
    totalStory,
    filters,
    updateFilter,
    handleSearch,
    handleReset,
    searchText,
    setSearchText,
  } = useAllStory();

  const { allCategory } = useAllCategory();
  const navigate=useNavigate()
  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error) return <div>Lỗi tải thể loại</div>;
  return (
    <div className="space-y-4 p-4">
      <FilterStory
        filters={filters}
        updateFilter={updateFilter}
        handleReset={handleReset}
        handleSearch={handleSearch}
        searchText={searchText}
        setSearchText={setSearchText}
        categories={allCategory}
      />
      <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-row justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Story List
            </h3>
            <p className="text-sm text-gray-500">
              Total stories:
              <span className="font-semibold"> {totalStory}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Page {filters.page || 1}
            </span>
            <button onClick={()=>navigate('/admin/story-table')} className="bg-yellow-400 cursor-pointer hover:bg-yellow-300 py-2 px-3 rounded-sm text-white font-medium">
              Watch table
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-8 ml-6">
          {allStory.map((item) => (
            <ItemStory itemStory={item} />
          ))}
        </div>
        <div className="mt-4">
          <PaginationItem
            currentPage={filters.page || 1}
            pageSize={filters.limit || 20}
            total={totalStory}
            onChange={(page) => updateFilter({ page })}
          />
        </div>
      </div>
    </div>
  );
};
