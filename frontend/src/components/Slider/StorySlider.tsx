import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import "swiper/css";
import "swiper/css/navigation";

type StorySliderProps<T> = {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
};

export const StorySlider = <T,>({
  data,
  renderItem,
  getKey,
}: StorySliderProps<T>) => {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative group">
      {/* Arrow trái */}
      <div
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer
        bg-gray-100/70 p-2 rounded-sm hover:bg-gray-200 transition
        opacity-0 group-hover:opacity-100"
      >
        <MdArrowBackIos className="text-gray-700 lg:text-xl text-sm" />
      </div>

      {/* Arrow phải */}
      <div
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer
        bg-gray-100/70 p-2 rounded-sm hover:bg-gray-200 transition
        opacity-0 group-hover:opacity-100"
      >
        <MdArrowForwardIos className="text-gray-700 lg:text-xl text-sm" />
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={6}
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;

          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1280: { slidesPerView: 6 },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={getKey(item)}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};