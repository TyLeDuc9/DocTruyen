import {
  FiShoppingCart,
  FiBookmark,
  FiUser,
  FiLogOut,
  FiLock,
  FiBell,
} from "react-icons/fi";
import type { MenuItem } from "../types/userType";
export const userNavbar = (handleLogout: () => void): MenuItem[]  => [
  {
    id: 6,
    name: "Thông báo",
    icon: <FiBell size={18} />,
    to: "/user/notify",
  },
  {
    id: 5,
    name: "Theo dõi",
    icon: <FiBookmark size={18} />,
    to: "/user/follow",
  },
  {
    id: 2,
    name: "Tài khoản",
    icon: <FiUser size={18} />,
    to: "/user/profile",
  },
  {
    id: 3,
    name: "Đổi mật khẩu",
    icon: <FiLock size={18} />,
    to: "/user/change-password",
  },
  {
    id: 1,
    name: "Mua truyện",
    icon: <FiShoppingCart size={18} />,
    external: true,
    url: "https://bookstore-1-3bb1.onrender.com/",
  },
  {
    id: 4,
    name: "Đăng xuất",
    icon: <FiLogOut size={18} />,
    action: handleLogout,
  },
];
