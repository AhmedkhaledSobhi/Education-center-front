import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Col, Container, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Alert from '../../../Components/Common/Alert';
import { Formik } from 'formik';
import TopPageButttons from '../../../Components/Common/TopPageButttons';
import BasicInformation from './Components/BasicInformation';
import SubjectComponent from './Components/SubjectComponent';
import ParentInformation from './Components/ParentInformation';
import AddressComponents from '../../../Components/Common/AddressComponents';
import CommentsComponents from '../../../Components/Common/CommentsComponents';
import ImageComponent from '../../../Components/Common/ImageComponent';
import { getEducationalStages, getGender, getLanguage, getStatus2 } from '../../../helpers/dataLocal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { delete_Teacher, editAccountStudent, getStudent, uploadFiles } from '../../../helpers/fakebackend_helper';
import * as Yup from "yup";

export default function PreviewStudent() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  const {id} = useParams();
  const location = useLocation();
  const [disableEdit, setDisableEdit] = useState(
    location?.state?.edit
  );
  document.title = `${disableEdit?t("common.view") : t("common.edit")} ${t("Student.student2")}`;
  // ________________________________________________________________________________________________________________________________________
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [loadsave, setLoadSave] = useState(false);
  const [profileData, setProfileData] = useState();

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [seletedCountry, setseletedCountry] = useState({
    id: 251,
    countryName: "Egypt",
    code: "+20",
  });
  // ________________________________________________________________________________________

  const EducationalStages = getEducationalStages();
  const Gender = getGender();
  const Status = getStatus2();
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

    countryCode: "65",
    region: "",
    cityCode: "",
    AdditionalAddress: "",
  });

  // ________________________________________________________________________________________________________________________________________

  const validationSchema = Yup.object({
    first_name: Yup.string().required(`${t("common.first_name")} ${t("common.required")}`),
    last_name: Yup.string().required(`${t("common.last_name")} ${t("common.required")}`),
    phone: Yup.string().required(`${t("Teacher.phoneNumber")} ${t("common.required")}`),
    email: Yup.string().email(t("required.EmailIncorrect")).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,t("Registers.EmailIncorrect")).required(t("Registers.EmailRequired")),
    // age: Yup.number().typeError(t("common.numbers_Only"))   // لو كتب حروف
    //   .required(`${t("Registers.age")} ${t("common.required")}`)
    //   .min(5, t("common.minAge"))           // أقل عمر
    //   .max(99, t("common.maxAge")),
    countryCode: Yup.string().required(`${t("common.country")} ${t("common.required")}`),
    region: Yup.number().required(`${t("common.Region")} ${t("common.required")}`),
    cityCode: Yup.string().required(`${t("common.city")} ${t("common.required")}`),
  });

  // ________________________________________________________________________________________________________________________________________

  const handleSaveNew = async (values, action) =>{
    try {
      setLoadSave(true)
      await validationSchema.validate(values, { abortEarly: false });
      const {image_path, avatar, phone, status, Gender, EducationalStages, ...rest } = values;
      
      const params = {
        ...rest,
        id: id,
        countryCode: values?.countryCode?.id ?? "65",
        region: values?.region?.id ?? values?.region,
        cityCode: values?.cityCode?.id ?? values?.cityCode,
        age: rest?.age ? Number(rest.age) : undefined,
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
      editAccountStudent(payload).then((res) => {
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
  // ________________________________________________________________________________________
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (id) => {
    setDeleteModal(true);
  };
  const handleDeleteTicket = async () => {
    const data = { id: id };
    try {
      const res = await delete_Teacher(data);
      if (res && res.status) {
        toast.success(res?.message, {
          position: "top-center",
          hideProgressBar: false,
          autoClose: 3000,
          progress: undefined,
          toastId: "",
        });
        setDeleteModal(false);
        nav("/teacher");
      } else {
        toast.error(res?.message, {
          position: "top-center",
          hideProgressBar: false,
          autoClose: 3000,
          progress: undefined,
          toastId: "",
        });
      }
    } catch (error) {
      toast.error("An error occurred while deleting the branch", {
        position: "top-center",
        hideProgressBar: false,
        autoClose: 3000,
        progress: undefined,
        toastId: "",
      });
    }
  }
  // ________________________________________________________________________________________
  const getData = ()=>{    
    setLoadingProfile(true);
    getStudent({id:id}).then((res) => {
      if (res && res.status) {
        const phone = res?.data?.phone?.replace(/^\(\+20\)/, "");
        setInitialValues({
          first_name: res?.data?.first_name || "",
          last_name:  res?.data?.last_name || "",
          status: res?.data?.isVerified,
          age: res?.data?.age,
          lang: res?.data?.lang,
          phone: phone,
          email: res?.data?.email,
          countryCode: res?.data?.countryCode ?? "65",
          region: res?.data?.regionId,
          cityCode: res?.data?.cityCode,
          AdditionalAddress: res?.data?.AdditionalAddress
        })
        setProfileData((prev) => {
          return {
            id: res?.data?.id,
            avatar: res?.data?.image_path != null ? `http://localhost:5173/api/${res?.data?.image_path}`: "",
          };
        });
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
            pageTitle={t("Student.Students")}
            pageTitleLink={"/student"}
            subPageTitle={`${disableEdit?t("common.view"): t("common.edit")} ${t("Student.student2")}`}
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
                      deleteButton={()=> onClickDelete(id)}
                      deleteSoon={true}
                      PageTittle={`${disableEdit?t("common.view"): t("common.edit")} ${t("Student.student2")}`}
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
                      language={language}

                      seletedCountry={seletedCountry}
                      setseletedCountry={setseletedCountry}
                      disableEdit={disableEdit}
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
                      disableEdit={disableEdit}
                    />

                    {/* ---------------- معلومات الوالد ---------------- */}
                    <ParentInformation
                      values={values}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      touched={touched}
                      errors={errors}
                      disableEdit={disableEdit}
                    />
                    {/* ---------------- العنوان ---------------- */}
                    <AddressComponents
                      values={values}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                      disableEdit={disableEdit}
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
                        />
                      </Col>

                      {/* ------ مرفقات ------ */}
                      <Col xxl={6}>
                        <ImageComponent 
                          profileData={profileData}
                          setFieldValue={setFieldValue}
                          disableEdit={disableEdit}
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
