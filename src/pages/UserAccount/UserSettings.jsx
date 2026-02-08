import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Container } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import ButtonLoader from '../../Components/Common/ButtonLoader';
import avatar1 from "../../assets/images/user-avatar.png";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { editAccountInformation, getLoggedInUser, profile } from '../../helpers/fakebackend_helper';
import { Formik } from 'formik';
import TopPageButttons from '../../Components/Common/TopPageButttons';
import { useNavigate } from 'react-router-dom';
import AddressComponents from './Components/AddressComponents';
import ContactInformationComponents from './Components/ContactInformationComponents';
import BasicInformation from './Components/BasicInformation';
import Select from "react-select";

export default function UserSettings() {
  const { t, i18n } = useTranslation();
  document.title = t("ProfileDropdown.accountSettings");
  const nav = useNavigate();
  const [profileData, setProfileData] = useState();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadsave, setLoadSave] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [disableEdit, setDisableEdit] = useState(false);



  const getProfileData = async () => {
    try {
      setLoadingProfile(true);
      const user = getLoggedInUser()
      const data ={id: Number(user?.id) }
      const response = await profile(data);      
      if(response){
        const phone = response?.phone?.replace(/^\(\+20\)/, "");
        setInitialValues({
          first_name: response?.first_name,
          last_name: response?.last_name,
          Center_name: response?.first_name + " " + response?.last_name, 
          phone: phone,
          email: response?.email,
          age: response?.age,
          address: response?.address || "",
          role: response?.role,
          country: { 
            id: "65", 
            name: "Egypt", 
            name_ar: "مصر",
            name_en: "Egypt",
          },
          region: "",
          city: "",
        })
        setProfileData((prev) => {
          return {
            avatar: response?.image_path != "null" ? response?.image_path : avatar1,
          };
        });
        setLoadingProfile(false);
      }
    } catch (error) {
      setLoadingProfile(false);
      console.log("Error in fetching profile data:", error);
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);
  
  // ________________________________________________________________________________________

  const validationSchema = Yup.object({

  })

  const onSubmitForm = async (values, action) => {

    console.log("ahmed values Form", values);

    const params = {
      ...values,
      role: values?.role?.value ?? values?.role,
      country: values?.country?.id,
      region: values?.region?.id,
      city: values?.city?.id,
    }
    const formData = new FormData();
    for (const key in params) {
      if (Object.hasOwnProperty.call(params, key) && params[key]) {
        formData.append(key, params[key]);
      }
    }

    if (values?.photo) {
      formData.append("image_path", values?.photo[0]);
    }
    try {
      editAccountInformation(formData).then((res) => {
        if (res && res.status) {
          toast.success(res?.message, {
            position: "top-right",
            hideProgressBar: false,
            progress: undefined,
            toastId: "",
          });
          setLoadSave(true)
        } else{
          toast.error(res?.message, {
            position: "top-right",
            hideProgressBar: false,
            progress: undefined,
            toastId: "",
          });
          setLoadSave(false)
        }
      })
    } catch (error) {
      console.log("Error in editing profile data:", error);
    }

  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("ProfileDropdown.Settings")}
            subTitle={t("ProfileDropdown.Settings")}
            pageTitle={t("ProfileDropdown.accountSettings")}
          />

          <Formik
            initialValues={initialValues}
            validationSchema={() => {
              return validationSchema;
            }}
            onSubmit={(values, action) => {
              onSubmitForm(values, action);
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
                  PageTittle={`${t("common.edit")} ${t("AccountSettings.ProfileInformation")}`}
                  handleSave={() => handleSubmit(values)}
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
                  loadingProfile={loadingProfile}
                  disableEdit={disableEdit}
                />

                {/* ---------------- بيانات الاتصال ---------------- */}
                <ContactInformationComponents
                  values={values}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                  loadingProfile={loadingProfile}
                />
                {/* ---------------- العنوان ---------------- */}
                <AddressComponents
                  values={values}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                  loadingProfile={loadingProfile}
                />
              </form>
            )}
          </Formik>
        </Container>
      </div>
    </React.Fragment>
  )
}
