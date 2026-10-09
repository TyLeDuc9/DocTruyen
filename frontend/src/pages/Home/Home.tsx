import { FaFutbol } from "react-icons/fa";
import {FaUserSecret } from "react-icons/fa";
import { LatestStory } from "../../components/TopStory/LatestStory";
import { TopStory } from "../../components/TopStory/TopStory";
import { CategoryStory } from "../../components/TopStory/CategoryStory";
import { useLoadingEffect } from "../../hooks/useLoadingEffect";
export const Home = () => {
  useLoadingEffect(500);
  return (
    <div className="lg:w-[80%] w-[95%] mx-auto lg:my-8">
      <section className="flex text-red-400 font-medium uppercase items-center my-4 text-xl">
      
        <h2 className="text-base lg:text-lg">Truyện mới cập nhật</h2>
      </section>
      <LatestStory />
      <section className="flex text-yellow-400 font-medium uppercase items-center my-4 text-xl">
        <h2 className="text-base lg:text-lg">Truyện hay</h2>
      </section>
      <TopStory />
      <section className="flex text-orange-400 font-medium uppercase items-center my-4 mb-4 text-xl">
        <FaUserSecret />
        <h2 className="text-base lg:text-lg">Trinh thám</h2>
      </section>
      <CategoryStory slug="trinh-tham" />
      <section className="flex text-blue-400 font-medium uppercase items-center my-4 mb-4 text-xl">
        <FaFutbol />
        <h2 className="text-base lg:text-lg">Thể thao</h2>
      </section>
      <CategoryStory slug="the-thao" />
    </div>
  );
};
