import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { useTranslation } from 'react-i18next';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Alert from '../../../Components/Common/Alert';
import { ErrorMessage, Formik } from 'formik';
import TopPageButttons from '../../../Components/Common/TopPageButttons';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import SubjectComponent from './Components/SubjectComponent';
import BasicInformation from './Components/BasicInformation';
import { toast } from 'react-toastify';
import { getEducationalStages, getGender, getLanguage, getStatus } from '../../../helpers/dataLocal';
import ParentInformation from './Components/ParentInformation';
import AddressComponents from '../../../Components/Common/AddressComponents';
import { createAccountStudent, uploadFiles } from '../../../helpers/fakebackend_helper';
import ImageComponent from '../../../Components/Common/ImageComponent';
import CommentsComponents from '../../../Components/Common/CommentsComponents';

export default function AddStudent() {
  const { t, i18n } = useTranslation();
  document.title = `${t("common.add")} ${t("Student.Students")}`;
  const nav = useNavigate();
  // ________________________________________________________________________________________________________________________________________
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [loadsave, setLoadSave] = useState(false);
  const [profileData, setProfileData] = useState();
  const [seletedCountry, setseletedCountry] = useState({
    id: 251,
    countryName: "Egypt",
    code: "+20",
  });
  // ________________________________________________________________________________________

  const EducationalStages = getEducationalStages();
  const Gender = getGender();
  const Status = getStatus();
  const language = getLanguage();
  
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
  });

  // ________________________________________________________________________________________________________________________________________

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

  // ________________________________________________________________________________________________________________________________________

  const handleSaveNew = async (values, action) =>{
    try {
      setLoadSave(true)
      await validationSchema.validate(values, { abortEarly: false });
      const {image_path, avatar, phone, status, Gender, EducationalStages, ...rest } = values;
      
      const params = {
        ...rest,
        role: "STUDENT",
        age: rest?.age ? Number(rest.age) : undefined,
        phone: `(${seletedCountry?.code})${values.phone}`,
      };

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
      createAccountStudent(payload).then((res) => {
        if (res && res.status) {
          toast.success(res?.message, {
            position: "top-center",
            hideProgressBar: false,
            progress: undefined,
            toastId: "",
          });
          nav("/student");
          setLoadSave(false)
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
                      namePage={"add"}
                      values={values}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      touched={touched}
                      errors={errors}
                      EducationalStages={EducationalStages}
                      Gender={Gender}
                      Status={Status}
                      language={language}
                      seletedCountry={seletedCountry}
                      setseletedCountry={setseletedCountry}
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
