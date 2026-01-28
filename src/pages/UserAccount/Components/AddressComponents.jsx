import React from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardBody, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import Select from "react-select";
import CountryData from "../../../localesJson/Country.json";
import RegionData from "../../../localesJson/Region.json";
import CityData from "../../../localesJson/City.json";

export default function AddressComponents({
  values,
  handleBlur,
  setFieldValue,
  touched,
  errors
}) {
  const { t, i18n } = useTranslation();
  const country = CountryData?.countries
  const Regions = RegionData?.regions.filter((region)=> region?.country_id === (values?.country?.id ?? values?.country) )
  const citys = CityData?.cities.filter((city)=> city?.country_id === (values?.country?.id ?? values?.country) && city?.region_id === values?.region?.id)

  return (
    <React.Fragment>
      <Card className="">
        <div className="sub-title fs-24">
          {t("AccountSettings.Address")}
        </div>
        <CardBody>
          <Row>
            {/* ----------- الدولة ----------- */}
            <Col lg={4}>
              <FormGroup className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="country"
                >
                  {t("AccountSettings.country")}
                  <span className="text-danger">*</span>
                </Label>
                <div className="position-relative mb-3">
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
                    name="country"
                    className="js-example-basic-single w-100"
                    id="country"
                    placeholder={`${t("common.Select")} ${t("AccountSettings.country")} ${t("common.placeholder")}`}
                    options={country}
                    value={country?.find(
                      (option) => option?.id == values?.country?.id
                    )}
                    getOptionLabel={(option) => option?.name}
                    getOptionValue={(option) => option?.id}
                    onChange={(selectedOption) => {
                      setFieldValue("country", selectedOption?.id);
                      setFieldValue("region", null);
                      setFieldValue("city", null);
                    }}
                    onBlur={handleBlur("country")}
                    isDisabled
                  />
                  {touched?.country && errors?.country ? (
                    <div style={{ color: "red" }}>
                      {errors?.country}
                    </div>
                  ) : null}
                </div>
              </FormGroup>
            </Col>

            {/* ----------- المحافظه ----------- */}
            <Col lg={4}>
              <FormGroup className="mb-3">
                <Label
                  htmlFor="region"
                  className="form-label"
                >
                  {t("AccountSettings.Region")}
                  <span className="text-danger">*</span>
                </Label>
                <div className="position-relative mb-3">
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
                    name="region"
                    className="js-example-basic-single w-100"
                    id="region"
                    placeholder={`${t("common.Select")} ${t("AccountSettings.Region")} ${t("common.placeholder")}`}
                    options={Regions}
                    getOptionLabel={(option) => option?.name}
                    getOptionValue={(option) => option?.id}
                    onChange={(selectedOption) => {
                      setFieldValue("region", selectedOption);
                      setFieldValue("city", null);
                    }}
                    value={Regions?.find(
                      (option) => option?.id === values?.region?.id
                    )}
                    onBlur={handleBlur("region")}
                    isDisabled={values?.country== undefined}
                    isClearable
                  />
                  {touched?.region && errors?.region ? (
                    <div style={{ color: "red" }}>{errors?.region}</div>
                  ) : null}
                </div>
              </FormGroup>
            </Col>
            {console.log("ahmed values", values)}
            {/* ----------- المدينه ----------- */}
            <Col lg={4}>
              <FormGroup className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="city"
                >
                  {t("AccountSettings.city")}
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
                  name="city"
                  className="js-example-basic-single w-100"
                  id="city"
                  placeholder={`${t("common.Select")} ${t("AccountSettings.city")} ${t("common.placeholder")}`}
                  options={citys}
                  getOptionLabel={(option) => option?.name}
                  getOptionValue={(option) => option?.id}
                  onChange={(selectedOption) => {
                    setFieldValue("city", selectedOption);
                  }}
                  value={citys?.find(
                    (option) => option?.id == values?.city
                  )}
                  onBlur={handleBlur("city")}
                  isDisabled={!values?.country || !values?.region}
                  isClearable
                />
                {touched?.city && errors?.city ? (
                  <div style={{ color: "red" }}>{errors?.city}</div>
                ) : null}
              </FormGroup>
            </Col>
            
            {/* ----------- عنوان إضافي ----------- */}
            <Col lg={12}>
              <FormGroup className="mb-3">
                <Label
                  className="form-label"
                  htmlFor="additional_address"
                >
                  {t("AccountSettings.additional_address")}
                </Label>
                <Input
                  type="text"
                  className="form-control password-input"
                  placeholder={`${t("common.enter")} ${t("AccountSettings.additional_address")} ${t("common.placeholder")}`}
                  id="address"
                  // title="address"
                  name="address"
                  onChange={(e) =>
                    setFieldValue(
                      "address",
                      e.target.value
                    )
                  }
                  onBlur={handleBlur}
                  // disabled={disableEdit}
                  value={values?.address}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
