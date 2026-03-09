import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import Alert from '../../../Components/Common/Alert';
import TopPageButttons from '../../../Components/Common/TopPageButttons';
import { ErrorMessage, Formik } from 'formik';
import Select from "react-select";
import { getEducationalStages, getStatus } from '../../../helpers/dataLocal';
import ComponentLoader from '../../../Components/Common/ComponentLoader';


export default function AddSubject() {
  const { t, i18n } = useTranslation();
  document.title = `${t("common.add")} ${t("Subject.subject")} ${t("common.new")}`;
  const nav = useNavigate();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [loadsave, setLoadSave] = useState(false);
  const loadingProfile= false
  // ________________________________________________________________________________________

  const Status = getStatus();
  const EducationalStages = getEducationalStages();

  // ________________________________________________________________________________________

  const [initialValues, setInitialValues] = useState({
    name: "",
    EducationalStages: [],
    status: {name: t("common.active") , id: 0, value:"active"},
    Description: "",
  });
  // ________________________________________________________________________________________

  const validationSchema = Yup.object({
    name: Yup.string().required(`${t("Subject.name")} ${t("common.required")}`),
    EducationalStages: Yup.array().min(1, `${t("Teacher.Educational_Stages")} ${t("common.required")}`),
    status: Yup.object().required(`${t("common.status")} ${t("common.required")}`),
  })
  // ________________________________________________________________________________________

  const handleSaveNew = async (values, action) =>{
    try{
      setLoadSave(true)
      await validationSchema.validate(values, { abortEarly: false });

    } 
    catch(error){
      if (error.name === "ValidationError") {
        setLoadSave(false)
      }else {
        console.error(error);
      }
      return;
    }
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("LayoutMenuData.Setting")}
            subTitle={t("LayoutMenuData.Setting")}
            pageTitle={t("Subject.Subjects")}
            pageTitleLink={"/subjects"}
            subPageTitle={`${t("common.add")} ${t("Subject.subject")} ${t("common.new")}`}
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
                      PageTittle={`${t("common.add")} ${t("Subject.subject")}`}
                      handleSave={() => handleSaveNew(values)}
                      loadsave={loadsave}
                      close={() => {nav("/branches")}}
                      information={()=> setIsInfoOpen(!isInfoOpen)}
                    />
                    <Card>
                      <CardHeader>
                        <div className="sub-title">
                          {t("branches.Basic_information")}
                        </div>
                      </CardHeader>
                      <CardBody>
                        {loadingProfile ?
                          <ComponentLoader /> :
                            <Row>
                              {/* ------ اسم المادة ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="name"
                                  >
                                    {t("Subject.name")}{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    placeholder={`${t("common.enter")} ${t("Subject.name")} ${t("common.placeholder")}`}
                                    title={t("Subject.name")}
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
                                      EducationalStages.find((option)=>{
                                        return  option?.value === values?.EducationalStages
                                      }) 
                                    } 
                                    onChange={(option) => {
                                      setFieldValue("EducationalStages", option);
                                    }}
                                    onBlur={() => {
                                      setFieldTouched("EducationalStages", true);
                                    }}
                                    isMulti
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

                              {/* ------ الوصف ------ */}
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
                                </FormGroup>
                              </Col>
                            </Row>
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
