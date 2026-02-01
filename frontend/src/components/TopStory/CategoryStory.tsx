import React, { useEffect } from "react";
import { useCategorySlugStory } from "../../hooks/useCategorySlugStory";
import { ItemStory } from "../ItemStory/ItemStory";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
interface CategoryStoryProps {
  slug: string;
}

export const CategoryStory: React.FC<CategoryStoryProps> = ({ slug }) => {
  const { stories, loading, error } = useCategorySlugStory({
    slug,
    params: { page: 1, limit: 12, sort: "newest" },
  });

  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error) return <div>Lỗi tải thể loại</div>;

  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-10">
      {stories.map((item) => (
        <ItemStory key={item._id} itemStory={item} />
      ))}
    </div>
  );
};
