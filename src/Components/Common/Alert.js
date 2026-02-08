import React from "react";
import { useTranslation } from "react-i18next";

const Alert = ({ message, onClose, close, style }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {close && (
        <div className="new-card">
          <div className="d-flex align-items-center">
            <p>{t(message)} </p>
            <div
              className="icon d-flex align-items-center"
              style={style ? { alignItems: "center" } : null}
              onClick={onClose}
            >
              <i className=" ri-close-circle-line"></i>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Alert;
