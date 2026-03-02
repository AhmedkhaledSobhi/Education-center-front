import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Row } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import phoneCodeData from "../../../../localesJson/PhoneCode.json";

export default function ParentInformation({
  values,
  handleBlur,
  setFieldValue,
  setFieldTouched,
  touched,
  errors
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

  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <div className="sub-title">
            {t("common.Parent_Information")}
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            {/* ------ اسم الوالد ------ */}
            <Col lg={4}>
              <FormGroup>
                <Label
                  htmlFor="FatherName"
                >
                  {t("Student.Father_name")}{" "}
                  {["primary", "middle", "high"].includes(values?.EducationalStages?.value) && (
                    <span className="text-danger">*</span> 
                  )}
                </Label>
                <Input
                  type="text"
                  placeholder={`${t("common.enter")} ${t("Student.Father_name")} ${t("common.placeholder")}`}
                  title={t("Student.Father_name")}
                  name="FatherName"
                  id="FatherName"
                  onChange={(e) =>
                    setFieldValue("FatherName", e.target.value)
                  }
                  value={values?.FatherName}
                  onBlur={handleBlur}
                />
                {touched?.FatherName && errors?.FatherName ? (
                  <div style={{ color: "red" }}>
                    {errors?.FatherName}
                  </div>
                ) : null}
              </FormGroup>
            </Col>

            {/* ----------- رقم الهاتف ----------- */}
            <Col lg={4}>
              <FormGroup>
                <Label
                  htmlFor="FatherPhone"
                >
                  {t("Student.phoneNumber")}{" "}
                  {["primary", "middle", "high"].includes(values?.EducationalStages?.value) && (
                    <span className="text-danger">*</span> 
                  )}
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
                    type="text"
                    className="form-control rounded-end flag-input  input-btn"
                    placeholder={`${t("common.enter")} ${t("Student.phoneNumber")} ${t("common.placeholder")}`}
                    title={t("Student.phoneNumber")}
                    name="FatherPhone"
                    id="FatherPhone"
                    onChange={(e) =>
                      setFieldValue("FatherPhone", e.target.value)
                    }
                    value={values?.FatherPhone}
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
                {touched?.FatherPhone && errors?.FatherPhone ? (
                  <div style={{ color: "red" }}>
                    {errors?.FatherPhone}
                  </div>
                ) : null}
              </FormGroup>
            </Col>

            {/* ----------- البريد الإلكتروني ----------- */}
            <Col lg={4}>
              <FormGroup>
                <Label
                  htmlFor="FatherEmail"
                >
                  {t("AccountSettings.email")}
                  {["primary", "middle", "high"].includes(values?.EducationalStages?.value) && (
                    <span className="text-danger">*</span> 
                  )}
                </Label>
                <Input
                  type="email"
                  className="form-control pe5 password-input"
                  placeholder={`${t("common.enter")} ${t("Student.email")} ${t("common.placeholder")}`}
                  id="FatherEmail"
                  title={t("Student.email")}
                  name="FatherEmail"
                  onChange={(e) =>
                    setFieldValue("FatherEmail", e.target.value)
                  }
                  value={values?.FatherEmail}
                  onBlur={handleBlur}
                />
                {touched.FatherEmail && errors.FatherEmail ? (
                  <div style={{ color: "red" }}>{errors.FatherEmail}</div>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
