"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

export default function PaginationSelectComponent({
  setPage,
  setPer_page,
  per_page
}) {
  const { t } = useTranslation();
  const perPageOption = [
    {
      options: [
        { label: 5, id: 5 },
        { label: 10, id: 10 },
        { label: 15, id: 15 },
        { label: 20, id: 20 },
        // { label: 25, id: 25 },
        // { label: 30, id: 30 },
        // { label: 35, id: 35 },
        // { label: 40, id: 40 },
        // { label: 45, id: 45 },
        // { label: 50, id: 50 },
        // { label: 55, id: 55 },
        // { label: 60, id: 60 },
        // { label: 65, id: 65 },
        // { label: 70, id: 70 },
        // { label: 75, id: 75 },
        // { label: 80, id: 80 },
        // { label: 85, id: 85 },
        // { label: 90, id: 90 },
        // { label: 95, id: 70 },
        // { label: 100, id: 100 },
      ],
    },
  ];


  const onChangeInSelect = (selectedOption) => {
    setPer_page(selectedOption);
    setPage(1);
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
          value={per_page}
          onChange={onChangeInSelect}
          options={perPageOption}
        />
      </div>
    </React.Fragment>
  );
}
