import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { useTranslation } from 'react-i18next';
import { getEducationalStages, getGender, getStatus } from '../../../helpers/dataLocal';
import { useGetAllCourse } from '../../../helpers/getAllApiSelect';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { ErrorMessage, Formik } from 'formik';
import TopPageButttons from '../../../Components/Common/TopPageButttons';
import BasicInformation from './Components/BasicInformation';
import Alert from '../../../Components/Common/Alert';
import { getCourse, profile } from '../../../helpers/fakebackend_helper';
import { toast } from 'react-toastify';
import AddressComponents from '../../../Components/Common/AddressComponents';
import CommentsComponents from '../../../Components/Common/CommentsComponents';

export default function PreviewTeacher() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  const {id} = useParams();
  const location = useLocation();
  const [disableEdit, setDisableEdit] = useState(
    location?.state?.edit
  );
  document.title = `${disableEdit?t("common.view") : t("common.edit")} ${t("Teacher.Teacher2")}`;
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [loadsave, setLoadSave] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  
  // ________________________________________________________________________________________
  const { data: Courses = [], isLoading: LoadingCourse } = useGetAllCourse();
  
  const EducationalStages = getEducationalStages();
  const Subjects = {
    Courses: Courses?.data,
    LoadingCourse,
  };
  const Gender = getGender();
  const Status = getStatus();
  // ________________________________________________________________________________________

  const [initialValues, setInitialValues] = useState({
    name: "",
    EducationalStages: [],
    NameSubject: Subjects?.Courses?.[0],
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
  // ________________________________________________________________________________________
  const getData= ()=>{    
    setLoadingProfile(true);
    profile({id:id}).then((res) => {
      if (res && !res.status) {
        console.log("ahmed res", res);
        const phone = res?.phone?.replace(/^\(\+20\)/, "");

        setInitialValues({
          name: res?.first_name + " " + res?.last_name || "",
          phone: phone,
          email: res?.email,
          countryCode: res?.countryCode ,
          // ?? { 
          //   id: "65", 
          //   name: "Egypt", 
          //   name_ar: "مصر",
          //   name_en: "Egypt",
          // },
          region: res?.regionId,
          city: res?.cityCode,
          AdditionalAddress: res?.AdditionalAddress
        })
        setLoadingProfile(false);
       } else{
        toast.error(res?.message, {
          position: "top-center",
          hideProgressBar: false,
          progress: undefined,
          toastId: "",
        });
        setLoadingProfile(false);
      }
    });
  };  
  useEffect(() => {
    getData();
  }, [id]);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("LayoutMenuData.Users")}
            subTitle={t("LayoutMenuData.Users")}
            pageTitle={t("Teacher.Teachers")}
            pageTitleLink={"/teacher"}
            subPageTitle={`${disableEdit?t("common.view"): t("common.edit")} ${t("Teacher.Teacher2")}`}
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
                      edit={true}
                      disableEdit={disableEdit}
                      setDisableEdit={setDisableEdit}
                      // deleteButton={()=> onClickDelete(id)}
                      PageTittle={`${disableEdit?t("common.view"): t("common.edit")} ${t("Teacher.Teacher2")}`}
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
                      disableEdit={disableEdit}
                      loadingProfile={loadingProfile}
                    />
                    {/* ---------------- العنوان ---------------- */}
                    <AddressComponents
                      values={values}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                      disableEdit={disableEdit}
                      loadingProfile={loadingProfile}
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
                          disableEdit={disableEdit}
                          loadingProfile={loadingProfile}
                        />
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
