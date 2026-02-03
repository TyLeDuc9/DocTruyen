import {
  FiShoppingCart,
  FiBookmark,
  FiUser,
  FiLogOut,
  FiLock,
  FiBell,
  FiClock,
  FiBookOpen,
  
} from "react-icons/fi";
import type { MenuItem } from "../types/userType";
export const userNavbar = (handleLogout: () => void): MenuItem[] => [
  {
    id: 1,
    name: "Thông báo",
    icon: <FiBell size={18} />,
    to: "/user/notify",
  },
  {
    id: 2,
    name: "Theo dõi",
    icon: <FiBookmark size={18} />,
    to: "/user/follow",
  },
  {
    id: 3,
    name: "Lịch Sử Xem",
    icon: <FiClock size={18} />,
    to: "/user/history/story",
  },
   {
    id: 8,
    name: "Chap Đã Lưu",
    icon: <FiBookOpen  size={18} />,
    to: "/user/history/chapter",
  },
  {
    id: 4,
    name: "Tài khoản",
    icon: <FiUser size={18} />,
    to: "/user/profile",
  },
  {
    id: 5,
    name: "Đổi mật khẩu",
    icon: <FiLock size={18} />,
    to: "/user/change-password",
  },
  {
    id: 6,
    name: "Mua truyện",
    icon: <FiShoppingCart size={18} />,
    external: true,
    url: "https://bookstore-1-3bb1.onrender.com/",
  },
  {
    id: 7,
    name: "Đăng xuất",
    icon: <FiLogOut size={18} />,
    action: handleLogout,
  },
];
