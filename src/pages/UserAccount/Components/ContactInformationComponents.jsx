import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Row } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import phoneCodeData from "../../../localesJson/PhoneCode.json";
import ButtonLoader from '../../../Components/Common/ButtonLoader';

export default function ContactInformationComponents({
  values,
  handleBlur,
  setFieldValue,
  touched,
  errors,
  loadingProfile,
}) {
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const phoneCode = phoneCodeData?.phoneCodes || [];
  const [seletedCountry, setseletedCountry] = useState({
    id: 251,
    countryName: "Egypt",
    code: "+20",
  });
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <React.Fragment>
      <Card className="">
        <div className="sub-title fs-24">
          {t("AccountSettings.Contact_information")}
        </div>
        <CardBody>
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
            </div>: (
              <Row>
                {/* ----------- البريد الإلكتروني ----------- */}
                <Col lg={4}>
                  <FormGroup className="mb-3">
                    <Label
                      className="form-label"
                      htmlFor="email"
                    >
                      {t("AccountSettings.email")}
                      <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type={"email"}
                      className="form-control pe5 password-input"
                      placeholder={`${t("common.enter")} ${t("AccountSettings.email")} ${t("common.placeholder")}`}
                      id="email"
                      title="email"
                      name="email"
                      onChange={(e) =>
                        setFieldValue("email", e.target.value)
                      }
                      value={values?.email}
                      onBlur={handleBlur}
                      // disabled={disableEdit}
                    />
                    {touched.email && errors.email ? (
                      <div style={{ color: "red" }}>{errors.email}</div>
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
              </Row>
            )}
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
