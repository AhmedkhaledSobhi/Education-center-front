// import React, { Fragment } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   useExpanded,
//   useFilters,
//   useGlobalFilter,
//   usePagination,
//   useRowSelect,
//   useSortBy,
//   useTable,
// } from "react-table";
// import { Table } from "reactstrap";
// // import { DefaultColumnFilter } from "../filters";
// import { useNavigate } from "react-router-dom";
// import MySVG from "../../../SVG/SVGIcons";
// import { DefaultColumnFilter } from "./filters";

// export default function TableComponent({
//   trClass,
//   thClass,
//   columns,
//   data,
//   previewAccount,
//   previewLink,
//   previewItem,
//   previewInvoices,
//   gotoLink,
//   dataType,
//   customPageSize,
// }) {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const divClass = "table-responsive table-card mb-1 text-primary mt-2";
//   const tableClass = "align-middle";
//   const theadClass = "table-head text-primary";

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       defaultColumn: { Filter: DefaultColumnFilter },
//       initialState: {
//         pageIndex: 0,
//         pageSize: customPageSize,
//         selectedRowIds: 0,
//       },
//     },
//     useGlobalFilter,
//     useFilters,
//     useSortBy,
//     useExpanded,
//     usePagination,
//     useRowSelect
//   );

//   const generateSortingIndicator = (column) => {
//     console.log("ahmed column", column);
//     console.log("ahmed column?.isSorted", column?.isSorted);
//     console.log("ahmed column?.isSortedDesc", column?.isSortedDesc);

//     return column.isSorted ? (column.isSortedDesc ? " " : "") : "";
//   };

//   return (
//     <React.Fragment>
//       <div className={divClass}>
//         <div className="table-responsive-sm">
//           <Table
//             hover
//             striped
//             {...getTableProps()}
//             className={tableClass}
//           >
//             <thead className={theadClass}>
//               {headerGroups.map((headerGroup) => (
//                 <tr
//                   style={{
//                     verticalAlign: "middle",
//                   }}
//                   className={trClass}
//                   key={headerGroup.id}
//                   {...headerGroup.getHeaderGroupProps()}
//                 >
//                   {headerGroup.headers.map((column) => (
//                     <th
//                       style={{
//                         verticalAlign: "middle",
//                       }}
//                       key={column.id}
//                       className={thClass}
//                       {...column.getSortByToggleProps()}
//                     >
//                       {column.render("Header")}
//                       {generateSortingIndicator(column)}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             {page.length > 0 ? (
//               <tbody {...getTableBodyProps()}>
//                 {page.map((row) => {
//                   prepareRow(row);
//                   return (
//                     <Fragment key={row.getRowProps().key}>
//                       <tr
//                         style={
//                           previewAccount ||
//                           gotoLink ||
//                           previewLink ||
//                           previewInvoices ||
//                           previewItem
//                             ? { cursor: "pointer" }
//                             : { cursor: "default" }
//                         }
//                         onClick={
//                           // Row click functionality - only enabled when preview props are passed
//                           // Commented out for tables without preview pages (e.g., Payment Links)
//                           gotoLink
//                             ? () =>
//                                 navigate(
//                                   row.original.type == "إذن صرف"
//                                     ? "/preview/pay/store/" + row.original.uuid
//                                     : "/preview/store/" + row.original.uuid,
//                                   {
//                                     state: {
//                                       detail: row.original,
//                                       type: dataType,
//                                       edit: true,
//                                     },
//                                   }
//                                 )
//                             : previewItem
//                               ? () => {
//                                   navigate(previewItem + row.original.id, {
//                                     state: {
//                                       detail: row.original,
//                                       type: dataType,
//                                       edit: true,
//                                     },
//                                   });
//                                 }
//                               : previewLink
//                                 ? () => {
//                                     navigate(previewLink + row.original.uuid, {
//                                       state: {
//                                         detail: row.original,
//                                         type: dataType,
//                                         edit: true,
//                                       },
//                                     });
//                                   }
//                                 : previewAccount
//                                   ? () => {
//                                       navigate(
//                                         row.original.type == 2
//                                           ? "/preview/treasury/" +
//                                               row.original.uuid
//                                           : "/preview/account/" +
//                                               row.original.uuid,
//                                         {
//                                           state: {
//                                             detail: row.original,
//                                             type: dataType,
//                                             edit: true,
//                                           },
//                                         }
//                                       );
//                                     }
//                                   : previewInvoices
//                                     ? () => {
//                                         navigate(
//                                           row.original.invoiceType == "بيع"
//                                             ? "/preview/sale-invoice/" +
//                                                 row.original.uuid
//                                             : "/preview/return-invoices/return/" +
//                                                 row.original.uuid,
//                                           {
//                                             state: {
//                                               detail: row.original,
//                                               type: dataType,
//                                               edit: true,
//                                             },
//                                           }
//                                         );
//                                       }
//                                     : undefined // No onClick when no preview props - rows are not clickable
//                         }
//                       >
//                         {row.cells.map((cell) => {
//                           return (
//                             <td
//                               className="table-row"
//                               key={cell.id}
//                               {...cell.getCellProps()}
//                               style={cell.column.style}
//                             >
//                               {cell.render("Cell")
//                                 ? cell.render("Cell")
//                                 : "---"}
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     </Fragment>
//                   );
//                 })}
//               </tbody>
//             ) : (
//               <tbody>
//                 <tr>
//                   <td colSpan={50}>
//                     <div
//                       style={{ height: "300px", backgroundColor: "#fff" }}
//                       className="d-flex justify-content-center align-items-center flex-column pt-5 pb-5 w-100 "
//                     >
//                       <img
//                         src={MySVG.logoDark}
//                         width={200}
//                         alt="No data"
//                       />
//                       <h5 className="text-muted mt-3">{t("common.noData")}</h5>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             )}
//           </Table>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }



import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  useExpanded,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import MySVG from "../../../SVG/SVGIcons";
import { DefaultColumnFilter } from "./filters";

export default function TableComponent({
  trClass,
  thClass,
  columns = [],
  data = [],
  previewAccount,
  previewLink,
  previewItem,
  previewInvoices,
  gotoLink,
  dataType,
  customPageSize = 10,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page = [],
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        selectedRowIds: {}, // MUST be object
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const renderSortIcon = (column) => {
    if (!column.canSort || !column.isSorted) return null;
    return column.isSortedDesc ? " " : " ";
  };

  return (
    <div className="table-responsive table-card mb-1 text-primary mt-2">
      <Table hover striped {...getTableProps()} className="align-middle">
        {/* ================== HEADER ================== */}
        <thead className="table-head text -primary">
          {headerGroups.map((headerGroup) => (
            <tr
              key={headerGroup.id}
              {...headerGroup.getHeaderGroupProps()}
              className={trClass}
              style={{ verticalAlign: "middle" }}
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  className={thClass}
                  style={{ verticalAlign: "middle" }}
                  {...(column.canSort
                    ? column.getSortByToggleProps()
                    : {})}
                >
                  {column.render("Header")}
                  {renderSortIcon(column)}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* ================== BODY ================== */}
        {page.length > 0 ? (
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);

              return (
                <Fragment key={row.id}>
                  <tr
                    style={
                      previewAccount ||
                      gotoLink ||
                      previewLink ||
                      previewInvoices ||
                      previewItem
                        ? { cursor: "pointer" }
                        : { cursor: "default" }
                    }
                    onClick={
                      gotoLink
                        ? () =>
                            navigate(
                              row.original.type === "إذن صرف"
                                ? "/preview/pay/store/" + row.original.uuid
                                : "/preview/store/" + row.original.uuid,
                              {
                                state: {
                                  detail: row.original,
                                  type: dataType,
                                  edit: true,
                                },
                              }
                            )
                        : previewItem
                        ? () =>
                            navigate(previewItem + row.original.id, {
                              state: {
                                detail: row.original,
                                type: dataType,
                                edit: true,
                              },
                            })
                        : previewLink
                        ? () =>
                            navigate(previewLink + row.original.uuid, {
                              state: {
                                detail: row.original,
                                type: dataType,
                                edit: true,
                              },
                            })
                        : previewAccount
                        ? () =>
                            navigate(
                              row.original.type === 2
                                ? "/preview/treasury/" +
                                    row.original.uuid
                                : "/preview/account/" +
                                    row.original.uuid,
                              {
                                state: {
                                  detail: row.original,
                                  type: dataType,
                                  edit: true,
                                },
                              }
                            )
                        : previewInvoices
                        ? () =>
                            navigate(
                              row.original.invoiceType === "بيع"
                                ? "/preview/sale-invoice/" +
                                    row.original.uuid
                                : "/preview/return-invoices/return/" +
                                    row.original.uuid,
                              {
                                state: {
                                  detail: row.original,
                                  type: dataType,
                                  edit: true,
                                },
                              }
                            )
                        : undefined
                    }
                  >
                    {row.cells.map((cell) => (
                      <td
                        key={cell.id}
                        {...cell.getCellProps()}
                        style={cell.column.style}
                        className="table-row"
                      >
                        {cell.render("Cell") || "---"}
                      </td>
                    ))}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        ) : (
          /* ================== NO DATA ================== */
          <tbody>
            <tr>
              <td colSpan={50}>
                <div
                  className="d-flex justify-content-center align-items-center flex-column pt-5 pb-5 w-100"
                  style={{ height: "300px", backgroundColor: "#fff" }}
                >
                  <img src={MySVG.logoDark} width={200} alt="No data" />
                  <h5 className="text-muted mt-3">
                    {t("common.noData")}
                  </h5>
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </div>
  );
}
