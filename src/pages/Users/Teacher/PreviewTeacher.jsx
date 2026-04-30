import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { useTranslation } from 'react-i18next';
import { getEducationalStages, getGender, getLanguage, getStatus, getStatus2 } from '../../../helpers/dataLocal';
import { useGetAllCourse } from '../../../helpers/getAllApiSelect';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { ErrorMessage, Formik } from 'formik';
import TopPageButttons from '../../../Components/Common/TopPageButttons';
import BasicInformation from './Components/BasicInformation';
import Alert from '../../../Components/Common/Alert';
import { delete_Teacher, editAccountTeacher, getCourse, getTeacher, uploadFiles } from '../../../helpers/fakebackend_helper';
import { toast } from 'react-toastify';
import AddressComponents from '../../../Components/Common/AddressComponents';
import CommentsComponents from '../../../Components/Common/CommentsComponents';
import { getChangedValues, NoChanges } from '../../../helpers';
import ImageComponent from '../../../Components/Common/ImageComponent';
import DeleteModal from '../../../Components/Common/DeleteModal';
import { useQueryClient } from '@tanstack/react-query';
export default function PreviewTeacher() {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
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
  const [profileData, setProfileData] = useState();
  
  // ________________________________________________________________________________________
  const { data: Courses = [], isLoading: LoadingCourse } = useGetAllCourse();
  
  const EducationalStages = getEducationalStages();
  const Subjects = {
    Courses: Courses?.data,
    LoadingCourse,
  };
  const Gender = getGender();
  const Status = getStatus2();
  const language = getLanguage();
  // ________________________________________________________________________________________

  const [initialValues, setInitialValues] = useState({
    name: "",
    EducationalStages: [],
    NameSubject: Subjects?.Courses?.[0],
    phone: "",
    email: "",
    Gender: Gender?.[0],
    status: Status?.[0],
    lang: language?.[0],
    countryCode: { 
      id: "65", 
      name: "Egypt", 
      name_ar: "مصر",
      name_en: "Egypt",
    },
    region: "",
    cityCode: "",
    AdditionalAddress: "",
    comments: "",
  });
  // ________________________________________________________________________________________

  const validationSchema = Yup.object({
    first_name: Yup.string().required(`${t("common.first_name")} ${t("common.required")}`),
    last_name: Yup.string().required(`${t("common.last_name")} ${t("common.required")}`),
    phone: Yup.string().required(`${t("Teacher.phoneNumber")} ${t("common.required")}`),
    email: Yup.string().email(t("required.EmailIncorrect")).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,t("Registers.EmailIncorrect")).required(t("Registers.EmailRequired")),
    countryCode: Yup.string().required(`${t("common.country")} ${t("common.required")}`),
    region: Yup.number().required(`${t("common.Region")} ${t("common.required")}`),
    cityCode: Yup.string().required(`${t("common.city")} ${t("common.required")}`),
  });
  // ________________________________________________________________________________________

  const handleSaveNew = async (values, action) =>{
    try {
      setLoadSave(true)
      await validationSchema.validate(values, { abortEarly: false });
      const changedValues = getChangedValues(values, initialValues);
      const {avatar, comments, role, Gender, EducationalStages, NameSubject,  ...rest } = changedValues;
      const params = {
        ...rest,
        id: id,
        countryCode: values?.countryCode?.id ?? "65",
        region: values?.region?.id ?? values?.region,
        cityCode: values?.cityCode?.id ?? values?.cityCode,
        age: rest?.age ? Number(rest.age) : undefined,
      }
      const payload = Object.fromEntries(
        Object.entries(params).filter(
          ([_, value]) => value !== undefined && value !== null
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
      // مفيش أي تعديل تم
      if (NoChanges(values, initialValues)) {
        toast.error(t("common.No_data_modification_required_to_save_it"),{
          position: "top-center",
          hideProgressBar: false,
          progress: undefined,
          toastId: "",
        });
        setLoadSave(false);
        return;
      }
      editAccountTeacher(payload).then((res) => {
        if (res && res.status) {
          toast.success(res?.message, {
            position: "top-center",
            hideProgressBar: false,
            progress: undefined,
            toastId: "",
          });
          queryClient.refetchQueries({
            queryKey: ["allTeacher",],
            exact: false,
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
        queryClient.refetchQueries({
          queryKey: ["allTeacher",],
          exact: false,
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
    getTeacher({id:id}).then((res) => {
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
      <DeleteModal
        show={deleteModal}
        onCloseClick={() => setDeleteModal(false)}
        onDeleteClick={handleDeleteTicket}
      />
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
                      deleteButton={()=> onClickDelete(id)}
                      deleteSoon={true}
                      PageTittle={`${disableEdit?t("common.view"): t("common.edit")} ${t("Teacher.Teacher2")}`}
                      handleSave={() => handleSaveNew(values)}
                      // handleSaveSoon={true}
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
                      language={language}
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
                        <ImageComponent 
                          profileData={profileData}
                          setFieldValue={setFieldValue}
                          disableEdit={disableEdit}
                          loadingProfile={loadingProfile}
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
