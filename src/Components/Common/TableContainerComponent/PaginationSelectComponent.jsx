"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

export default function PaginationSelectComponent({
  value,
  setParams,
  onPerPageChange,
}) {
  const { t } = useTranslation();

  const perPageOption = [
    {
      options: [
        { label: 10, id: 10 },
        { label: 20, id: 20 },
        { label: 50, id: 50 },
        { label: 100, id: 100 },
      ],
    },
  ];

  const onChangeInSelect = (newPerPage) => {
    if (onPerPageChange) {
      onPerPageChange(newPerPage);
    } else {
      setParams((prevParams) => ({
        ...prevParams,
        per_page: newPerPage,
        page: 1, // Always reset to first page when changing page size
      }));
    }
  };

  return (
    <React.Fragment>
      <div className="mx-4">
        <Select
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "#BEC4C7",
              primary: "#283C47",
            },
            cursor: "default",
            ":active": {
              backgroundColor: "#BEC4C7",
            },
          })}
          className="js-example-basic-single w-100 fs-12"
          id="choices-publish-status-input-productType"
          menuPosition="fixed"
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.id}
          placeholder={t("common.NumberOfDisplayed")}
          value={value}
          onChange={onChangeInSelect}
          options={perPageOption}
        />
      </div>
    </React.Fragment>
  );
}
