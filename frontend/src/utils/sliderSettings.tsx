import React from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

interface ArrowProps {
  onClick?: () => void;
}

export const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute lg:-right-0.5 right-1 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 
               bg-gray-100/70 p-2 hover:opacity-75 rounded-sm"
    onClick={onClick}
  >
    <MdArrowForwardIos className="text-gray-400 lg:text-xl text-sm" />
  </div>
);

export const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute lg:left-0.5 -left-1 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 
               bg-gray-100/70 p-2 hover:opacity-75 rounded-sm"
    onClick={onClick}
  >
    <MdArrowBackIos className="text-gray-400 lg:text-xl text-sm" />
  </div>
);

export const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 1000,
  slidesToShow: 6,
  slidesToScroll: 5,
  autoplay: false,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,

  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
};
