import { HiSparkles } from "react-icons/hi";
import { FaFutbol } from "react-icons/fa";
import { FaFire, FaTheaterMasks, FaUserSecret } from "react-icons/fa";
import { LatestStory } from "../../components/TopStory/LatestStory";
import { TopStory } from "../../components/TopStory/TopStory";
import { CategoryStory } from "../../components/TopStory/CategoryStory";
import { useLoadingEffect } from "../../hooks/useLoadingEffect";
export const Home = () => {
  useLoadingEffect(500);
  return (
    <div className="lg:w-[80%] w-[95%] mx-auto lg:my-8">
      <section className="flex text-red-400 font-medium uppercase items-center my-4 text-xl">
        <HiSparkles className="" />
        <h2 className="text-base lg:text-lg">Truyện mới cập nhật</h2>
      </section>
      <LatestStory />
      <section className="flex text-yellow-400 font-medium uppercase items-center my-4 text-xl">
        <FaFire />
        <h2 className="text-base lg:text-lg">Truyện hay</h2>
      </section>
      <TopStory />
      <section className="flex text-green-400 font-medium uppercase items-center my-4 text-xl">
        <FaTheaterMasks className="mr-2" />
        <h2 className="text-base lg:text-lg">Comic</h2>
      </section>
      <CategoryStory slug="comic" />
      <section className="flex text-orange-400 font-medium uppercase items-center my-4 mb-4 text-xl">
        <FaUserSecret />
        <h2 className="text-base lg:text-lg">Detective</h2>
      </section>
      <CategoryStory slug="detective" />
      <section className="flex text-blue-400 font-medium uppercase items-center my-4 mb-4 text-xl">
        <FaFutbol />
        <h2 className="text-base lg:text-lg">Thể thao</h2>
      </section>
      <CategoryStory slug="sports" />
    </div>
  );
};
