import React from "react";
import ButtonLoader from "../Common/ButtonLoader";
import { DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { useTranslation } from "react-i18next";

export default function ButtonComponent({
  onClick,
  nameBtn,
  loading,
  disabled,
  img,
  icon,
  styleImg,
  className,
  classNameImage,
  colorLoading,
  soon = false,
}) {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
      <UncontrolledDropdown>
        <DropdownToggle
          tag="button"
          type="submit"
          className={`soon-parent ${className ?? "drop-down-save mobile-button mx-1"}`}
          id="dropdownMenuButton"
          onClick={onClick}
          disabled={soon || loading || disabled}
          style={{ backgroundColor: icon ? "white" : "" }}
        >
          {loading ? (
            <ButtonLoader color={colorLoading} />
          ) : (
            <>
              <>
                {icon ? (
                  <i
                    className={icon}
                    style={{ styleImg }}
                  ></i>
                ) : (
                  <img
                    className="hide-on-mobile"
                    src={img}
                    alt=""
                    style={{
                      filter: styleImg ?? "",
                    }}
                  />
                )}
              </>
              {nameBtn}
              {soon ? (
                <span className="soon-container">{t("common.soon")}</span>
              ) : (
                ""
              )}
            </>
          )}
        </DropdownToggle>
      </UncontrolledDropdown>
    </React.Fragment>
  );
}
