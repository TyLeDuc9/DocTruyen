import { useEffect } from "react";
import { ComponentLoading } from "../../components/Loading/ComponentLoading";
import { useLoading } from "../../context/LoadingContext";
import { useRandomStory } from "../../hooks/useRandomStory";
import { ItemStory } from "../ItemStory/ItemStory";
import Slider from "react-slick";
import { sliderSettings } from "../../utils/sliderSettings";
export const TopStory = () => {
  const { randomStory, loading, error } = useRandomStory();

  const { setComponentsLoading } = useLoading();
  useEffect(() => {
    setComponentsLoading(loading);
  }, [loading]);
  if (loading) return <ComponentLoading />;
  if (error) return <div>{error}</div>;
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
