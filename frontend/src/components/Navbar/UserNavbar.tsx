import { userNavbar } from "../../config/userNavbar";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
export const UserNavbar = () => {
  const navigate = useNavigate();
  const { loading, handleLogout } = useLogout();

  const menuItems = userNavbar(handleLogout).filter((item) =>
    ["Theo dõi", "Tài khoản", "Lịch Sử Xem", "Chap Đã Lưu", "Đăng xuất"].includes(
      item.name
    )
  );

  if (loading) return <div className="text-white p-3">Đang tải...</div>;

  return (
    <div className="absolute right-0 w-48 bg-main shadow-xl rounded-lg z-50 ring-1 ring-black/20 overflow-hidden">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              if (item.to) navigate(item.to);
              if (item.action) item.action();
            }}
            className="flex items-center gap-2 px-4 py-2 text-white text-sm hover:bg-main/80 hover:text-yellow-300 cursor-pointer transition"
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};