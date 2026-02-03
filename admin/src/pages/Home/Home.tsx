import { menuAdmin } from "../../config/menuAdmin";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IoMailUnread } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { useLogout } from "../../hooks/useLogout";
import avatarDefault from "../../assets/logo/avatar.jpg";
import { useEffect } from "react";
import { getMeUser } from "../../redux/User/userThunk";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
export const Home = () => {
  const { pathname } = useLocation();
  const { handleLogout, error } = useLogout();
  const { user } = useSelector((state: RootState) => state.auth);
  const { userProfile } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (user && !userProfile) {
      dispatch(getMeUser());
    }
  }, [user, userProfile, dispatch]);
  if (error) return <div>Lỗi tải</div>;

  return (
    <div className="flex h-screen w-full">
      <div className="w-[15%] bg-[#236288] text-white flex flex-col fixed h-full p-4 overflow-y-auto">
        <Link to="/">
          <h1 className="text-2xl font-semibold mb-6">DocTruyen</h1>
        </Link>

        <p className="text-lg font-semibold mb-4 pl-2 text-[#cfe6f3]">MENU</p>

        <div className="flex flex-col space-y-2">
          {menuAdmin.map((menu) => {
            const Icon = menu.icon;
            const isActive = pathname === menu.path;

            return (
              <Link
                to={menu.path}
                key={menu.path}
                className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#3e89b2] text-white shadow-md"
                      : "hover:bg-[#2f7396]"
                  }`}
              >
                <span className="text-xl">
                  <Icon />
                </span>
                <span className="font-medium">{menu.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="ml-[15%] w-[85%] bg-gray-100 min-h-screen overflow-y-auto">
        <div className="bg-white shadow-sm flex justify-between items-center py-4 px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 text-main">
            <IoMailUnread
              size={26}
              className="cursor-pointer hover:text-[#1b4f6c]"
            />
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 bg-main text-white p-2 rounded-md">
              <img
                src={userProfile?.avatarUrl || avatarDefault}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium">
                {user?.userName || "Hello"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center  cursor-pointer text-main hover:text-[#1b4f6c] transition font-medium"
            >
              <FaSignOutAlt />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
