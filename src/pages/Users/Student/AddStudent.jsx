import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { useTranslation } from 'react-i18next';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import AddressComponents from '../../UserAccount/Components/AddressComponents';
import Alert from '../../../Components/Common/Alert';
import { Formik } from 'formik';
import TopPageButttons from '../../../Components/Common/TopPageButttons';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import SubjectComponent from './Components/SubjectComponent';
import BasicInformation from './Components/BasicInformation';
import { toast } from 'react-toastify';
import { getEducationalStages, getGender, getStatus } from '../../../helpers/dataLocal';
import ParentInformation from './Components/ParentInformation';

export default function AddStudent() {
  const { t, i18n } = useTranslation();
  document.title = `${t("common.add")} ${t("Student.Students")}`;
  const nav = useNavigate();
  // ________________________________________________________________________________________________________________________________________

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [loadsave, setLoadSave] = useState(false);
  // ________________________________________________________________________________________

  const EducationalStages = getEducationalStages();
  const Gender = getGender();
  const Status = getStatus();
  // ________________________________________________________________________________________________________________________________________
  const [subjectInput, setSubjectInputs] = useState([
    {
      subject: "",
      Teacher: "",
      price: "",
      description: "",
    }
  ])

  const [initialValues, setInitialValues] = useState({
    name: "",
    EducationalStages: EducationalStages?.[0],
    phone: "",
    email: "",
    Gender: Gender?.[0],
    status: Status?.[0],
    FatherName: "",
    FatherPhone: "",
    FatherEmail: "",
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

  // ________________________________________________________________________________________________________________________________________

  const validationSchema = Yup.object({
    name: Yup.string().required(`${t("Student.student")} ${t("common.required")}`),
    EducationalStages: Yup.object().required(`${t("Teacher.Educational_Stages")} ${t("common.required")}`),
    phone: Yup.string().required(`${t("required.phoneNumber")} ${t("common.required")}`),
    email: Yup.string().email(t("required.EmailIncorrect")).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,t("Registers.EmailIncorrect")).required(t("Registers.EmailRequired")),
    status: Yup.object().required(`${t("common.status")} ${t("common.required")}`),
    Gender: Yup.object().required(`${t("common.Gender")} ${t("common.required")}`),
    country: Yup.object().required(`${t("common.country")} ${t("common.required")}`),
    region: Yup.object().required(`${t("common.Region")} ${t("common.required")}`),
    city: Yup.object().required(`${t("common.city")} ${t("common.required")}`),
  });

  // ________________________________________________________________________________________________________________________________________

  const handleSaveNew = async (values, action) =>{
    try {
      setLoadSave(true)
      console.log("ahmed values", values);
      console.log("ahmed subjectInput", subjectInput);
      await validationSchema.validate(values, { abortEarly: false });

      const invalidItem = subjectInput.find(
        item => !item.subject || !item.Teacher || !item.price
      );

      if (invalidItem) {
        if (!invalidItem.subject && !invalidItem.Teacher && !invalidItem.price) {
          toast.error("لايمكن حفظ الطالب بدون اضافه مادة",{
            position: "top-center",
            hideProgressBar: false,
            autoClose: 3000,
            progress: undefined,
          });
          setLoadSave(false)
        }
        else if (!invalidItem.subject) {
          toast.error(`${t("Subject.name")} ${t("common.required")}`,{
            position: "top-center",
            hideProgressBar: false,
            autoClose: 3000,
            progress: undefined,
          });
          setLoadSave(false)
        }
        else if (!invalidItem.Teacher) {
          toast.error(`${t("Subject.teacher_name")} ${t("common.required")}`,{
            position: "top-center",
            hideProgressBar: false,
            autoClose: 3000,
            progress: undefined,
          });
          setLoadSave(false)
        }
        else {
          toast.error(`${t("Subject.Course_Price")} ${t("common.required")}`,{
            position: "top-center",
            hideProgressBar: false,
            autoClose: 3000,
            progress: undefined,
          });
          setLoadSave(false)
        }
        setLoadSave(false)
        return;
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        setLoadSave(false)

        // عرض أول خطأ فقط
        // toast.error(error.errors[0], {
        //   position: "top-center",
        //   autoClose: 3000,
        // });

        // أو عرض كل الأخطاء
        // error.errors.forEach(err => toast.error(err));
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
            pageTitle={t("Student.Students")}
            pageTitleLink={"/student"}
            subPageTitle={t("Student.AddStudent")}
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
                      PageTittle={`${t("Student.AddStudent")}`}
                      handleSave={() => handleSaveNew(values)}
                      loadsave={loadsave}
                      close={() => {nav("/student")}}
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
                      Gender={Gender}
                      Status={Status}
                    />

                    {/* ---------------- المواد الدراسية ---------------- */}
                    <SubjectComponent
                      values={values}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                      subjectInput={subjectInput}
                      setSubjectInputs={setSubjectInputs}
                    />

                    {/* ---------------- معلومات الوالد ---------------- */}
                    <ParentInformation
                      values={values}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      touched={touched}
                      errors={errors}
                    />
                    {/* ---------------- العنوان ---------------- */}
                    <AddressComponents
                      values={values}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                      // loadingProfile={loadingProfile}
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
