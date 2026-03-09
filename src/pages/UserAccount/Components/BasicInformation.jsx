import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import Select from "react-select";
import { BiX } from 'react-icons/bi';
import AddImg from "../../../assets/images/static/gallery-add.png";
import ComponentLoader from '../../../Components/Common/ComponentLoader';
import { ErrorMessage } from 'formik';

export default function BasicInformation({
  values,
  handleBlur,
  setFieldValue,
  touched,
  setFieldTouched,
  errors,
  profileData,
  loadingProfile,
  disableEdit,
  Account_type,
  language,
}) {
  const { t, i18n } = useTranslation();
  const [isSelected, setIsSelected] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [preview, setPreview] = useState("");
  
  const [profileImageSrc, setProfileImageSrc] = useState(
    profileData?.image_path || null
  );


  // ________________________________________________________________________________________
  const removeImageHandler = () => {
    setIsSelected(false);
  };

  const handleImageChange = (event, setFieldValue) => {
    handleUpload(event);
    setIsSelected(true);
    // setFieldValue("photo", event.target.files);
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
      {/* ---------------- المعلومات الاساسيه ---------------- */}
      <Card>
        <CardHeader>
          <div className="sub-title">
            {t("AccountSettings.Basic_information")}
          </div>
        </CardHeader>
        <CardBody>
          {loadingProfile ?
            <ComponentLoader/>
             : (
              <Row>
                <Col lg={8} >
                  <Row>
                    {/* ------ الاسم الاول ------ */}
                    <Col lg={6}>
                      <FormGroup>
                        <Label
                          htmlFor="first_name"
                        >
                          {t("Registers.first_Name")}{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          placeholder={`${t("common.enter")} ${t("Registers.first_Name")} ${t("common.placeholder")}`}
                          title={t("Registers.first_Name")}
                          name="first_name"
                          id="first_name"
                          onChange={(e) =>
                            setFieldValue("first_name", e.target.value)
                          }
                          value={values?.first_name}
                          onBlur={handleBlur}
                        />
                        {touched?.first_name && errors?.first_name && (
                          <ErrorMessage
                            name="first_name"
                            component="div"
                            className="text-danger"
                          />
                        )}

                      </FormGroup>
                    </Col>

                    {/* ------ الاسم الاخير  ------ */}
                    <Col lg={6}>
                      <FormGroup>
                        <Label
                          htmlFor="last_name"
                        >
                          {t("Registers.last_Name")}{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="last_name"
                          id="last_name"
                          title={t("Registers.last_Name")}
                          placeholder={`${t("common.enter")} ${t("Registers.last_Name")} ${t("common.placeholder")}`}
                          onChange={(e) =>
                            setFieldValue("last_name", e.target.value)
                          }
                          value={values?.last_name}
                          onBlur={handleBlur}
                        />
                        {touched?.last_name && errors?.last_name && (
                          <ErrorMessage
                            name="last_name"
                            component="div"
                            className="text-danger"
                          />
                        )}
                      </FormGroup>
                    </Col>

                    {/* ------ اسم المركز ------ */}
                    <Col lg={6}>
                      <FormGroup className="mb-3">
                        <Label
                          htmlFor="Center_name"
                        >
                          {t("AccountSettings.Center_Name")}{" "}
                        </Label>
                        <Input
                          type={"text"}
                          id="Center_name"
                          name="Center_name"
                          title={t("AccountSettings.Center_Name")}
                          className="form-control pe5 password-input"
                          placeholder={`${t("common.enter")} ${t("AccountSettings.Center_Name")} ${t("common.placeholder")}`}
                          onChange={(e) =>
                            setFieldValue("Center_name", e.target.value)
                          }
                          value={values?.Center_name}
                          onBlur={handleBlur}
                          disabled
                        />
                        {touched?.Center_name && errors?.Center_name && (
                          <ErrorMessage
                            name="Center_name"
                            component="div"
                            className="text-danger"
                          />
                        )}
                      </FormGroup>
                    </Col>

                    {/* ------ نوع الحساب ------ */}
                    <Col lg={6}>
                      <FormGroup>
                        <Label
                          htmlFor="role"
                        >
                          {t("Registers.Account_type")}{" "}
                          <span className="text-danger">*</span>
                        </Label>
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
                          menuPortalTarget={document.body}
                          menuPosition="fixed"
                          styles={{
                            menuPortal: (base) => ({
                              ...base,
                              zIndex: 9999,
                            }),
                          }}
                          id="role"
                          name="role"
                          placeholder={`${t("common.Select")} ${t("Registers.Account_type")} ${t("common.placeholder")}`}    
                          options={Account_type}
                          getOptionLabel={(option) => option?.name}
                          getOptionValue={(option) => option?.id}
                          value={
                            Account_type.find((option)=>{
                              return  option?.value === values?.role
                            }) 
                          } 
                          onChange={(option) => {
                            setFieldValue("role", option);
                          }}
                          onBlur={() => {
                            setFieldTouched("role", true);
                          }}
                          isDisabled
                        />
                        {touched?.role && errors?.role && (
                          <ErrorMessage
                            name="role"
                            component="div"
                            className="text-danger"
                          />
                        )}
                      </FormGroup>
                    </Col>

                    {/* ------ العمر ------ */}
                    <Col lg={6}>
                      <FormGroup>
                        <Label
                          htmlFor="age"
                        >
                          {t("Registers.age")}{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="number"
                          id="age"
                          name="age"
                          title={t("Registers.age")}
                          placeholder={`${t("common.enter")} ${t("Registers.age")} ${t("common.placeholder")}`}
                          onChange={(e) =>{
                            const value = e.target.value.replace(/\D/g, "");
                            setFieldValue("age", value)
                            // setFieldValue("age", e.target.value)
                          }}
                          value={values?.age}
                          onBlur={handleBlur}
                          maxLength={2}
                          onWheel={(e) => e.target.blur()}
                        />
                        {touched?.age && errors?.age && (
                          <ErrorMessage
                            name="age"
                            component="div"
                            className="text-danger"
                          />
                        )}
                      </FormGroup>
                    </Col>

                    {/* ------ اللغة ------ */}
                    <Col lg={6}>
                      <FormGroup>
                        <Label
                          htmlFor="language"
                        >
                          {t("common.language")}{" "}
                          <span className="text-danger">*</span>
                        </Label>
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
                          menuPortalTarget={document.body}
                          menuPosition="fixed"
                          styles={{
                            menuPortal: (base) => ({
                              ...base,
                              zIndex: 9999,
                            }),
                          }}
                          id="language"
                          name="language"
                          placeholder={`${t("common.Select")} ${t("common.language")} ${t("common.placeholder")}`}    
                          options={language}
                          getOptionLabel={(option) => option?.name}
                          getOptionValue={(option) => option?.id}
                          value={
                            language?.find((option)=>{
                              return  option?.value === values?.language?.value
                            }) 
                          } 
                          onChange={(option) => {
                            setFieldValue("language", option?.value);
                          }}
                          onBlur={() => {
                            setFieldTouched("language", true);
                          }}
                        />
                        {touched?.language && errors?.language && (
                          <ErrorMessage
                            name="language"
                            component="div"
                            className="text-danger"
                          />
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col lg={4}>
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
                </Col>
              </Row>
            )}
        </CardBody>
      </Card>
    </React.Fragment>  
  )
}
