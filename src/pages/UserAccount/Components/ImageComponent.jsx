import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import { BiX } from 'react-icons/bi';
import AddImg from "../../../assets/images/static/gallery-add.png";
import { ErrorMessage } from 'formik';

export default function ImageComponent({
  profileData,
  setFieldValue,
  touched,
  setFieldTouched,
  errors,
  disableEdit
}) {
  const { t, i18n } = useTranslation();
  const [isSelected, setIsSelected] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [preview, setPreview] = useState("");
  const [profileImageSrc, setProfileImageSrc] = useState(
    profileData?.avatar || null
  );
  useEffect(() => {
   setProfileImageSrc(profileData?.avatar);
  }, [profileData?.avatar]);

  // ________________________________________________________________________________________
  const removeImageHandler = () => {
    setIsSelected(false);
  };

  const handleImageChange = (event, setFieldValue) => {
    handleUpload(event);
    setIsSelected(true);
    setFieldValue("photo", event.target.files);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (e, setFieldValue) => {
    setProfileImageSrc("");
    setFieldValue("photo", null);
    removeImageHandler();
  };

  const handleEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    preview === "" && setHighlight(true);
  };

  const handleOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    preview === "" && setHighlight(true);
  };

  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
    setIsSelected(true);
    const [file] = e?.target?.files || e?.dataTransfer?.files;
    uploadFile(file);
  };

  function uploadFile(file) {
    // var file = file;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      var image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        setPreview(`${e.target.result}`);
      };
    };
  }

  return (
    <React.Fragment>
      <Row className='align-items-center'>
        <Col
          lg={4}
          className="section-left white justify-content-center align-items-center"
        >
          <div>
            <p className="companylogo">
              {t("AccountSettings.slogan")}{" "}
            </p>

            <p className="text-primary d-flex">
              {t("AccountSettings.ClickOnTheSloganImage")}{" "}
            </p>
            <p className="text-muted mt-0">
              {t("AccountSettings.imagesize")}
            </p>
          </div>
        </Col>
        <Col
          lg={6}
          className="section-left white"
        >
          <div>
          {console.log("ahmed profileData", profileData)}
          {console.log("ahmed profileImageSrc", profileImageSrc)}
          {/* {console.log("ahmed aa", aa)} */}

          {profileData?.client?.image || profileImageSrc ? (
            <label
              className={"file-upload-label"}
              htmlFor="upload"
              onDragEnter={(e) => handleEnter(e)}
              onDragLeave={(e) => handleLeave(e)}
              onDragOver={(e) => handleOver(e)}
              onDrop={(e) => handleUpload(e)}
              style={{ position: "relative" }}
            >
              {profileImageSrc ? (
                <img
                  src={profileImageSrc}
                  alt="accountImage"
                  style={{
                    width: "150px",
                    height: "150px",
                    margin: "10px auto",
                  }}
                />
              ) : (
                <div
                  htmlFor="upload"
                  className="add-img-profile"
                >
                  <img
                    src={AddImg}
                    alt=""
                  />
                  <span>{t("common.ClickToUpload")}</span>
                </div>
              )}
              <input
                className={"file-upload-input"}
                id="upload"
                type="file"
                disabled={disableEdit}
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e, setFieldValue);
                }}
                title="photo"
                name="photo"
              />
              {profileImageSrc && (
                <span
                  onClick={(e) => {
                    if (!disableEdit) {
                      handleDeleteImage(e, setFieldValue);
                    }
                  }}
                  style={{
                    position: "absolute",
                    top: "-1px",
                    right: "-1px",
                    cursor: !disableEdit ? "pointer" : "default",
                    padding: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }}
                >
                  <BiX />
                </span>
              )}
            </label>
          ) : (
            <>
              <label
                className={"file-upload-label"}
                htmlFor="upload"
                onDragEnter={(e) => handleEnter(e)}
                onDragLeave={(e) => handleLeave(e)}
                onDragOver={(e) => handleOver(e)}
                onDrop={(e) => handleUpload(e)}
              >
                <div>
                  <i className=" ri-image-add-line " style={{fontSize:"25px", color: "#0d6dfdb3"}}></i>
                </div>
                <p className="text-muted add-product-image-table">
                  {t("common.InsertImageHereOrClickToUpload")}
                  <span>{t("common.OrClickToUpload")}</span>.
                </p>
              </label>
              <input
                className={"file-upload-input"}
                id="upload"
                type="file"
                disabled={disableEdit}
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e, setFieldValue);
                }}
                title="photo"
                name="photo"
              />
              {isSelected && (
                <div className="classes-image">
                  <i
                    fontSize={25}
                    onClick={removeImageHandler}
                    className="ri-close-circle-fill"
                  ></i>
                </div>
              )}
              {touched.photo && errors.photo && (
                <ErrorMessage
                  name="photo"
                  component="div"
                  className="text-danger"
                />
              )}
            </>
          )}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}
