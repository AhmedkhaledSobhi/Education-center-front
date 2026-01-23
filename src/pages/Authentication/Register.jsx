import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import i18next from "i18next";
import { data, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";

import { hasEmptyValue } from '../../helpers';
import MySVG from '../../SVG/SVGIcons';
import Select from "react-select";
import ButtonLoader from '../../Components/Common/ButtonLoader';
import axios from "axios";
import configService from '../../helpers/config';
import { toast } from 'react-toastify';
import SimpleBar from "simplebar-react";
import phoneCodeData from "./PhoneCode.json";
import { REGISTER } from '../../helpers/url_helper';

export default function Register() {
  const { t, i18n } = useTranslation();
  const navigate= useNavigate()
  document.title = t("Registers.new_account_Centers_Education");
  const phoneCode = phoneCodeData?.phoneCodes || [];
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginType, setLoginType] = useState("TEACHER");
  const [lang, setLang] = useState(
    localStorage.getItem("I18N_LANGUAGE") || i18n.language || "en"
  );
  const [seletedCountry, setseletedCountry] = useState({
    id: 251,
    countryName: "Egypt",
    code: "+20",
  });
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Account_type =[
    {name: t("Registers.Teacher") , id: 1, value:"TEACHER"},
    {name: t("Registers.Student") , id: 2, value:"STUDENT"},
    {name: t("Registers.Employee") , id: 3, value:"EMPLOYEE"},
    {name: t("Registers.Assistant") , id: 4, value:"ASSISTANT"},
  ]
// ______________________________________________________________

  const loginToken = JSON.parse(localStorage.getItem("access_token"));

  const changeLanguageAction = (lang) => {
    i18n.changeLanguage(lang);
    i18next.changeLanguage(lang);
    localStorage.setItem("I18N_LANGUAGE", lang);
    setLang(lang)
  };

// ______________________________________________________________

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    age: "",
    password: "",
    email: "",
    password_confirmation: "",
    role: "",
    address: "",
  });

// ______________________________________________________________
  
  const register = async (values) => {
    try {
      const { password_confirmation, ...payload } = values;
      // تحويل role من object لـ string
      if (payload.role && payload.role.value) {
        payload.role = payload.role.value;
      }
      
      payload.phone = `(${seletedCountry?.code})${payload.phone}`;
      payload.age = parseInt(payload.age);
      payload.image_path = "null";

      const BASE_URL = configService.apiBaseUrl;
      const res = await axios.post(`${BASE_URL}${REGISTER}`, payload, {
        headers: {
          "Content-Type": "application/json",
          // lang: i18n.language,
        },
      });

      if (res && res?.status) {
        toast.success(res?.data?.message, {
          position: "top-center",
          hideProgressBar: false,
          autoClose: 3000,
          progress: undefined,
        });
        // store in session for 5 minutes
        localStorage.setItem("authUser", JSON.stringify(res?.data?.data?.info));
        localStorage.setItem("access_token", JSON.stringify(res?.data?.data?.token));
        localStorage.setItem("I18N_LANGUAGE", lang);

        const authUser = JSON.parse(localStorage.getItem("authUser"));
        const accessToken = JSON.parse(localStorage.getItem("access_token"));
        const loginToken = accessToken || authUser?.data?.token;
        const idUser = authUser?.id

        if (loginToken) {
          axios.defaults.headers.common["Authorization"] =
            `Bearer ${loginToken}`;
          axios.defaults.headers.common["login-type"] = loginType;
          
          const id = idUser;
          try {
            const response = await axios.get(`${BASE_URL}auth/${id}`);
            localStorage.setItem("myInfo", JSON.stringify(response?.data));
            localStorage.setItem("loginType", JSON.stringify(response?.data?.role));
          } catch (error) {
            console.error(error.response?.data || error.message);
          }
        }
        navigate("/Home")
      }

    } catch (error){
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        hideProgressBar: false,
        autoClose: 3000,
        progress: undefined,
        toastId: "",
      });
    }
  }
// ______________________________________________________________

  useEffect(() => {
    if (loginToken) {
      navigate("/");
    }
  }, []);

  return (
    <React.Fragment>
      <Row className="justify-content-center align-items-center mx-0 my-5">
        <Card className='border -info rounded-5' style={{
          width: "85%"
        }}>
          <CardBody className='p-0'>
            <Row>
              <Col xxl={5} className={`bg-primary ${i18n.language == "ar" ? "offset-1" : ""} `}
                style={{
                  display:"flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: i18n.language == "ar" ? "50%  0px 0px 50%" :"0%  50% 50% 0%"
                }}
              >
                <div className='d-flex align-items-center align-content-center justify-content-center'>
                  <div>
                    <h4 className={`card-title mb-4 text-white ${ i18n.language == "ar" ? "ps-5" : "pe-5"}`}>{t("Registers.Register")}</h4>
                    <h2 className={`title text-white ${ i18n.language == "ar" ? "ps-5" : "pe-5"}`}>
                      👋 {t("common.Welcome_to")}  <br />
                      <span dir={i18n.language !== "en" ? "ltr": "rtl"}>
                        {t("Registers.Center_Education")} 
                      </span>
                    </h2>
                    <div className='w-100'>
                      <img 
                        src={MySVG.CenterEducation} 
                        style={{
                          width: "100%",
                          borderRadius: "4%"
                        }} 
                        alt="center Education" 
                      />
                    </div>
                    <h4  className={`card-title mb-0 text-white ${ i18n.language == "ar" ? "ps-5" : "pe-5"}`}
                      style={{
                        cursor:"pointer",
                        display: "flex"
                      }}
                      onClick={()=>{
                        navigate("/login")
                      }}
                    >
                      {t("Registers.Login")}
                       <i
                        className={`fs-3 ${
                          i18n.dir() === "rtl"
                            ? "ri-arrow-left-s-line"
                            : "ri-arrow-right-s-line"
                        }`}
                      ></i>
                    </h4>

                  </div>
                </div>
              </Col>
              
              <Col xxl={6} className={`px-5 py-3 pb-0 mb-0 ${i18n.language == "en" ? "offset-1" : "" }`}>
                <div
                  className="text-end mx-2 mt-sm -2 mb- 1 mb4  text-muted d-flex justify-content-end align-items-center"
                  onClick={() => navigate("/login")}
                  role="button"
                >
                  <p className="fs-3 pe-1 my-2">{t("common.Back")}</p>
                  <i
                    className={`fs-3 ${
                      i18n.dir() === "rtl"
                        ? "ri-arrow-left-s-line"
                        : "ri-arrow-right-s-line"
                    }`}
                  ></i>
                </div>
                <div className="px-lg-0 p-lg-4 mb- 2 ">
                  <div>
                    <h3 className="text-primary fs-3 mb- 2">
                      {t("Registers.new_account_Centers_Education")}
                    </h3>
                  </div>
                </div>
                {/* ---- form ---- */}
                <div className="mt-2">
                  <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={Yup.object({
                      first_name: Yup.string().required(
                        `${t("Registers.first_Name")} ${t("common.required")}`
                      ),
                      last_name: Yup.string().required(
                        `${t("Registers.last_Name")} ${t("common.required")}`
                      ),
                      age: Yup.number()
                        .typeError(t("common.numbers_Only"))   // لو كتب حروف
                        .required(`${t("Registers.age")} ${t("common.required")}`)
                        .min(5, t("common.minAge"))           // أقل عمر
                        .max(99, t("common.maxAge")),
                      role: Yup.object().nullable().required(
                        `${t("Registers.Account_type")} ${t("common.required")}`
                      ),
                      address: Yup.string().required(
                        `${t("Registers.address")} ${t("common.required")}`
                      ),
                      email: Yup.string()
                        .email(t("Registers.EmailIncorrect"))
                        .matches(
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          t("Registers.EmailIncorrect")
                        )
                        .required(t("Registers.EmailRequired")),
                      phone: Yup.string()
                          .required(t("Registers.mobileNumberValidation"))
                          .matches(
                            /^01\d{9}$/,
                            t("Registers.enterSaudiCorrectNumber")
                          ),
                      password: Yup.string()
                        .required(t("Registers.passwordValidation"))
                        .min(6, t("Registers.passwordMinLength")),
                      password_confirmation: Yup.string()
                        .oneOf(
                          [Yup.ref("password"), null],
                          t("Registers.PasswordDoesNotmatch")
                        )
                        .required(
                          t("Registers.PasswordConfirmationRequired")
                        ),
                    })}

                    onSubmit={async (values, { resetForm }) => {
                      setLoading(true);
                      try {
                        const payload  = {
                          ...values,
                        }
                        setLoading(true);
                        await register(payload);
                      } catch (err) {                        
                        toast.error(err, {
                          position: "top-center",
                          hideProgressBar: false,
                          autoClose: 3000,
                          progress: undefined,
                          toastId: "",
                        });
                      }finally {
                        setLoading(false);
                      }
                    }}
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
                    }) => (
                      <form
                        onSubmit={handleSubmit}
                      >
                        <Row>
                          {/* ------ الاسم الاول ------ */}
                          <Col lg={6}>
                            <FormGroup>
                              <Label
                                htmlFor="first_name"
                                className="form-label"
                              >
                                {t("Registers.first_Name")}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="text"
                                placeholder={`${t("common.enter")} ${t("Registers.first_Name")} ${t("common.placeholder")}`}
                                name="first_name"
                                title="first_name"
                                id="first_name"
                                onChange={(e) =>
                                  setFieldValue("first_name", e.target.value)
                                }
                                value={values?.first_name}
                                onBlur={handleBlur}
                              />
                              {touched?.first_name && errors?.first_name ? (
                                <div style={{ color: "red" }}>
                                  {errors?.first_name}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Col>

                          {/* ------ الاسم الاخير  ------ */}
                          <Col lg={6}>
                            <FormGroup>
                              <Label
                                htmlFor="last_name"
                                className="form-label"
                              >
                                {t("Registers.last_Name")}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                name="last_name"
                                type="text"
                                placeholder={`${t("common.enter")} ${t("Registers.last_Name")} ${t("common.placeholder")}`}
                                title="last_name"
                                id="last_name"
                                onChange={(e) =>
                                  setFieldValue("last_name", e.target.value)
                                }
                                value={values?.last_name}
                                onBlur={handleBlur}
                              />
                              {touched?.last_name && errors?.last_name ? (
                                <div style={{ color: "red" }}>
                                  {errors?.last_name}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Col>

                          {/* ------ البريد الالكتروني ------ */}
                          <Col lg={12}>
                            <FormGroup>
                              <Label
                                htmlFor="email"
                                className="form-label"
                              >
                                {t("Registers.email")}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                name="email"
                                type="email"
                                placeholder={`${t("common.enter")} ${t("Registers.email")} ${t("common.placeholder")}`}
                                title="email"
                                id="email"
                                onChange={(e) =>
                                  setFieldValue("email", e.target.value)
                                }
                                value={values?.email}
                                onBlur={handleBlur}
                              />
                              {touched?.email && errors?.email ? (
                                <div style={{ color: "red" }}>
                                  {errors?.email}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Col>

                          {/* ------ نوع الحساب ------ */}
                          <Col lg={6}>
                            <FormGroup>
                              <Label
                                htmlFor="role"
                                className="form-label"
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
                                    return values?.role
                                  }) 
                                } 
                                onChange={(option) => {
                                  setFieldValue("role", option);
                                }}
                                onBlur={() => {
                                  setFieldTouched("role", true);
                                }}
                              />
                              {touched?.role && errors?.role ? (
                                <div style={{ color: "red" }}>
                                  {errors?.role}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Col>

                          {/* ------ العمر ------ */}
                          <Col lg={6}>
                            <FormGroup>
                              <Label
                                htmlFor="age"
                                className="form-label"
                              >
                                {t("Registers.age")}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                name="age"
                                type="text"
                                placeholder={`${t("common.enter")} ${t("Registers.age")} ${t("common.placeholder")}`}
                                title="age"
                                id="age"
                                onChange={(e) =>{
                                  const value = e.target.value.replace(/\D/g, "");
                                  setFieldValue("age", value)
                                  // setFieldValue("age", e.target.value)
                                }}
                                value={values?.age}
                                onBlur={handleBlur}
                                maxLength={2}
                              />
                              {touched?.age && errors?.age ? (
                                <div style={{ color: "red" }}>
                                  {errors?.age}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Col>

                          {/* ------ رقم الهاتف ------ */}
                          <Col lg={12}>
                            <FormGroup>
                              <Label
                                htmlFor="phone"
                                className="form-label"
                              >
                                {t("Registers.phone")}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Dropdown
                                className="input-group "
                                isOpen={dropdownOpen}
                                toggle={toggle}
                                readonly
                                isReadonly
                              >
                                <DropdownToggle
                                  as="button"
                                  // disabled
                                  readonly
                                  isReadonly
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
                                  placeholder={`${t("common.enter")} ${t("Registers.phone")} ${t("common.placeholder")}`}
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
                                  className={`list-unstyled w-100 dropdown-menu-list mb-0 input-btnleft ${
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

                          {/* ------ العنوان ------ */}
                          <Col lg={12}>
                            <FormGroup>
                              <Label
                                htmlFor="address"
                                className="form-label"
                              >
                                {t("Registers.address")}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                                <Input
                                  name="address"
                                  type="text"
                                  placeholder={`${t("common.enter")} ${t("Registers.address")} ${t("common.placeholder")}`}
                                  title="address"
                                  id="address"
                                  onChange={(e) =>
                                    setFieldValue("address", e.target.value)
                                  }
                                  value={values?.address}
                                  onBlur={handleBlur}
                                />
                                {touched?.address && errors?.address ? (
                                  <div style={{ color: "red" }}>
                                    {errors?.address}
                                  </div>
                                ) : null}
                              </FormGroup>
                          </Col>

                          {/* ------ كلمة المرور ------ */}
                          <Col lg={6}>
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

                          {/* ------ تاكيد كلمة المرور ------ */}
                          <Col lg={6}>
                            <FormGroup>
                              <Label
                                htmlFor="password_confirmation"
                                className="form-label"
                              >
                                {t("Registers.confirm_Password")}{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <div className="position-relative auth-pass-inputgroup mb-3">
                                <Input
                                  type={showConfirm ? "text" : "password"}
                                  placeholder={`${t("common.enter")} ${t("Registers.confirm_Password")} ${t("common.placeholder")}`}
                                  name="password_confirmation"
                                  title="password_confirmation"
                                  id="password_confirmation"
                                  onChange={(e) =>
                                    setFieldValue("password_confirmation", e.target.value)
                                  }
                                  value={values?.confirm_Password}
                                  onBlur={handleBlur}
                                />
                                <button
                                  className="btn btn-link position-absolute start0 end-0 top-0 text-decoration-none text-muted password-addon"
                                  type="button"
                                  id="password-addon"
                                >
                                  <i
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="ri-eye-fill align-middle"
                                  ></i>
                                </button>
                                {touched?.password_confirmation && errors?.password_confirmation ? (
                                  <div style={{ color: "red" }}>
                                    {errors?.password_confirmation}
                                  </div>
                                ) : null}
                              </div>
                            </FormGroup>
                          </Col>

                          <Col lg={12}>
                            <div className="mt-4 w-50 mx-auto">
                              <Button
                                color="primary"
                                className="w-100 d-flex align-items-center justify-content-center"
                                disabled={
                                  loading ||
                                  hasEmptyValue(values)
                                }
                                type="submit"
                              >
                                {loading ? (
                                  <ButtonLoader />
                                ) : (
                                  <>{t("Registers.sign_new_account")}</>
                                )}
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </form>
                    )}
                  </Formik>
                </div>
                <div className="text-center my-4 align-items-center">
                  <p
                    className={`mb-0 d-flex justify-content-center fw-semibold cursor-pointer ms-1 ${i18n.language == "ar" ? "text-success" : "text-muted"}`}
                  >
                    {" "}
                    <span
                      className="mx-3"
                      onClick={() => changeLanguageAction("ar")}
                    >
                      العربية
                    </span>
                    {"  "}
                    <p
                      className={`fw-semibold  ms-1 ${i18n.language == "en" ? "text-success" : "text-muted"}`}
                      >
                      {" "}
                      <span className='text-muted'>

                      |{" "}
                      </span>
                      <span
                        className="mx-3 curso"
                        onClick={() => changeLanguageAction("en")}
                      >
                        English
                      </span>
                    </p>{" "}
                  </p>
                </div>
                <div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Row>

    </React.Fragment>
  )
}
