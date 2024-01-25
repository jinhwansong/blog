import { useCallback, useState } from "react";

interface IPagination {
  totalItems: number;
  itemsPerPage: number;
}

const usePagination = ({ totalItems, itemsPerPage }: IPagination) => {
  const [currentPage, setCurrentPage] = useState(1);
  // 전체 페이지수
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const onPrevPage = useCallback(() => {
    setCurrentPage((prev) => prev - 1);
  }, [currentPage]);
  const onNextPage = useCallback(() => {
    setCurrentPage((next) => next + 1);
  }, [currentPage]);
  const onPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  return {
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,
    onPage,
  };
};
export default usePagination;