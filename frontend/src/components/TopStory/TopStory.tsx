
import { useRandomStory } from "../../hooks/useRandomStory";
import { ItemStory } from "../ItemStory/ItemStory";
import Slider from "react-slick";
import { sliderSettings } from "../../utils/sliderSettings";
export const TopStory = () => {
  const { randomStory, loading, error } = useRandomStory();

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi tải thể loại</div>;
  return (
    <div className="">
      <Slider {...sliderSettings}>
        {randomStory.map((item) => (
          <div key={item._id} className="mx-4">
            <ItemStory itemStory={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
