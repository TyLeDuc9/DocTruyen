import React from "react";
import { useCategorySlugStory } from "../../hooks/useCategorySlugStory";
import { ItemStory } from "../ItemStory/ItemStory";

interface CategoryStoryProps {
  slug: string;
}

export const CategoryStory: React.FC<CategoryStoryProps> = ({ slug }) => {
  const { stories, loading, error } = useCategorySlugStory({
    slug,
    params: { page: 1, limit: 12, sort: "newest" },
  });

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi tải thể loại</div>;

  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-10">
      {stories.map((item) => (
        <ItemStory key={item._id} itemStory={item} />
      ))}
    </div>
  );
};
