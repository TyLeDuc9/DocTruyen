import type { Story } from "../../types/storyType";
interface ItemStoryProps {
  itemStory: Story;
}

export const ItemStory: React.FC<ItemStoryProps> = ({ itemStory }) => {

  return (
    <div className="w-44 relative">
      <>
        <img
          src={itemStory.thumbnail}
          alt={itemStory.name}
          className="w-full h-auto rounded overflow-hidden"
        />

        <h3 className="mt-2 text-base hover:text-[#236288] font-semibold text-center line-clamp-1 cursor-pointer">
          {itemStory.name}
        </h3>
      </>

      <span className="block text-center text-[13px] font-medium hover:text-[#236288]">
        Chương {itemStory.totalChapters}
      </span>
    </div>
  );
};
