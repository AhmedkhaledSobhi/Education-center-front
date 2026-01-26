import React from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardBody, Col, FormGroup, Input, Label } from 'reactstrap'
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
  const country = CountryData
  const Region = RegionData;
  const city = CityData;
  return (
    <React.Fragment>
      <Card className="">
        <div className="sub-title fs-24">
          {t("AccountSettings.Address")}
        </div>
        <CardBody>
          {/* ----------- العنوان ----------- */}
          <Col lg={4}>
            <FormGroup className="mb-3">
              <Label
                className="form-label"
                htmlFor="address"
              >
                {t("AccountSettings.Address")}
              </Label>
              <Input
                type="text"
                className="form-control password-input"
                placeholder={`${t("common.enter")} ${t("AccountSettings.Address")} ${t("common.placeholder")}`}
                id="address"
                title="address"
                name="address"
                onChange={(e) =>
                  setFieldValue("address", e.target.value)
                }
                value={values?.address}
                onBlur={handleBlur}
                // disabled={disableEdit}
              />
            </FormGroup>
          </Col>

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
                  id="choices-publish-status-input"
                  placeholder={t(
                    "AccountSettings.countryPlaceholder"
                  )}
                  options={country}
                  // value={country?.find(
                  //   (option) => option?.id == values?.country?.id
                  // )}
                  getOptionLabel={(option) => option?.name}
                  getOptionValue={(option) => option?.id}
                  onChange={(selectedOption) => {
                    setFieldValue("country", selectedOption?.id);
                    setFieldValue("region", null);
                    setFieldValue("city", null);
                    // setCityIdLoaded(selectedOption?.id);
                    // getDistrict(selectedOption?.id);
                  }}
                  onBlur={handleBlur("country")}
                  // isLoading={countryLoad}
                  isClearable
                />
                {touched?.country && errors?.country ? (
                  <div style={{ color: "red" }}>
                    {errors?.country}
                  </div>
                ) : null}
              </div>
            </FormGroup>
          </Col>

          {/* ----------- المنطقة ----------- */}
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
                  id="choices-publish-status-input"
                  placeholder={t("AccountSettings.RegionPlaceholder")}
                  options={Region}
                  getOptionLabel={(option) => option?.name}
                  getOptionValue={(option) => option?.id}
                  onChange={(selectedOption) => {
                    setFieldValue("region", selectedOption?.id);
                    setFieldValue("city", null);
                    // getCity(cityIdLoaded, selectedOption?.id);
                    // setCityDataLoaded(true);
                  }}
                  // value={Region?.find(
                  //   (option) => option?.id == values?.region?.id
                  // )}
                  onBlur={handleBlur("region")}
                  // isLoading={districtLoad}
                  isClearable
                />
                {touched?.region && errors?.region ? (
                  <div style={{ color: "red" }}>{errors?.region}</div>
                ) : null}
              </div>
            </FormGroup>
          </Col>

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
                id="choices-publish-status-input"
                placeholder={t("AccountSettings.cityPlaceholder")}
                options={city}
                getOptionLabel={(option) => option?.name}
                getOptionValue={(option) => option?.id}
                onChange={(selectedOption) => {
                  setFieldValue("city", selectedOption?.id);
                }}
                // value={city?.find(
                //   (option) => option?.id == values?.city?.id
                // )}
                // isDisabled={disableEdit}
                onBlur={handleBlur("city")}
                isClearable
                // isLoading={cityLoad}
              />
              {touched?.city && errors?.city ? (
                <div style={{ color: "red" }}>{errors?.city}</div>
              ) : null}
            </FormGroup>
          </Col>
          
          {/* ----------- عنوان إضافي ----------- */}
          <Col lg={8}>
            <FormGroup className="mb-3">
              <Label
                className="form-label"
                htmlFor="additional_address"
              >
                {t("AccountSettings.AdditionalAddress")}
              </Label>
                <Input
                  type="text"
                  className="form-control password-input"
                  placeholder={t(
                    "AccountSettings.YouCanAddAnotherAddressHere"
                  )}
                  id="additional_address"
                  title="additional_address"
                  name="additional_address"
                  onChange={(e) =>
                    setFieldValue(
                      "additional_address",
                      e.target.value
                    )
                  }
                  onBlur={handleBlur}
                  // disabled={disableEdit}
                  value={values?.additional_address}
                />
            </FormGroup>
          </Col>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
