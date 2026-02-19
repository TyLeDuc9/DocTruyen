import { Outlet } from "react-router-dom";
import { MenuNavbar } from "../../components/Navbar/MenuNavbar";

export const User = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 lg:py-10">
      <div className="lg:w-[80%] w-[90%] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:px-4">
      
        <MenuNavbar />

        <div className="flex-1 flex justify-center">
          <Outlet />
        </div>

      </div>
    </div>
  );
};