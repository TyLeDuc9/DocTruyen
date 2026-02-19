import { topGenre } from "../../config/topGenre";
import { Link } from "react-router-dom";

const TopGenre = () => {
  return (
     <div className="grid lg:grid-cols-8 sm:grid-cols-3 grid-cols-2 gap-y-4 my-4 lg:my-0 text-sm">
      {topGenre.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="font-medium hover:text-[#236288] lg:pl-6 px-0"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default TopGenre;
