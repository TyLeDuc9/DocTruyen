
import { TopHeader } from "../Header/TopHeader";
import { NavHeader } from "./NavHeader";
export const Header = () => {
  return (
    <header className="bg-white">
      <div className="container">
        <TopHeader />
      </div>
      <div className="bg-main">
        <NavHeader />
      </div>
    </header>
  );
};
