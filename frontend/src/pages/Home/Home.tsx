import { HiSparkles } from "react-icons/hi";
import { FaFutbol } from "react-icons/fa";
import { FaFire, FaTheaterMasks, FaUserSecret } from "react-icons/fa";
import { LatestStory } from "../../components/TopStory/LatestStory";
import { TopStory } from "../../components/TopStory/TopStory";
import { CategoryStory } from "../../components/TopStory/CategoryStory";
export const Home = () => {
  return (
    <div className="container my-8">
      <section className="flex text-red-400 font-medium uppercase items-center my-4 text-xl">
        <HiSparkles className="" />
        <h2>Truyện mới cập nhật</h2>
      </section>   
      <LatestStory />
      <section className="flex text-yellow-400 font-medium uppercase items-center my-4 text-xl">
        <FaFire />
        <h2>Truyện hay</h2>
      </section>
      <TopStory />
      <section className="flex text-green-400 font-medium uppercase items-center my-4 text-xl">
        <FaTheaterMasks className="mr-2" />
        <h2>Comic</h2>
      </section>
      <CategoryStory slug="comic" />
      <section className="flex text-orange-400 font-medium uppercase items-center my-4 mb-4 text-xl">
        <FaUserSecret />
        <h2>Detective</h2>
      </section>
      <section className="flex text-blue-400 font-medium uppercase items-center my-4 mb-4 text-xl">
        <FaFutbol />
        <h2>Thể thao</h2>
      </section>
      <CategoryStory slug="sports" />
    </div>
  );
};
