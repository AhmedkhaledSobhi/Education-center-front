"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "reactstrap";

const PaginationComponent = ({ totalPages, currentPage, setPage }) => {
  const { t } = useTranslation();

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 4) {
        // Show pages 1-5 + ellipsis + last page
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show first page + ellipsis + last 5 pages
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first + ellipsis + current-1, current, current+1 + ellipsis + last
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();
  
  return (
    <div className="d-flex align-items-center">
      {/* Previous button */}
      <Button
        color="light"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
        className="me-1"
      >
        <i className="ri-arrow-right-s-line"></i>
      </Button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-2 text-muted">...</span>
          ) : (
            <Button
              color={currentPage === page ? "primary" : "light"}
              size="sm"
              // onClick={() => setPage(page)}
              onClick={() => {
                if (page !== currentPage) {
                  setPage(page);
                }
              }}
              className="me-1"
              disabled={currentPage === page}
            >
              {page}
            </Button>
          )}
        </React.Fragment>
      ))}

      {/* Next button */}
      <Button
        color="light"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}
      >
        <i className="ri-arrow-left-s-line"></i>
      </Button>
    </div>
  );
};

export default PaginationComponent;
