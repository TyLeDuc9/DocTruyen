
import { Pagination } from "antd";
interface PaginationStoryProps {
  currentPage: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

export const PaginationStory: React.FC<PaginationStoryProps> = ({
  currentPage,
  pageSize,
  total,
  onChange,
}) => {
  if (total <= pageSize) return null;

  return (
    <div className="flex justify-center my-10">
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={false}
      />
    </div>
  );
};
