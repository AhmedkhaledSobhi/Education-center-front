import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { useTranslation } from 'react-i18next';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Alert from '../../../Components/Common/Alert';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from "yup";
import TopPageButttons from '../../../Components/Common/TopPageButttons';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { getBranch, getScreen, getStatus, getWhiteboard } from '../../../helpers/dataLocal';
import ComponentLoader from '../../../Components/Common/ComponentLoader';

export default function AddSection() {
  const { t, i18n } = useTranslation();
  document.title = `${t("common.add")} ${t("section.Section")}`;
  const nav = useNavigate();

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [loadsave, setLoadSave] = useState(false);
  const loadingProfile= false

  // ________________________________________________________________________________________

  const Whiteboard = getWhiteboard();
  const Screen = getScreen();
  const Branch = getBranch();
  const Status = getStatus();
  
  // ________________________________________________________________________________________
  const [initialValues, setInitialValues] = useState({
    name: "",
    NumberStudents: "",
    Whiteboard: Whiteboard?.[0],
    Screen: Screen?.[0],
    Branch: Branch?.[0],
    status: Status?.[0],
    Description: "",
  });

  const validationSchema = Yup.object({
    name: Yup.string().required(`${t("Subject.name")} ${t("common.required")}`),
    NumberStudents: Yup.number().required(`${t("section.Number_students")} ${t("common.required")}`),
    Whiteboard: Yup.object().required(`${t("section.Whiteboard")} ${t("common.required")}`),
    Screen: Yup.object().required(`${t("section.Screen")} ${t("common.required")}`),
    Branch: Yup.object().required(`${t("section.Branch")} ${t("common.required")}`),
    status: Yup.object().required(`${t("common.status")} ${t("common.required")}`),
  });

  const handleSaveNew = async (values, action) =>{
    try{
      setLoadSave(true)
      console.log("ahmed values", values);
      await validationSchema.validate(values, { abortEarly: false });
      
      setLoadSave(false)
    } 
    catch(error){
      if (error.name === "ValidationError") {
        setLoadSave(false)
      }else {
        console.error(error);
      }
      return;
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("LayoutMenuData.Setting")}
            subTitle={t("LayoutMenuData.Setting")}
            pageTitle={t("section.Section")}
            pageTitleLink={"/section"}
            subPageTitle={`${t("common.add")} ${t("section.Section")}`}
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
                      PageTittle={`${t("common.add")} ${t("section.Section")}`}
                      handleSave={() => handleSaveNew(values)}
                      loadsave={loadsave}
                      close={() => {nav("/section")}}
                      information={()=> setIsInfoOpen(!isInfoOpen)}
                    />
                    <Card>
                      <CardHeader>
                        <div className="sub-title">
                          {t("section.Section_Contents")}
                        </div>
                      </CardHeader>
                      <CardBody>
                        {loadingProfile ?
                          <ComponentLoader /> 
                          :(
                            <Row>
                              {/* ------ اسم السكشن ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="name"
                                  >
                                    {t("section.name")}{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    placeholder={`${t("common.enter")} ${t("section.name")} ${t("common.placeholder")}`}
                                    title={t("section.name")}
                                    name="name"
                                    id="name"
                                    onChange={(e) =>
                                      setFieldValue("name", e.target.value)
                                    }
                                    value={values?.name}
                                    onBlur={handleBlur}
                                  />
                                  {touched?.name && errors?.name && (
                                    <ErrorMessage
                                      name="name"
                                      component="div"
                                      className="text-danger"
                                    />
                                  )}
                                </FormGroup>
                              </Col>

                              {/* ------ عدد الطلاب ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="NumberStudents"
                                  >
                                    {t("section.Number_students")}{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    type="number"
                                    placeholder={`${t("common.enter")} ${t("section.Number_students")} ${t("common.placeholder")}`}
                                    title={t("section.Number_students")}
                                    name="NumberStudents"
                                    id="NumberStudents"
                                    onChange={(e) =>
                                      setFieldValue("NumberStudents", e.target.value)
                                    }
                                    value={values?.NumberStudents}
                                    onBlur={handleBlur}
                                    onWheel={(e) => e.target.blur()} // disables scroll increment
                                  />
                                  {touched?.NumberStudents && errors?.NumberStudents && (
                                     <ErrorMessage
                                      name="NumberStudents"
                                      component="div"
                                      className="text-danger"
                                    />
                                  )}
                                </FormGroup>
                              </Col>

                              {/* ------ سبورة ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="Whiteboard"
                                  >
                                    {t("section.Whiteboard")}{" "}
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
                                    id="Whiteboard"
                                    name="Whiteboard"
                                    placeholder={`${t("common.Select")} ${t("section.Whiteboard")} ${t("common.placeholder")}`}    
                                    options={Whiteboard}
                                    getOptionLabel={(option) => option?.name}
                                    getOptionValue={(option) => option?.id}
                                    value={
                                      Whiteboard.find((option)=>{
                                        return  option?.value === values?.Whiteboard?.value
                                      }) 
                                    } 
                                    onChange={(option) => {
                                      setFieldValue("Whiteboard", option);
                                    }}
                                    onBlur={() => {
                                      setFieldTouched("Whiteboard", true);
                                    }}
                                  />
                                  {touched?.Whiteboard && errors?.Whiteboard && (
                                    <ErrorMessage
                                      name="Whiteboard"
                                      component="div"
                                      className="text-danger"
                                    />
                                  )}
                                </FormGroup>
                              </Col>
                              
                              {/* ------ شاشة ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="Screen"
                                  >
                                    {t("section.Screen")}{" "}
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
                                    id="Screen"
                                    name="Screen"
                                    placeholder={`${t("common.Select")} ${t("section.Screen")} ${t("common.placeholder")}`}    
                                    options={Screen}
                                    getOptionLabel={(option) => option?.name}
                                    getOptionValue={(option) => option?.id}
                                    value={
                                      Screen.find((option)=>{
                                        return  option?.value === values?.Screen?.value
                                      }) 
                                    } 
                                    onChange={(option) => {
                                      setFieldValue("Screen", option);
                                    }}
                                    onBlur={() => {
                                      setFieldTouched("Screen", true);
                                    }}
                                  />
                                  {touched?.Screen && errors?.Screen && (
                                    <ErrorMessage
                                      name="Screen"
                                      component="div"
                                      className="text-danger"
                                    />
                                  )}
                                </FormGroup>
                              </Col>

                              {/* ------ فرع ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="Branch"
                                  >
                                    {t("section.Branch")}{" "}
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
                                    id="Branch"
                                    name="Branch"
                                    placeholder={`${t("common.Select")} ${t("section.Branch")} ${t("common.placeholder")}`}    
                                    options={Branch}
                                    getOptionLabel={(option) => option?.name}
                                    getOptionValue={(option) => option?.id}
                                    value={
                                      Branch.find((option)=>{
                                        return  option?.value === values?.Branch?.value
                                      }) 
                                    } 
                                    onChange={(option) => {
                                      setFieldValue("Branch", option);
                                    }}
                                    onBlur={() => {
                                      setFieldTouched("Branch", true);
                                    }}
                                  />
                                  {touched?.Branch && errors?.Branch && (
                                    <ErrorMessage
                                      name="Branch"
                                      component="div"
                                      className="text-danger"
                                    />
                                  )}
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
                                  {touched?.status && errors?.status && (
                                    <ErrorMessage
                                      name="status"
                                      component="div"
                                      className="text-danger"
                                    />
                                  )}
                                </FormGroup>
                              </Col>

                              {/* ------ ملاحظات ------ */}
                              <Col lg={12}>
                                <FormGroup>
                                  <Label
                                    htmlFor="Description"
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
                                  {touched?.Description && errors?.Description && (
                                    <div style={{ color: "red" }}>
                                      {errors?.Description}
                                    </div>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                          )
                          }
                      </CardBody>
                    </Card>
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
