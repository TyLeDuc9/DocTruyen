import { useEffect } from "react";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
import { useRandomStory } from "../../hooks/useRandomStory";
import { ItemStory } from "../ItemStory/ItemStory";
import { StorySlider } from "../Slider/StorySlider";

export const TopStory = () => {
  const { randomStory, loading, error } = useRandomStory();
  const { setComponentsLoading } = useLoading();

  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading, setComponentsLoading]);

  if (loading) return <ComponentLoading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="pl-5">
      <StorySlider
        data={randomStory}
        getKey={(item) => item._id}
        renderItem={(item) => <ItemStory itemStory={item} />}
      />
    </div>
  );
};