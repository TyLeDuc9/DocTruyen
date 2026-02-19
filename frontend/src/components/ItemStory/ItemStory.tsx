import type { Story } from "../../types/storyType";
import { Link } from "react-router-dom";
import { FollowButton } from "../Button/FollowButton";
import { useSavedHistoryStory } from "../../hooks/useSavedHistoryStory";
import { ToastContainer } from "react-toastify";
interface ItemStoryProps {
  itemStory: Story;
}

export const ItemStory: React.FC<ItemStoryProps> = ({ itemStory }) => {
  const { handleSavedHistoryStory } = useSavedHistoryStory();
  return (
    <div className="lg:w-44 w-36 relative">
      <FollowButton storyId={itemStory._id} />
      <Link
        to={`/manga/${itemStory.slug}`}
        onClick={() => handleSavedHistoryStory(itemStory._id)}
      >
        <img
          src={itemStory.thumbnail}
          alt={itemStory.name}
          className="w-full h-auto rounded overflow-hidden"
        />

        <h3 className="mt-2 lg:text-base text-xs hover:text-[#236288] font-semibold text-center line-clamp-1 cursor-pointer">
          {itemStory.name}
        </h3>
      </Link>

      <span className="block text-center text-[10px] lg:text-[13px] font-medium hover:text-[#236288]">
        Chương {itemStory.totalChapters}
      </span>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastStyle={{
          fontSize: window.innerWidth < 768 ? "12px" : "16px",
          minWidth: window.innerWidth < 768 ? "10px" : "50px",
        }}
      />
    </div>
  );
};
