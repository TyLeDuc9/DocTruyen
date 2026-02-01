import { useLatestStory } from "../../hooks/useLatestStory";
import { ItemStory } from "../ItemStory/ItemStory";
import { sliderSettings } from "../../utils/sliderSettings";
import Slider from "react-slick";
import { useEffect } from "react";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
export const LatestStory = () => {
  const { latestStory, loading, error } = useLatestStory();
  
  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
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
