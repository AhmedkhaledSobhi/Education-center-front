import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import { useTranslation } from 'react-i18next';
import Alert from '../../../Components/Common/Alert';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import TopPageButttons from '../../../Components/Common/TopPageButttons';
import * as Yup from "yup";
import AddressComponents from '../../UserAccount/Components/AddressComponents';
import BasicInformation from './Components/BasicInformation';
import { getEducationalStages, getGender, getStatus, getSubjects } from '../../../helpers/dataLocal';

export default function AddTeacher() {
  const { t, i18n } = useTranslation();
  document.title = `${t("common.add")} ${t("Teacher.Teachers")}`;
  const nav = useNavigate();

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [loadsave, setLoadSave] = useState(false);

  // ________________________________________________________________________________________

  const EducationalStages = getEducationalStages();
  const Subjects = getSubjects();
  const Gender = getGender();
  const Status = getStatus();

  // ________________________________________________________________________________________

  const [initialValues, setInitialValues] = useState({
    name: "",
    EducationalStages: [],
    NameSubject: Subjects?.[0],
    phone: "",
    email: "",
    Gender: Gender?.[0],
    status: Status?.[0],
    country: { 
      id: "65", 
      name: "Egypt", 
      name_ar: "مصر",
      name_en: "Egypt",
    },
    region: "",
    city: "",
    AdditionalAddress: "",
    comments: "",
  });
  // ________________________________________________________________________________________

  const validationSchema = Yup.object({
    name: Yup.string().required(`${t("Teacher.teacher")} ${t("common.required")}`),
    EducationalStages: Yup.array().min(1, `${t("Teacher.Educational_Stages")} ${t("common.required")}`),
    NameSubject: Yup.object().required(`${t("Teacher.Name_Subject")} ${t("common.required")}`),
    phone: Yup.string().required(`${t("Teacher.phoneNumber")} ${t("common.required")}`),
    email: Yup.string().email(t("required.EmailIncorrect")).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,t("Registers.EmailIncorrect")).required(t("Registers.EmailRequired")),
    Gender: Yup.object().required(`${t("common.Gender")} ${t("common.required")}`),
    status: Yup.object().required(`${t("common.status")} ${t("common.required")}`),
    country: Yup.object().required(`${t("common.country")} ${t("common.required")}`),
    region: Yup.object().required(`${t("common.Region")} ${t("common.required")}`),
    city: Yup.object().required(`${t("common.city")} ${t("common.required")}`),
  });
  // ________________________________________________________________________________________

  const handleSaveNew = async (values, action) =>{
    try {
      setLoadSave(true)
      console.log("ahmed values", values);
      await validationSchema.validate(values, { abortEarly: false });

      setLoadSave(false)
    } catch (error) {
      if (error.name === "ValidationError") {
        setLoadSave(false)
      } else {
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
            title={t("LayoutMenuData.Users")}
            subTitle={t("LayoutMenuData.Users")}
            pageTitle={t("Teacher.Teachers")}
            pageTitleLink={"/teacher"}
            subPageTitle={t("Teacher.AddTeacher")}
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
                      PageTittle={`${t("Teacher.AddTeacher")}`}
                      handleSave={() => handleSaveNew(values)}
                      loadsave={loadsave}
                      close={() => {nav("/teacher")}}
                      information={()=> setIsInfoOpen(!isInfoOpen)}
                    />

                    {/* ---------------- المعلومات الاساسيه ---------------- */}
                    <BasicInformation
                      values={values}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      touched={touched}
                      errors={errors}
                      EducationalStages={EducationalStages}
                      Subjects={Subjects}
                      Gender={Gender}
                      Status={Status}
                    />

                    {/* ---------------- العنوان ---------------- */}
                    <AddressComponents
                      values={values}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                    />

                    <Row>
                      {/* ------ ملاحظات ------ */}
                      <Col xxl={6}>
                        <Card>
                          <CardHeader>
                            <div className="sub-title">
                              {t("common.comments")}
                            </div>
                          </CardHeader>
                          <CardBody>
                            {/* ------ ملاحظات ------ */}
                            <FormGroup>
                              <Label
                                htmlFor="comments"
                                className="form-label"
                              >
                                {t("common.enter")} {t("common.comments")}{" "}
                              </Label>
                              <Input
                                type="textarea"
                                placeholder={`${t("common.enter")} ${t("common.comments")} ${t("common.placeholder")}`}
                                title={t("common.comments")}
                                name="comments"
                                id="comments"
                                rows='5'
                                onChange={(e) =>
                                  setFieldValue("comments", e.target.value)
                                }
                                value={values?.comments}
                                onBlur={handleBlur}
                              />
                              {touched?.comments && errors?.comments ? (
                                <div style={{ color: "red" }}>
                                  {errors?.comments}
                                </div>
                              ) : null}
                            </FormGroup>
                          </CardBody>
                        </Card>
                      </Col>

                      {/* ------ مرفقات ------ */}
                      <Col xxl={6}>
                        <Card>
                          <CardHeader>
                            <div className="sub-title">
                              {t("common.Attachments")}
                            </div>
                          </CardHeader>
                          <CardBody>

                          </CardBody>
                        </Card>
                      </Col>                
                    </Row> 
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
