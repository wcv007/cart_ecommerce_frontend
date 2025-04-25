import React from "react";
import "./Pagination.css";

const Pagination = ({
  handlePageChange,
  totalResults,
  perPageResults,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalResults / perPageResults);
  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }
  return (
    <div className="pagination_wrapper align_center">
      {pages.length > 1 &&
        pages.map((index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={
              currentPage == index + 1
                ? "pagination_button active_page"
                : "pagination_button"
            }
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
