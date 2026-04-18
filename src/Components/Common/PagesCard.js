import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PagesCard = ({
  icon,
  title,
  subTitle,
  soon,
  link,
  role = true,
  size,
  paddin,
}) => {
  const { t } = useTranslation();

  return (
    <Link
      className={`${soon ? "soon-parent" : ""}`}
      style={{
        padding: paddin ? paddin : "15px 34px",
        margin: "15px 2px 0",
        borderRadius: "10px",
        // border: " 1px solid rgba(234, 236, 237, 1)",
        border: " 1px solid rgb(174, 205, 251, 1)",

        width: size ? size : "260px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        position: "relative",
      }}
      to={role ? link : ""}
    >
      {soon && (
        <span
          style={{ fontSize: "14px", width: "70px", left: "-17px !important" }}
          className="soon-container"
        >
          {t("common.soon")}
        </span>
      )}
      <div className="mx-auto">{icon}</div>
      <div>
        <span
          style={{
            color: "rgba(40, 60, 71, 1)",
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ fontSize: "12px" }}>
        <span
          style={{
            color: "rgba(40, 60, 71, 1)",
            fontWeight: "400",
          }}
        >
          {subTitle}
        </span>
      </div>
    </Link>
  );
};

export default PagesCard;
