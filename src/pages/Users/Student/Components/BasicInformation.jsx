import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Row } from 'reactstrap';
import Select from "react-select";
import SimpleBar from 'simplebar-react';
import phoneCodeData from "../../../../localesJson/PhoneCode.json";
import { ErrorMessage } from 'formik';

export default function BasicInformation({
  namePage,
  values,
  handleBlur,
  setFieldValue,
  setFieldTouched,
  touched,
  errors,
  EducationalStages,
  Gender,
  Status,
  language,
  disableEdit,
  loadingProfile,
  seletedCountry,
  setseletedCountry,
}) {
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const phoneCode = phoneCodeData ?.phoneCodes || [];
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [show, setShow] = useState(false);

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
                <div className='d-flex gap-2'>
                  <FormGroup>
                    <Input
                      type="text"
                      placeholder={`${t("common.enter")} ${t("common.first_name")} ${t("common.placeholder")}`}
                      title={t("common.first_name")}
                      name="first_name"
                      id="first_name"
                      onChange={(e) =>
                        setFieldValue("first_name", e.target.value)
                      }
                      value={values?.first_name}
                      onBlur={handleBlur}
                      disabled={disableEdit}
                    />
                    {touched?.first_name && errors?.first_name && (
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-danger"
                      />
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      placeholder={`${t("common.enter")} ${t("common.last_name")} ${t("common.placeholder")}`}
                      title={t("common.last_name")}
                      name="last_name"
                      id="last_name"
                      onChange={(e) =>
                        setFieldValue("last_name", e.target.value)
                      }
                      value={values?.last_name}
                      onBlur={handleBlur}
                      disabled={disableEdit}
                    />
                    {touched?.last_name && errors?.last_name && (
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-danger"
                      />
                    )}
                  </FormGroup>
                </div>
              </FormGroup>
            </Col>

            {/* ------ المراحل التعليمية ------ */}
            <Col lg={4}>
              <FormGroup>
                <Label
                  htmlFor="EducationalStages"
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
                  isDisabled={disableEdit}
                />
                {touched?.EducationalStages && errors?.EducationalStages && (
                  <ErrorMessage
                    name="EducationalStages"
                    component="div"
                    className="text-danger"
                  />
                )}
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
                    disabled={disableEdit}
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
                    disabled={disableEdit}
                  />
                  <DropdownMenu
                    as="ul"
                    disabled={disableEdit}
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
                          disabled={disableEdit}
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
                {touched?.phone && errors?.phone && (
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-danger"
                  />
                )}
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
                  disabled={disableEdit}
                />
                {touched.email && errors.email && (
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                )}
              </FormGroup>
            </Col>

            {/* ------ النوع ------ */}
            <Col lg={4}>
              <FormGroup>
                <Label
                  htmlFor="Gender"
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
                  isDisabled={disableEdit}
                />
                {touched?.Gender && errors?.Gender && (
                  <ErrorMessage
                    name="Gender"
                    component="div"
                    className="text-danger"
                  />
                )}
              </FormGroup>
            </Col>
            
              {/* ------ العمر ------ */}
              <Col lg={4}>
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
                    }}
                    value={values?.age}
                    onBlur={handleBlur}
                    maxLength={2}
                    onWheel={(e) => e.target.blur()}
                    disabled={disableEdit}
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
              <Col lg={4}>
                <FormGroup>
                  <Label
                    htmlFor="language"
                  >
                    {t("common.language")}{" "}
                    {namePage !== "add" && (
                      <span className="text-danger">*</span>
                    )}
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
                        return  option?.value === (values?.lang?.value ?? values?.lang)
                      }) 
                    } 
                    onChange={(option) => {
                      setFieldValue("lang", option?.value);
                    }}
                    onBlur={() => {
                      setFieldTouched("lang", true);
                    }}
                    isDisabled={namePage === "add" || disableEdit}
                  />
                  {touched?.lang && errors?.lang && (
                    <ErrorMessage
                      name="language"
                      component="div"
                      className="text-danger"
                    />
                  )}
                </FormGroup>
              </Col>

              {namePage === "add" ? <>
                  {/* ------ كلمة المرور ------ */}
                  <Col lg={4}>
                    <FormGroup>
                      <Label
                        htmlFor="password"
                        className="form-label"
                      >
                        {t("Registers.password")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <div className="position-relative auth-pass-inputgroup mb-3">
                        <Input
                          type={show ? "text" : "password"}
                          placeholder={`${t("common.enter")} ${t("Registers.password")} ${t("common.placeholder")}`}
                          name="password"
                          title="password"
                          id="password"
                          onChange={(e) =>
                            setFieldValue("password", e.target.value)
                          }
                          value={values?.password}
                          onBlur={handleBlur}
                        />
                        <button
                          className="btn btn-link position-absolute start0 end-0 top-0 text-decoration-none text-muted password-addon"
                          type="button"
                          id="password-addon"
                        >
                          <i
                            onClick={() => setShow(!show)}
                            className="ri-eye-fill align-middle"
                          ></i>
                        </button>
                        {touched?.password && errors?.password ? (
                          <div style={{ color: "red" }}>
                            {errors?.password}
                          </div>
                        ) : null}
                      </div>
                    </FormGroup>
                  </Col>
                </> : <>
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
                          Status?.find((option)=>{
                            return  option?.id === values?.status ?? values?.status?.id
                          }) 
                        } 
                        onChange={(option) => {
                          setFieldValue("status", option);
                        }}
                        onBlur={() => {
                          setFieldTouched("status", true);
                        }}
                        isDisabled={true}
                      />
                      {touched?.status && errors?.status && (
                        <ErrorMessage
                          name="status"
                          component="div"
                          className="text-danger"
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              }
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
