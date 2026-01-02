import { useLatestStory } from "../../hooks/useLatestStory";
import { ItemStory } from "../ItemStory/ItemStory";
import { sliderSettings } from "../../utils/sliderSettings";
import Slider from "react-slick";

export const LatestStory = () => {
  const { latestStory, loading, error } = useLatestStory();

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi tải thể loại</div>;

  return (
    <div className="">
      <Slider {...sliderSettings}>
        {latestStory.map((item) => (
          <div key={item._id} className="mx-4">
            <ItemStory itemStory={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
