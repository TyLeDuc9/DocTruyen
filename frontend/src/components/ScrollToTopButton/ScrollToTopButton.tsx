import { MdKeyboardArrowUp } from "react-icons/md";
import { useEffect, useState } from "react";
export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", check);
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    visible && (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="hidden lg:flex fixed bottom-6 right-6 w-8 h-8 cursor-pointer
                 bg-main text-white rounded-full
                 items-center justify-center shadow-lg z-50"
      >
        <MdKeyboardArrowUp className="text-lg" />
      </button>
    )
  );
};
