import React from "react";
import PaginationSelectComponent from "./PaginationSelectComponent";
import PaginationComponent from "./PaginationComponent";

export default function TablePaginationComponent({
  totalPage,
  currentPage,
  setPage,
  setPer_page,
  per_page,
}) {

  return (
    <React.Fragment>
      <div className="dir-sm-screen d-flex justify-content-between align-items-center">
        <PaginationComponent
          setPage={setPage}
          totalPages={totalPage}
          currentPage={currentPage}
        />

        <PaginationSelectComponent
          setPage={setPage}
          setPer_page={setPer_page}
          per_page={per_page}
        />
      </div>
    </React.Fragment>
  );
}
