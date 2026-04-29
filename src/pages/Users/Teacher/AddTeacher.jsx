import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import { useTranslation } from 'react-i18next';
import Alert from '../../../Components/Common/Alert';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import TopPageButttons from '../../../Components/Common/TopPageButttons';
import * as Yup from "yup";
import BasicInformation from './Components/BasicInformation';
import { getEducationalStages, getGender, getLanguage, getStatus, getSubjects } from '../../../helpers/dataLocal';
import AddressComponents from '../../../Components/Common/AddressComponents';
import { useGetAllCourse } from '../../../helpers/getAllApiSelect';
import { createAccountTeacher, editAccountTeacher, uploadFiles } from '../../../helpers/fakebackend_helper';
import { toast } from 'react-toastify';
import ImageComponent from '../../../Components/Common/ImageComponent';
import CommentsComponents from '../../../Components/Common/CommentsComponents';

export default function AddTeacher() {
  const { t, i18n } = useTranslation();
  document.title = `${t("common.add")} ${t("Teacher.Teachers")}`;
  const nav = useNavigate();

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [loadsave, setLoadSave] = useState(false);
  const [profileData, setProfileData] = useState();
  const [seletedCountry, setseletedCountry] = useState({
    id: 251,
    countryName: "Egypt",
    code: "+20",
  });
  // ________________________________________________________________________________________
  const { data: Courses = [], isLoading: LoadingCourse } = useGetAllCourse();
  
  const EducationalStages = getEducationalStages();
  const Subjects = {
    Courses: Courses?.data,
    LoadingCourse,
  };
  const Gender = getGender();
  const Status = getStatus();
  const language = getLanguage();

  // ________________________________________________________________________________________

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    age: "",
    image_path: "null",
  });
  // ________________________________________________________________________________________

  const validationSchema = Yup.object({
    first_name: Yup.string().required(`${t("common.first_name")} ${t("common.required")}`),
    last_name: Yup.string().required(`${t("common.last_name")} ${t("common.required")}`),
    phone: Yup.string().required(`${t("Teacher.phoneNumber")} ${t("common.required")}`),
    email: Yup.string().email(t("required.EmailIncorrect")).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,t("Registers.EmailIncorrect")).required(t("Registers.EmailRequired")),
    age: Yup.number().typeError(t("common.numbers_Only"))   // لو كتب حروف
      .required(`${t("Registers.age")} ${t("common.required")}`)
      .min(5, t("common.minAge"))           // أقل عمر
      .max(99, t("common.maxAge")),
    password: Yup.string().required(t("Registers.passwordValidation")).min(6, t("Registers.passwordMinLength")),
  });
  // ________________________________________________________________________________________

  const handleSaveNew = async (values, action) =>{
    try {
      setLoadSave(true)
      await validationSchema.validate(values, { abortEarly: false });
      const {image_path, avatar, ...rest } = values;
      
      const params = {
        ...rest,
        role: "TEACHER",
        age: rest?.age ? Number(rest.age) : undefined,
        phone: `(${seletedCountry?.code})${values.phone}`,
      };

      const payload = Object.fromEntries(
        Object.entries(params).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ""
        )
      );
      if (values?.avatar && values.avatar !== initialValues.avatar) {
        const file = values.avatar; // لازم يكون File مش FileList
          const uploadRes = await uploadFiles(file);  
          if(uploadRes?.url){
            payload.image_path = uploadRes?.url;
          }else{
            setLoadSave(false);
          }
      }
      setLoadSave(false)
      createAccountTeacher(payload).then((res) => {
        if (res && res.status) {
          toast.success(res?.message, {
            position: "top-center",
            hideProgressBar: false,
            progress: undefined,
            toastId: "",
          });
          setLoadSave(false)
          nav("/teacher");
        } else{
          toast.error(res?.message, {
            position: "top-center",
            hideProgressBar: false,
            progress: undefined,
            toastId: "",
          });
          setLoadSave(false)
        }
      })
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
                      namePage={"add"}
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
                      language={language}
                      seletedCountry={seletedCountry}
                      setseletedCountry={setseletedCountry}
                    />

                    {/* ---------------- العنوان ---------------- */}
                    <AddressComponents
                      values={values}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                      disableEdit={true}
                    />

                    <Row>
                      {/* ------ ملاحظات ------ */}
                      <Col xxl={6}>
                        <CommentsComponents 
                          values={values}
                          handleBlur={handleBlur}
                          setFieldValue={setFieldValue}
                          touched={touched}
                          errors={errors}
                          disableEdit={true}
                        />
                      </Col>

                      {/* ------ مرفقات ------ */}
                      <Col xxl={6}>
                        <ImageComponent 
                          profileData={profileData}
                          setFieldValue={setFieldValue}
                        />
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
