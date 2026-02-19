import { useAllCategory } from "../../hooks/useAllCategory";
import { Link } from "react-router-dom";
export const Genre = () => {
  const { categories, error } = useAllCategory();


  if (error) return <p>{error}</p>;
  return (
    <div className="grid lg:grid-cols-8 sm:grid-cols-3 grid-cols-2 gap-y-4 my-4 lg:my-0 text-sm">
      {categories.map((item) => (
        <Link
          key={item._id}
          to={`/the-loai/${item.slug}`}
          className="font-medium hover:text-[#236288]"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
