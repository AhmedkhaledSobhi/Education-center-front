import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Row } from 'reactstrap';
import * as Yup from "yup";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Alert from '../../../Components/Common/Alert';
import { Formik } from 'formik';
import TopPageButttons from '../../../Components/Common/TopPageButttons';
import Select from "react-select";
import AddressComponents from '../../UserAccount/Components/AddressComponents';
import phoneCodeData from "../../../localesJson/PhoneCode.json";
import SimpleBar from 'simplebar-react';
import { getStatus } from '../../../helpers/dataLocal';

export default function AddBranche() {
  const { t, i18n } = useTranslation();
  document.title = `${t("common.add")} ${t("branches.Branches")}`;
  const nav = useNavigate();

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [loadsave, setLoadSave] = useState(false);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const phoneCode = phoneCodeData?.phoneCodes || [];
  const [seletedCountry, setseletedCountry] = useState({
    id: 251,
    countryName: "Egypt",
    code: "+20",
  });
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const Status = getStatus();

  // ________________________________________________________________________________________
  const [initialValues, setInitialValues] = useState({
    name: "",
    NumberRooms: "",
    codePhone: `${seletedCountry?.code}`,
    phone: "",
    status: Status?.[0],
    Description: "",
    country: { 
      id: "65", 
      name: "Egypt", 
      name_ar: "مصر",
      name_en: "Egypt",
    },
    region: "",
    city: "",
  });

  const validationSchema = Yup.object({
    name: Yup.string().required(`${t("Subject.name")} ${t("common.required")}`),
    NumberRooms: Yup.number()
    .typeError(t("required.enter_valid_number"))
    .required(`${t("branches.Number_rooms")} ${t("common.required")}`)
    .integer(t("required.must_be_integer"))
    .min(1, t("required.must_be_at_least_one")),
    // phone: Yup.string()
    //   .required(t("required.phoneNumber"))
    //   .matches(/^\+?[0-9]+$/, t("required.enter_valid_number"))
    //   .min(9, t("required.mobileNumberValidation"))
    //   .max(15, t("required.mobileNumberValidation")),
    // phone: Yup.string()
    //   .required(t("required.phoneNumber"))
    //   .matches(/^01[0125][0-9]{8}$/, t("required.enterEgyptianValidNumber")),
    phone: Yup.string()
    .required(`${t("AccountSettings.phone")} ${t("common.required")}`)
    .matches(
      /^(?:01[0125][0-9]{8}|(?:\+20|20)1[0125][0-9]{8})$/,
      t("required.enterEgyptianValidNumber")
    ),
    status: Yup.object().required(`${t("common.status")} ${t("common.required")}`),
    country: Yup.object().required(`${t("common.country")} ${t("common.required")}`),
    region: Yup.object().required(`${t("common.Region")} ${t("common.required")}`),
    city: Yup.object().required(`${t("common.city")} ${t("common.required")}`),
  });

  const handleSaveNew = async (values, action) =>{
    try{
      setLoadSave(true)
      console.log("ahmed values", values);
      await validationSchema.validate(values, { abortEarly: false });

    } 
    catch(error){
      if (error.name === "ValidationError") {
        setLoadSave(false)
      }else {
        console.error(error);
      }
      return;
    }
  }    
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("LayoutMenuData.Setting")}
            subTitle={t("LayoutMenuData.Setting")}
            pageTitle={t("branches.Branches")}
            pageTitleLink={"/branches"}
            subPageTitle={`${t("common.add")} ${t("branches.Branches")}`}
          />
          <Row>
            <Col xxl={12}>
              <Alert
                message={"descMsg"}
                close={isInfoOpen}
                onClose={()=> setIsInfoOpen(!isInfoOpen)}
              />
            </Col>
            <Col xxl={12}>
              <Formik
                initialValues={initialValues}
                validationSchema={() => {
                  return validationSchema;
                }}
                onSubmit={(values, formikBag) => {
                  formikBag.setErrors({});
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
                  setFieldTouched,
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
                      PageTittle={`${t("common.add")} ${t("branches.Branches")}`}
                      handleSave={() => handleSaveNew(values)}
                      loadsave={loadsave}
                      close={() => {nav("/branches")}}
                      information={()=> setIsInfoOpen(!isInfoOpen)}
                    />
                    <Card>
                      <CardHeader>
                        <div className="sub-title">
                          {t("branches.Basic_information")}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          {/* ------ اسم الفرع ------ */}
                          <Col lg={4}>
                            <FormGroup>
                              <Label
                                htmlFor="name"
                              >
                                {t("branches.name")}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="text"
                                placeholder={`${t("common.enter")} ${t("branches.name")} ${t("common.placeholder")}`}
                                title={t("branches.name")}
                                name="name"
                                id="name"
                                onChange={(e) =>
                                  setFieldValue("name", e.target.value)
                                }
                                value={values?.name}
                                onBlur={handleBlur}
                              />
                              {touched?.name && errors?.name ? (
                                <div style={{ color: "red" }}>
                                  {errors?.name}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Col>

                          {/* ------ عدد الغرف  ------ */}
                          <Col lg={4}>
                            <FormGroup>
                              <Label
                                htmlFor="NumberRooms"
                              >
                                {t("branches.Number_rooms")}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="number"
                                placeholder={`${t("common.enter")} ${t("branches.Number_rooms")} ${t("common.placeholder")}`}
                                title={t("branches.Number_rooms")}
                                name="NumberRooms"
                                id="NumberRooms"
                                onChange={(e) =>
                                  setFieldValue("NumberRooms", e.target.value)
                                }
                                value={values?.NumberRooms}
                                onBlur={handleBlur}
                                onWheel={(e) => e.target.blur()} // disables scroll increment

                              />
                              {touched?.NumberRooms && errors?.NumberRooms ? (
                                <div style={{ color: "red" }}>
                                  {errors?.NumberRooms}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Col>

                          {/* ----------- رقم الهاتف ----------- */}
                          <Col lg={4}>
                            <FormGroup>
                              <Label
                                htmlFor="phone"
                              >
                                {t("AccountSettings.phone")}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Dropdown
                                className="input-group "
                                isOpen={dropdownOpen}
                                toggle={toggle}
                                readOnly={true}
                              >
                                <DropdownToggle
                                  as="button"
                                  // disabled
                                  readOnly={true}
                                  className={`btn btn-light border arrow-none input-btnleft ${
                                    i18n.language === "ar"
                                      ? "input-btn-left"
                                      : "input-btn"
                                  }`}
                                >
                                <span className="countrylist-codeno text-muted">
                                  {seletedCountry?.code}
                                </span> 
                                </DropdownToggle>
                                <Input
                                  name="phone"
                                  type="text"
                                  className="form-control rounded-end flag-input  input-btn"
                                  placeholder={`${t("common.enter")} ${t("AccountSettings.phone")} ${t("common.placeholder")}`}
                                  title="phone"
                                  id="phone"
                                  onChange={(e) =>
                                    setFieldValue("phone", e.target.value)
                                  }
                                  value={values?.phone}
                                  onBlur={handleBlur}
                                />
                                <DropdownMenu
                                  as="ul"
                                  // disabled
                                  className={`list-unstyled w-25 dropdown-menu-list mb-0 input-btnleft ${
                                    i18n.language === "ar"
                                      ? "input-btn-left"
                                      : "input-btn"
                                  }`}
                                >
                                  <SimpleBar
                                    style={{ maxHeight: "220px" }}
                                    className="px-3"
                                  >
                                    {phoneCode?.map((item, key) => (
                                      <DropdownItem
                                        as="li"
                                        // disabled
                                        onClick={() => {
                                          setseletedCountry(item);
                                        }}
                                        key={key}
                                        className="dropdown-item d-flex"
                                      >
                                        <div className="flex-grow-1">
                                          <div className="d-flex">
                                            <div className="country-name me-1">
                                              {item?.code}
                                            </div>
                                          </div>
                                        </div>
                                      </DropdownItem>
                                    ))}
                                  </SimpleBar>
                                </DropdownMenu>
                              </Dropdown>
                              {touched?.phone && errors?.phone ? (
                                <div style={{ color: "red" }}>
                                  {errors?.phone}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Col>

                          {/* ------ الحالة ------ */}
                          <Col lg={4}>
                            <FormGroup>
                              <Label
                                htmlFor="status"
                              >
                                {t("common.status")}{" "}
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
                                id="status"
                                name="status"
                                placeholder={`${t("common.Select")} ${t("common.status")} ${t("common.placeholder")}`}    
                                options={Status}
                                getOptionLabel={(option) => option?.name}
                                getOptionValue={(option) => option?.id}
                                value={
                                  Status.find((option)=>{
                                    return  option?.value === values?.status?.value
                                  }) 
                                } 
                                onChange={(option) => {
                                  setFieldValue("status", option);
                                }}
                                onBlur={() => {
                                  setFieldTouched("status", true);
                                }}
                              />
                              {touched?.status && errors?.status ? (
                                <div style={{ color: "red" }}>
                                  {errors?.status}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Col>

                          {/* ------ ملاحظات ------ */}
                          <Col lg={12}>
                            <FormGroup>
                              <Label
                                htmlFor="Description"
                                className="form-label"
                              >
                                {t("common.Description")}{" "}
                              </Label>
                              <Input
                                type="textarea"
                                placeholder={`${t("common.enter")} ${t("common.Description")} ${t("common.placeholder")}`}
                                title={t("common.Description")}
                                name="Description"
                                id="Description"
                                onChange={(e) =>
                                  setFieldValue("Description", e.target.value)
                                }
                                value={values?.Description}
                                onBlur={handleBlur}
                              />
                              {touched?.Description && errors?.Description ? (
                                <div style={{ color: "red" }}>
                                  {errors?.Description}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
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
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
