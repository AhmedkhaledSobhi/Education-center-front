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
// import { DefaultColumnFilter } from "../filters";

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
  previewAccount,
  previewInvoices,
  setParams,
  params,
  previewItem,
  tablePagination,
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
      {console.log("ahmed tablePagination", tablePagination)}
      {console.log("ahmed page", page)}
      {console.log("ahmed customPagination", customPagination)}


      {/* {!tablePagination && page.length > 0 && customPagination && ( */}
      {!tablePagination && customPagination && (

        <TablePaginationComponent
          value={params.per_page}
          setParams={setParams}
          totalPage={totalPage}
          currentPage={currentPage}
        />
      )}
    </React.Fragment>
  );
}
