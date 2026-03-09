import React from "react";
import TableComponent from "./TableComponent";
import {
  useExpanded,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { DefaultColumnFilter } from "./filters";
import TablePaginationComponent from "./TablePaginationComponent";

export default function TableContainerComponent({
  columns,
  data,
  customPagination,
  customPageSize,

  trClass,
  thClass,
  gotoLink,
  previewLink,
  dataType,
  totalPage,
  currentPage,
  setPage,
  previewAccount,
  previewInvoices,
  previewItem,
  tablePagination,
  setPer_page,
  per_page,
}) {
  const {
    page,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        selectedRowIds: 0,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  return (
    <React.Fragment>
      <TableComponent
        trClass={trClass}
        thClass={thClass}
        columns={columns}
        data={data}
        previewAccount={previewAccount}
        previewLink={previewLink}
        previewItem={previewItem}
        previewInvoices={previewInvoices}
        gotoLink={gotoLink}
        dataType={dataType}
        customPageSize={customPageSize}
      />

      {/* {!tablePagination && page.length > 0 && customPagination && ( */}
      {!tablePagination && customPagination && (
        <TablePaginationComponent
          totalPage={totalPage}
          currentPage={currentPage}
          setPage={setPage}
          setPer_page={setPer_page}
          per_page={per_page}
        />
      )}
    </React.Fragment>
  );
}
