import { useLatestStory } from "../../hooks/useLatestStory";
import { ItemStory } from "../ItemStory/ItemStory";
import { useEffect } from "react";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
import { StorySlider } from "../Slider/StorySlider";

export const LatestStory = () => {
  const { latestStory, loading, error } = useLatestStory();
  const { setComponentsLoading } = useLoading();

  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading, setComponentsLoading]);

  if (loading) return <ComponentLoading />;
  if (error) return <div>Lỗi tải thể loại</div>;

  return (
    <div className="pl-5">
      <StorySlider
        data={latestStory}
        getKey={(item) => item._id}
        renderItem={(item) => <ItemStory itemStory={item} />}
      />
    </div>
  );
};