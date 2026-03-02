import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Row } from 'reactstrap';
import Select from "react-select";
import SimpleBar from 'simplebar-react';
import phoneCodeData from "../../../../localesJson/PhoneCode.json";

export default function BasicInformation({
  values,
  handleBlur,
  setFieldValue,
  setFieldTouched,
  touched,
  errors,
  EducationalStages,
  Gender,
  Status,
}) {
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const phoneCode = phoneCodeData ?.phoneCodes || [];
  const [seletedCountry, setseletedCountry] = useState({
    id: 251,
    countryName: "Egypt",
    code: "+20",
  });
  const toggle = () => setDropdownOpen((prevState) => !prevState);



  // ________________________________________________________________________________________

  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <div className="sub-title">
            {t("common.Basic_information")}
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            {/* ------ اسم طالب ------ */}
            <Col lg={4}>
              <FormGroup>
                <Label
                  htmlFor="name"
                  className="form-label"
                >
                  {t("Student.student")}{" "}
                  <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder={`${t("common.enter")} ${t("Student.student")} ${t("common.placeholder")}`}
                  title={t("Student.student")}
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

            {/* ------ المراحل التعليمية ------ */}
            <Col lg={4}>
              <FormGroup>
                <Label
                  htmlFor="EducationalStages"
                  className="form-label"
                >
                  {t("Teacher.Educational_Stages")}{" "}
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
                  id="EducationalStages"
                  name="EducationalStages"
                  placeholder={`${t("common.Select")} ${t("Teacher.Educational_Stages")} ${t("common.placeholder")}`}    
                  options={EducationalStages}
                  getOptionLabel={(option) => option?.name}
                  getOptionValue={(option) => option?.id}
                  value={
                    EducationalStages?.find((option)=>{
                      return  option?.value === values?.EducationalStages?.value
                    }) 
                  } 
                  onChange={(option) => {
                    setFieldValue("EducationalStages", option);
                  }}
                  onBlur={() => {
                    setFieldTouched("EducationalStages", true);
                  }}
                  // isMulti
                  // isDisabled
                />
                {touched?.EducationalStages && errors?.EducationalStages ? (
                  <div style={{ color: "red" }}>
                    {errors?.EducationalStages}
                  </div>
                ) : null}
              </FormGroup>
            </Col>

            {/* ----------- رقم الهاتف ----------- */}
            <Col lg={4}>
              <FormGroup>
                <Label
                  htmlFor="phone"
                  className="form-label"
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

            {/* ----------- البريد الإلكتروني ----------- */}
            <Col lg={4}>
              <FormGroup>
                <Label
                  htmlFor="email"
                >
                  {t("Student.email")}
                  <span className="text-danger">*</span>
                </Label>
                <Input
                  type={"email"}
                  className="form-control pe5 password-input"
                  placeholder={`${t("common.enter")} ${t("Student.email")} ${t("common.placeholder")}`}
                  title={t("Student.email")}
                  id="email"
                  name="email"
                  onChange={(e) =>
                    setFieldValue("email", e.target.value)
                  }
                  value={values?.email}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email ? (
                  <div style={{ color: "red" }}>{errors.email}</div>
                ) : null}
              </FormGroup>
            </Col>

            {/* ------ النوع ------ */}
            <Col lg={4}>
              <FormGroup>
                <Label
                  htmlFor="Gender"
                  className="form-label"
                >
                  {t("common.Gender")}{" "}
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
                  id="Gender"
                  name="Gender"
                  placeholder={`${t("common.Select")} ${t("common.Gender")} ${t("common.placeholder")}`}    
                  options={Gender}
                  getOptionLabel={(option) => option?.name}
                  getOptionValue={(option) => option?.id}
                  value={
                    Gender?.find((option)=>{
                      return  option?.value === values?.Gender?.value
                    }) 
                  } 
                  onChange={(option) => {
                    setFieldValue("Gender", option);
                  }}
                  onBlur={() => {
                    setFieldTouched("Gender", true);
                  }}
                />
                {touched?.Gender && errors?.Gender ? (
                  <div style={{ color: "red" }}>
                    {errors?.Gender}
                  </div>
                ) : null}
              </FormGroup>
            </Col>
            
            {/* ------ الحالة ------ */}
            <Col lg={4}>
              <FormGroup>
                <Label
                  htmlFor="status"
                  className="form-label"
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
                    Status?.find((option)=>{
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
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
