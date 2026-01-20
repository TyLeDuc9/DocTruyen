import { topGenre } from "../../config/topGenre";
import { Link } from "react-router-dom";

const TopGenre = () => {
  return (
    <div className="flex gap-4 my-2 text-sm">
      {topGenre.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="font-medium hover:text-[#236288] px-4"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default TopGenre;
