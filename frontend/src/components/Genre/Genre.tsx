import { useAllCategory } from "../../hooks/useAllCategory";
import { Link } from "react-router-dom";
export const Genre = () => {
  const { categories, loading, error } = useAllCategory();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="grid grid-cols-8 gap-y-4 text-sm">
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
