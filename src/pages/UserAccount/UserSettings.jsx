import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardBody, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Row } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import ButtonLoader from '../../Components/Common/ButtonLoader';
import { PROFILE } from '../../helpers/url_helper';
import configService from '../../helpers/config';
import avatar1 from "../../assets/images/user-avatar.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { editAccountInformation } from '../../helpers/fakebackend_helper';
import { Formik } from 'formik';
import TopPageButttons from '../../Components/Common/TopPageButttons';
import { useNavigate } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import Select from "react-select";
import AddImg from "../../assets/images/static/gallery-add.png";
import { BiX } from "react-icons/bi";
import AddressComponents from './Components/AddressComponents';
import ContactInformationComponents from './Components/ContactInformationComponents';

export default function UserSettings() {
  const { t, i18n } = useTranslation();
  document.title = t("ProfileDropdown.accountSettings");
  const nav = useNavigate();
  const [profileData, setProfileData] = useState();
  const [profileImageSrc, setProfileImageSrc] = useState(
    profileData?.image_path || null
  );
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadsave, setLoadSave] = useState(false);
  const [loadsaveDraft, setLoadSaveDraft] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [disableEdit, setDisableEdit] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [preview, setPreview] = useState("");
  const [highlight, setHighlight] = useState(false);

  const getProfileData = async () => {
    try {
      setLoadingProfile(true);
      // const res = await profile();
      const BASE_URL = configService.apiBaseUrl;
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const idUser = authUser?.id
      const res = await axios.get(`${BASE_URL}${PROFILE}${idUser}`);      
      if(res){
        const phone = res?.phone?.replace(/^\(\+20\)/, "");
        setInitialValues({
          commercial_name: res?.first_name + " " + res?.last_name, 
          phone: phone,
          email: res?.email,
          address: res?.address || "",
        })
        setProfileData((prev) => {
          return {
            name: res?.first_name + " " + res?.last_name,
            phone: phone,
            email: res?.email,
            phone_code_id: "996",
            avatar: res?.image_path != "null" ? res?.image_path : avatar1,
          };
        });
        setLoadingProfile(false);
      }
    } catch (error) {
      setLoadingProfile(false);
      console.log("Error in fetching profile data:", error);
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);

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
  
  // ________________________________________________________________________________________

  const validationSchema = Yup.object({

  })

  const onSubmitForm = async (values, action) => {
    const params = {}
    const formData = new FormData();
    for (const key in params) {
      if (Object.hasOwnProperty.call(params, key) && params[key]) {
        formData.append(key, params[key]);
      }
    }

    if (values?.photo) {
      formData.append("image", values?.photo[0]);
    }
    try {
      editAccountInformation(formData).then((res) => {
        if (res && res.status) {
          toast.success(res?.message, {
            position: "top-right",
            hideProgressBar: false,
            progress: undefined,
            toastId: "",
          });
          setLoadSave(true)
        } else{
          toast.error(res?.message, {
            position: "top-right",
            hideProgressBar: false,
            progress: undefined,
            toastId: "",
          });
          setLoadSave(false)
        }
      })
    } catch (error) {
      console.log("Error in editing profile data:", error);
    }

  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("ProfileDropdown.Settings")}
            subTitle={t("ProfileDropdown.Settings")}
            pageTitle={t("ProfileDropdown.accountSettings")}
          />
          {loadingProfile ?
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: 200,
              }}
            >
              <ButtonLoader
                color="#0d6efd"
                width="70"
                height="70"
              />
            </div>
          : 
            (
              <Formik
                initialValues={initialValues}
                validationSchema={() => {
                  return validationSchema;
                }}
                onSubmit={(values, action) => {
                  onSubmitForm(values, action);
                }}
                enableReinitialize={true}
              >
                {({
                  handleSubmit,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  values,
                  isSubmitting,
                  setFieldValue,
                  validateForm,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                      }
                    }}
                  >
                    <TopPageButttons
                      PageTittle={`${t("common.edit")} ${t("AccountSettings.ProfileInformation")}`}
                      handleSave={() => handleSubmit(values)}
                      loadsave={loadsave}
                      handleSaveDraft={() => handleSubmit(values)}
                      loadsaveDraft={loadsaveDraft}
                      close={() => {nav("/teacher")}}
                      information={()=> setIsInfoOpen(!isInfoOpen)}
                    />

                    {/* ---------------- المعلومات الاساسيه ---------------- */}
                    <Card className="">
                      <div className="sub-title fs-24">
                        {t("AccountSettings.Basic_information")}
                      </div>
                      <CardBody>
                        <Row>
                          <Col xl={4}>
                            <FormGroup className="mb-3">
                              <Label
                                className="form-label"
                                htmlFor="Licensing"
                              >
                                {t("AccountSettings.Center_Name")}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type={"text"}
                                className="form-control pe5 password-input"
                                placeholder={t(
                                  "AccountSettings.Center_Name"
                                )}
                                id="commercial_name"
                                title="commercial_name"
                                name="commercial_name"
                                onChange={(e) =>
                                  setFieldValue("commercial_name", e.target.value)
                                }
                                value={values?.commercial_name}
                                onBlur={handleBlur}
                                // disabled={disableEdit}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row className='flex-column'>
                          <Col
                            lg={3}
                            className="mb-4 section-left white p-4 d- flex justify-content-center align-items-center"
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
                            className="mb-4 section-left white p-4 "
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
                                  // disabled={disableEdit}
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
                                      if (!disableEdit)
                                        handleDeleteImage(e, setFieldValue);
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
                                    <i className=" ri-image-add-line text-secondary"></i>
                                  </div>
                                  <p className="text-muted d-flex add-product-image-table">
                                    {t("common.InsertImageHereOrClickToUpload")}
                                    <span>{t("common.OrClickToUpload")}</span>.
                                  </p>
                                </label>
                                <input
                                  className={"file-upload-input"}
                                  id="upload"
                                  type="file"
                                  // disabled={disableEdit}
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
                                {touched.photo && errors.photo ? (
                                  <div style={{ color: "red" }}>{errors.photo}</div>
                                ) : null}
                              </>
                            )}
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>

                    {/* ---------------- بيانات الاتصال ---------------- */}
                    <ContactInformationComponents
                      values={values}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                    />
                    {/* ---------------- العنوان ---------------- */}
                    <AddressComponents
                      values={values}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                    />
                  </form>
                )}
              </Formik>
            )
          }
        </Container>
      </div>
    </React.Fragment>
  )
}
