import { FiChevronDown, FiMenu, FiX, FiHome } from "react-icons/fi";
import { useState } from "react";
import { Genre } from "../Genre/Genre";
import TopGenre from "../Genre/TopGenre";
import { headerNavbar } from "../../config/headerNavbar";
import { Link } from "react-router-dom";
export const NavHeader = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-main relative">
      <div className="lg:w-[80%] w-[90%] mx-auto">
        {/* MOBILE HEADER */}
        <div className="lg:hidden flex justify-between items-center h-12 text-white">
          <Link to="/" className="flex items-center gap-2">
            <FiHome size={22} />
          </Link>
          <button onClick={() => setOpenMobile(!openMobile)}>
            {openMobile ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* DESKTOP NAV */}
        <ul className="hidden lg:flex items-center text-white text-sm font-medium h-14">
          {headerNavbar.map((item, index) => (
            <li key={index} className="group h-full relative">
              {item.link ? (
                <Link
                  to={item.link}
                  className="flex items-center gap-1 h-full px-4 hover:bg-blue-200/30 transition"
                >
                  {item.name}
                </Link>
              ) : (
                <div className="flex items-center gap-1 h-full px-4 cursor-pointer hover:bg-blue-200/30 transition">
                  {item.name}
                  {item.dropdown && (
                    <FiChevronDown size={14} className="mt-1" />
                  )}
                </div>
              )}

              {/* Dropdown Desktop */}
              {item.dropdown && item.name === "Thể Loại" && (
                <div
                  className="absolute -left-60 top-full hidden group-hover:block w-screen
                 bg-white text-gray-600 shadow-lg border-t z-50"
                >
                  <div className="max-w-7xl mx-auto px-6 py-6">
                    <Genre />
                  </div>
                </div>
              )}

              {item.dropdown && item.name === "Xếp Hạng" && (
                <div
                  className="absolute -left-90 top-full hidden group-hover:block w-screen
                 bg-white text-gray-600 shadow-lg border-t z-50"
                >
                  <div className="max-w-7xl mx-auto px-6 py-6">
                    <TopGenre />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* MOBILE DROPDOWN MENU */}
        {openMobile && (
          <div className="lg:hidden text-white text-sm py-1 space-y-2">
            {headerNavbar.map((item, index) => (
              <div key={index} className="border-b last:border-none">
                {item.link ? (
                  <a
                    href={item.link}
                    className="block py-1 font-medium"
                    onClick={() => setOpenMobile(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name,
                        )
                      }
                      className="flex justify-between items-center w-full py-1 font-medium"
                    >
                      {item.name}
                      <FiChevronDown
                        size={16}
                        className={`transition ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div className="">
                        {item.name === "Thể Loại" && <Genre />}
                        {item.name === "Xếp Hạng" && <TopGenre />}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
