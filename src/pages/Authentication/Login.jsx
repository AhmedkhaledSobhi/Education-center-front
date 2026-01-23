import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18next from "i18next";
import { Button, Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Row } from 'reactstrap';
import * as Yup from "yup";
import image from '../../assets/images/CenterEducation2.png'
import { hasEmptyValue } from '../../helpers';
import MySVG from '../../SVG/SVGIcons';
import ButtonLoader from '../../Components/Common/ButtonLoader';
import SimpleBar from 'simplebar-react';
import phoneCodeData from "./PhoneCode.json";
import { toast } from 'react-toastify';
import { LOGIN, PROFILE, } from '../../helpers/url_helper';
import configService from '../../helpers/config';
import axios from "axios";
import { profile } from '../../helpers/fakebackend_helper';

export default function Login() {
  const { t, i18n } = useTranslation();
  document.title = t("Registers.Log_in_to_Centers_Education");
  const navigate= useNavigate()
  const phoneCode = phoneCodeData?.phoneCodes || [];
  const [phoneLogin, setPhoneLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [loginType, setLoginType] = useState("TEACHER");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [lang, setLang] = useState(
    localStorage.getItem("I18N_LANGUAGE") || i18n.language || "en"
  );
  const [seletedCountry, setseletedCountry] = useState({
    id: 251,
    countryName: "Egypt",
    code: "+20", 
  });
  // ______________________________________________________________

  const loginToken = JSON.parse(localStorage.getItem("access_token"));

  const changeLanguageAction = (lang) => {
    i18n.changeLanguage(lang);
    i18next.changeLanguage(lang);
    localStorage.setItem("I18N_LANGUAGE", lang);
    setLang(lang)
  };
  // ______________________________________________________________

  const login = async (values) => {
    try {
      const {...payload } = values;
      
      // تعديل رقم الهاتف والعمر
      if (phoneLogin) payload.phone = `(${seletedCountry?.code})${payload.phone}`;
 
      const BASE_URL = configService.apiBaseUrl;
      const res = await axios.post(`${BASE_URL}${LOGIN}`, payload, {
        headers: {
          "Content-Type": "application/json",
          // lang: i18n.language,
        },
      });

      if (res && res) {
        toast.success(res?.message, {
          position: "top-center",
          hideProgressBar: false,
          autoClose: 3000,
          progress: undefined,
        });
        
        // store in session for 5 minutes
        localStorage.setItem("role", JSON.stringify(res?.data?.user));
        localStorage.setItem("authUser", JSON.stringify(res?.data?.user));
        sessionStorage.setItem("authUser", JSON.stringify(res?.data?.user));

        localStorage.setItem("userInfo", JSON.stringify(res?.data?.user));
        localStorage.setItem("access_token", JSON.stringify(res?.data?.access_token));
        localStorage.setItem("I18N_LANGUAGE", lang);

        const authUser = JSON.parse(localStorage.getItem("authUser"));
        const accessToken = JSON.parse(localStorage.getItem("access_token"));
        const loginToken = accessToken;
        const idUser = authUser?.id

        if (loginToken) {
          axios.defaults.headers.common["Authorization"] =
            `Bearer ${loginToken}`;
          axios.defaults.headers.common["login-type"] = loginType;

          const id = idUser;
          try {
            const response = await axios.get(`${BASE_URL}${PROFILE}${id}`);
            localStorage.setItem("myInfo", JSON.stringify(response));
            localStorage.setItem("loginType", JSON.stringify(response?.role));
            navigate("/Home")
          } catch (error) {
            console.error(error.response?.data || error.message);
          }
        }

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
      <Row className="justify-content-center align-items-center mx-0 mt-4 vh- 100 ">
        <Card className='border -info rounded-5 p- 4' style={{
          width: "85%"
        }}>
          <CardBody className='p-0'>
            <Row>
              <Col xxl={5} className={`bg-primary pt-5 ${i18n.language == "ar" ? "offset-1" : ""} `}
                style={{
                  borderRadius: i18n.language == "ar" ? "50%  0px 0px 50%" :"0%  50% 50% 0%"
                }}
              >
                <div className='d-flex align-items-center align-content-center justify-content-center'>
                  <div>
                    <h4 className={`card-title mb-4 text-white ${ i18n.language == "ar" ? "ps-5" : "pe-5"}`}>{t("Registers.Login")}</h4>
                    <h2 className={`title text-white ${ i18n.language == "ar" ? "ps-5" : "pe-5"}`}>
                      👋 {t("common.Welcome_to")}  <br />
                      <span dir={i18n.language !== "en" ? "ltr": "rtl"}>
                        {t("Registers.Center_Education")} 
                      </span>
                    </h2>
                    <div className='w-100'>
                      <img src={MySVG.CenterEducation} style={{
                        width: "100%",
                        borderRadius: "4%"
                      }} alt="center Education" />
                    </div>
                    <h4  className={`card-title mb-5 text-white ${ i18n.language == "ar" ? "ps-5" : "pe-5"}`}
                      style={{
                        cursor:"pointer",
                        display: "flex"
                      }}
                      onClick={()=>{
                        navigate("/register")
                      }}
                    >
                      {t("Registers.Register")}
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
              
              <Col xxl={6} className={`px-5 py-3 my-4 ${i18n.language == "en" ? "offset-1" : "" }`}>
                <div
                  className="text-end mx-2 mt-sm-2 mb-1 mb4  text-muted d-flex justify-content-end align-items-center"
                  onClick={() => navigate("/register")}
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
                <div className="px-lg-0 p-lg-4 mb-2 ">
                  <div>
                    
                    <h3 className="text-primary fs-3 mb-2">
                      {t("Registers.Log_in_to_Centers_Education")}
                    </h3>
                  </div>
                </div>
                {/* ---- form ---- */}
                <div className="mt-2">
                  {phoneLogin ? (
                    <Formik
                      initialValues={{
                        phone: "",
                        password: "",
                      }}
                      enableReinitialize={true}
                      validationSchema={Yup.object({
                        phone: Yup.string()
                            .required(t("Registers.mobileNumberValidation"))
                            .matches(
                              /^01\d{9}$/,
                              t("Registers.enterSaudiCorrectNumber")
                            ),
                        password: Yup.string()
                          .required(t("Registers.passwordValidation"))
                          .min(6, t("Registers.passwordMinLength")),
                      })}

                      onSubmit={async (values, { resetForm }) => {
                        setLoading(true);
                        try {
                          const payload  = {
                            ...values,
                          }
                          setLoading(true);
                          await login(payload);
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
                        resetForm,

                      }) => (
                        <>
                          <form
                            onSubmit={handleSubmit}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                              }
                            }}
                          >
                            <Row>
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

                              {/* ------ كلمة المرور ------ */}
                              <Col lg={12}>
                                <FormGroup className="mb-3">
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
                                      <>{t("Registers.Login")}</>
                                    )}
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </form>
                          <div className="text-center mt-4"
                            disabled={true} >
                            {phoneLogin ? (
                              <p
                                className=" text-primary"
                                role="button"
                                onClick={() => {
                                  resetForm();
                                  // setPhoneLogin(false);
                                }}
                                disabled={true}
                              >
                                {t("Registers.loginByEmail")}
                              </p>
                            ) : (
                              <p
                                className=" text-primary"
                                role="button"
                                onClick={() => {
                                  resetForm();
                                  // setPhoneLogin(true);
                                }}
                                disabled={true}
                              >
                                {t("Registers.LoginByMobile")}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </Formik>
                    ) : (
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      enableReinitialize={true}
                      validationSchema={Yup.object({
                        email: Yup.string()
                          .email(t("Registers.EmailIncorrect"))
                          .matches(
                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            t("Registers.EmailIncorrect")
                          )
                          .required(t("Registers.EmailRequired")),
                        password: Yup.string()
                          .required(t("Registers.passwordValidation"))
                          .min(6, t("Registers.passwordMinLength")),
                      })}
                      onSubmit={async (values, { resetForm }) => {
                        setLoading(true);
                        try {
                          const payload  = {
                            ...values,
                          }
                          setLoading(true);
                          await login(payload);
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
                        resetForm,

                      }) => (
                        <>
                          <form
                            onSubmit={handleSubmit}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                              }
                            }}
                          >
                            <Row>
                              {/* ------ البريد الالكتروني ------ */}
                              <Col lg={12}>
                                <FormGroup className="mb-3">
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

                              {/* ------ كلمة المرور ------ */}
                              <Col lg={12}>
                                <FormGroup className="mb-3">
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
                                      <>{t("Registers.Login")}</>
                                    )}
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </form>
                          <div className="text-center mt-4" disabled={true}>
                            {phoneLogin ? (
                              <p
                                className=" text-primary"
                                role="button"
                                onClick={() => {
                                  resetForm();
                                  // setPhoneLogin(false);
                                }}
                                disabled={true}
                              >
                                {t("Registers.loginByEmail")}
                              </p>
                            ) : (
                              <p
                                className=" text-primary"
                                role="button"
                                onClick={() => {
                                  resetForm();
                                  // setPhoneLogin(true);
                                }}
                                disabled={true}
                              >
                                {t("Registers.LoginByMobile")}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </Formik>
                  )}
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
