import logo from "../../assets/logo/logo.png";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-4">

      <hr className="border-0 h-2 bg-main" />

      <div className="container mx-auto px-4 py-12 
                      grid grid-cols-1 
                      sm:grid-cols-2 
                      lg:grid-cols-3 
                      gap-8 text-sm">

        {/* Logo */}
        <div className="flex flex-col items-center lg:items-start gap-3 text-center lg:text-left">
          <img
            src={logo}
            alt="logo"
            className="w-20 h-20 object-contain"
          />
          <h1 className="text-xl text-main font-semibold uppercase">
            DocTruyen
          </h1>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3 items-center text-base">
          <h2 className="font-semibold">Liên hệ quảng cáo</h2>
          <div className="flex items-center gap-2 text-main">
            <MdEmail size={18} />
            <span className="hover:underline cursor-pointer">
              doctruyen@gmail.com
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3 
                        items-center lg:items-end 
                        text-base text-gray-600">

          <span className="hover:text-[#236288] cursor-pointer">
            Giới thiệu
          </span>
          <span className="hover:text-[#236288] cursor-pointer">
            Điều khoản
          </span>
          <span className="hover:text-[#236288] cursor-pointer">
            Chính sách bảo mật
          </span>
        </div>

      </div>

      <div className="text-center text-xs text-gray-500 pb-6 px-4">
        © 2025 DocTruyen. All rights reserved.
      </div>
    </footer>
  );
};