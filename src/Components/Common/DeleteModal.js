import PropTypes from "prop-types";
import React from "react";
import { Modal, ModalBody } from "reactstrap";
import deleteIcon from "../../assets/images/deleteIcon.png";
import { useTranslation } from "react-i18next";
import ButtonLoader from "./ButtonLoader";

const DeleteModal = ({ show, onDeleteClick, onCloseClick, loader }) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={show}
      toggle={onCloseClick}
      centered={true}
    >
      <ModalBody
        style={{ direction: "ltr" }}
        className="py-3 px-1"
      >
        <div className="mt-2 text-center">
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="loop"
            colors="primary:#FFBC0A,secondary:#f06548"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
          <div className="d-flex justify-content-center">
            <img
              src={deleteIcon}
              alt="delete"
            />
          </div>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>{t("common.message_delete")}</h4>
            <p className="text-muted mx-4 mb-0">{t("common.back")} </p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            {t("common.cancel")}
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={onDeleteClick}
            disabled={loader}
          >
            {loader ? <ButtonLoader /> : t("common.YesDelete")}
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

DeleteModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any,
};

export default DeleteModal;
