// SliderArrows.tsx
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    onClick={onClick}
    className="absolute right-1 top-1/2 -translate-y-1/2 z-10 cursor-pointer
               bg-gray-100/70 p-2 hover:opacity-75 rounded-sm"
  >
    <MdArrowForwardIos className="text-gray-400 lg:text-xl text-sm" />
  </div>
);

export const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    onClick={onClick}
    className="absolute left-1 top-1/2 -translate-y-1/2 z-10 cursor-pointer
               bg-gray-100/70 p-2 hover:opacity-75 rounded-sm"
  >
    <MdArrowBackIos className="text-gray-400 lg:text-xl text-sm" />
  </div>
);