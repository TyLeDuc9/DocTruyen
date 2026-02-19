import {
  FaTachometerAlt,
  FaUserCog,
  FaUsers,
  FaListAlt,
  FaBookOpen,
  FaLayerGroup,
  FaHeart,
  FaComment,
  FaUserPlus,
  FaBug,
} from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
export const menuAdmin = [
  { name: "Dashboard", path: "/admin", icon: FaTachometerAlt },
  { name: "Notify", path: "/admin/notify", icon: IoNotifications },
  { name: "Profile", path: "/admin/profile", icon: FaUserCog },
  { name: "User", path: "/admin/user", icon: FaUsers },
  { name: "Category", path: "/admin/category", icon: FaListAlt },
  { name: "Story", path: "/admin/story", icon: FaBookOpen },
  { name: "Chapter", path: "/admin/chapter", icon: FaLayerGroup },
  { name: "Favorite", path: "/admin/favorite", icon: FaHeart },
  { name: "Comment", path: "/admin/comment", icon: FaComment },
  { name: "Follow", path: "/admin/follow", icon: FaUserPlus },
  { name: "Report", path: "/admin/chapter-report", icon: FaBug },
];
