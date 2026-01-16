import { FiChevronDown } from "react-icons/fi";
import { Genre } from "../Genre/Genre";

export const NavHeader = () => {
  const menu = [
    { name: "Trang Chủ", link: "/" },
    { name: "Thể Loại", dropdown: true },
    { name: "Xếp Hạng", dropdown: true },
    { name: "Xem Tất Cả", link: "/all" },
    { name: "Discord", link: "https://discord.com" },
    { name: "Fanpage", link: "https://facebook.com" },
    { name: "Yêu Cầu Dịch Truyện", link: "/yeu-cau-dich" },
  ];

  return (
    <nav className="bg-main">
      <div className="container">
        <ul className="flex items-center text-white text-sm font-medium h-14">
          {menu.map((item, index) => (
            <li key={index} className="group h-full">
              {item.link ? (
                <a
                  href={item.link}
                  className="flex items-center gap-1 h-full px-4 hover:bg-blue-200/30 transition"
                >
                  {item.name}
                </a>
              ) : (
                <div className="flex items-center gap-1 h-full px-4 cursor-pointer hover:bg-blue-200/30 transition">
                  {item.name}
                  {item.dropdown && <FiChevronDown size={14} className="mt-1" />}
                </div>
              )}

              {item.dropdown && item.name === "Thể Loại" && (
                <div
                  className="
                    absolute left-0 top-[152px]
                    hidden group-hover:block
                    w-screen
                    bg-white text-gray-600
                    shadow-lg border-t z-50
                  "
                >
                  <div className="max-w-7xl mx-auto px-6 py-6">
                    <Genre/>
        
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
