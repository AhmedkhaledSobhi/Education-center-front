import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { useTranslation } from 'react-i18next';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Alert from '../../../Components/Common/Alert';
import { Formik } from 'formik';
import * as Yup from "yup";
import TopPageButttons from '../../../Components/Common/TopPageButttons';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from '../../../Components/Common/ButtonLoader';
import Select from "react-select";

export default function AddSection() {
  const { t, i18n } = useTranslation();
  document.title = `${t("common.add")} ${t("section.Section")}`;
  const nav = useNavigate();

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [loadsave, setLoadSave] = useState(false);
  const loadingProfile= false

  const Whiteboard =[
    {name: t("common.traditional") , id: 0, value:"traditional"},
    {name: t("common.smart") , id: 1, value:"smart"},
  ]
  const Screen =[
    {name: t("common.Display_screen") , id: 0, value:"DisplayScreen"},
    {name: t("common.projector") , id: 1, value:"projector"},
  ]
  const Branch =[
    {name: t("common.Main_branch") , id: 0, value:"MainBranch"},
  ]

  const Status =[
    {name: t("common.active") , id: 0, value:"active"},
    {name: t("common.Inactive") , id: 1, value:"Inactive"},
  ]
  // ________________________________________________________________________________________
  const [initialValues, setInitialValues] = useState({
    name: "",
    NumberStudents: "",
    Whiteboard: "traditional",
    Screen: "DisplayScreen",
    Branch: "MainBranch",
    status: "active",
    Description: "",
  });

  const validationSchema = Yup.object({})
  const handleSaveNew = async (values, action) =>{
    
  }
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
                          </div> : (
                            <Row>
                              {/* ------ اسم السكشن ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="name"
                                    className="form-label"
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
                                  {touched?.name && errors?.name ? (
                                    <div style={{ color: "red" }}>
                                      {errors?.name}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              {/* ------ عدد الطلاب ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="NumberStudents"
                                    className="form-label"
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
                                  {touched?.NumberStudents && errors?.NumberStudents ? (
                                    <div style={{ color: "red" }}>
                                      {errors?.NumberStudents}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              {/* ------ سبورة ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="Whiteboard"
                                    className="form-label"
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
                                        return  option?.value === values?.Whiteboard
                                      }) 
                                    } 
                                    onChange={(option) => {
                                      setFieldValue("Whiteboard", option);
                                    }}
                                    onBlur={() => {
                                      setFieldTouched("Whiteboard", true);
                                    }}
                                    // isDisabled
                                  />
                                  {touched?.Whiteboard && errors?.Whiteboard ? (
                                    <div style={{ color: "red" }}>
                                      {errors?.Whiteboard}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Col>
                              
                              {/* ------ شاشة ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="Screen"
                                    className="form-label"
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
                                        return  option?.value === values?.Screen
                                      }) 
                                    } 
                                    onChange={(option) => {
                                      setFieldValue("Screen", option);
                                    }}
                                    onBlur={() => {
                                      setFieldTouched("Screen", true);
                                    }}
                                    // isDisabled
                                  />
                                  {touched?.Screen && errors?.Screen ? (
                                    <div style={{ color: "red" }}>
                                      {errors?.Screen}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              {/* ------ فرع ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="Branch"
                                    className="form-label"
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
                                        return  option?.value === values?.Branch
                                      }) 
                                    } 
                                    onChange={(option) => {
                                      setFieldValue("Branch", option);
                                    }}
                                    onBlur={() => {
                                      setFieldTouched("Branch", true);
                                    }}
                                    // isMulti
                                    // isDisabled
                                  />
                                  {touched?.Branch && errors?.Branch ? (
                                    <div style={{ color: "red" }}>
                                      {errors?.Branch}
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
                                      Status.find((option)=>{
                                        return  option?.value === values?.status
                                      }) 
                                    } 
                                    onChange={(option) => {
                                      setFieldValue("status", option);
                                    }}
                                    onBlur={() => {
                                      setFieldTouched("status", true);
                                    }}
                                    // isMulti
                                    // isDisabled
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
                          )}
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
