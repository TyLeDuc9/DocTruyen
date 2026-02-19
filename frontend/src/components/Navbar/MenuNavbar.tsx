import { userNavbar } from "../../config/userNavbar";
import { useLogout } from "../../hooks/useLogout";
import { useLocation, useNavigate } from "react-router-dom";
import { handleMenuClick } from "../../utils/menuNavigate";
// export const MenuNavbar = () => {
//   const { handleLogout } = useLogout();
//   const location = useLocation();
//   const menuItems = userNavbar(handleLogout);
//   const navigate = useNavigate();

//   return (
//     <div className="w-56 bg-main shadow-2xl rounded-xl h-72  overflow-hidden">
//       <ul>
//         {menuItems.map((item) => {
//           const isActive = item.to && location.pathname === item.to;

//           return (
//             <li
//               key={item.id}
//               onClick={() => handleMenuClick(item, navigate)}
//               className={`flex items-center gap-3 pl-8 py-3
//                 text-base cursor-pointer transition-all duration-200
//                 ${
//                   isActive
//                     ? "bg-yellow-400/90 text-white"
//                     : "text-white hover:text-yellow-400"
//                 }
                 
//               `}
//             >
//               <span className="text-lg">{item.icon}</span>
//               <span className="font-medium">{item.name}</span>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };
export const MenuNavbar = () => {
  const { handleLogout } = useLogout();
  const location = useLocation();
  const menuItems = userNavbar(handleLogout);
  const navigate = useNavigate();

  return (
    <div className="
      w-full 
      lg:w-56 
      bg-main 
      shadow-2xl 
      rounded-xl 
      p-2
    ">
      <ul
        className="
          grid grid-cols-2 gap-2 sm:grid-cols-3
          lg:flex lg:flex-col md:gap-0
        "
      >
        {menuItems.map((item) => {
          const isActive = item.to && location.pathname === item.to;

          return (
            <li
              key={item.id}
              onClick={() => handleMenuClick(item, navigate)}
              className={`
                flex items-center gap-2 justify-start
                px-3 py-3
                text-sm lg:text-base
                cursor-pointer rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? "bg-yellow-400/90 text-white"
                    : "text-white hover:text-yellow-400 hover:bg-main/80"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};  