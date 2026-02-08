import React from "react";
import PaginationSelectComponent from "./PaginationSelectComponent";
import PaginationComponent from "./PaginationComponent";
// import PaginationComponent from "../PaginationComponent";
// import PaginationSelectComponent from "../PaginationSelectComponent";

export default function TablePaginationComponent({
  value,
  setParams,
  totalPage,
  currentPage,
  onPageChange,
  searchParams = {},
}) {
  const handlePageChange = (newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));

    if (onPageChange) {
      setTimeout(() => {
        onPageChange({
          page: newPage,
          per_page: value?.id || value, // Handle both object and primitive values
          ...searchParams, // Include all current filters including keyword
        });
      }, 0);
    }
  };

  const handlePerPageChange = (newPerPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      per_page: newPerPage,
      page: 1, // Reset to first page when changing page size
    }));

    if (onPageChange) {
      setTimeout(() => {
        onPageChange({
          page: 1,
          per_page: newPerPage.id,
          ...searchParams, // Include all current filters including keyword
        });
      }, 0);
    }
  };

  return (
    <React.Fragment>
      <div className="dir-sm-screen d-flex justify-content-between align-items-center">
        <PaginationComponent
          setPage={handlePageChange}
          totalPages={totalPage}
          currentPage={currentPage}
        />
        <PaginationSelectComponent
          value={value}
          setParams={setParams}
          onPerPageChange={handlePerPageChange}
        />
      </div>
    </React.Fragment>
  );
}
