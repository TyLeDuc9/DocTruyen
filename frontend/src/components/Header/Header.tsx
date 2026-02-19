
import { TopHeader } from "../Header/TopHeader";
import { NavHeader } from "./NavHeader";
export const Header = () => {
  return (
    <header className="bg-white">
      <div className="lg:w-[80%] w-[95%] mx-auto">
        <TopHeader />
      </div>
      <div className="bg-main">
        <NavHeader />
      </div>
    </header>
  );
};
