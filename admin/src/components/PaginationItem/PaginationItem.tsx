
import { Pagination } from "antd";
interface PaginationItemProps {
  currentPage: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

export const PaginationItem: React.FC<PaginationItemProps> = ({
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
