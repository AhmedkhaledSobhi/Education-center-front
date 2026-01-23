import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Container } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import ButtonLoader from '../../Components/Common/ButtonLoader';
import { PROFILE } from '../../helpers/url_helper';
import configService from '../../helpers/config';
import avatar1 from "../../assets/images/user-avatar.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { editAccountInformation } from '../../helpers/fakebackend_helper';
import Loader from '../../Components/Common/Loader';


export default function UserSettings() {
  const { t, i18n } = useTranslation();
  document.title = t("ProfileDropdown.accountSettings");
  const [profileData, setProfileData] = useState();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadsave, setLoadSave] = useState(false);


  const getProfileData = async () => {
    try {
      setLoadingProfile(true);
      // const res = await profile();
      const BASE_URL = configService.apiBaseUrl;
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const idUser = authUser?.id
      const res = await axios.get(`${BASE_URL}${PROFILE}${idUser}`);      
      if(res){
        const phone = res?.phone?.replace(/^\(\+20\)/, "");
        setProfileData((prev) => {
          return {
            name: res?.first_name + " " + res?.last_name,
            phone: phone,
            email: res?.email,
            phone_code_id: "996",
            avatar: res?.image_path != "null" ? res?.image_path : avatar1,
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

  const validationSchema = Yup.object({

  })

  const onSubmitForm = async (values, action) => {
    const params = {}
    const formData = new FormData();
    for (const key in params) {
      if (Object.hasOwnProperty.call(params, key) && params[key]) {
        formData.append(key, params[key]);
      }
    }

    if (values?.photo) {
      formData.append("image", values?.photo[0]);
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
          {true ?
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: 200,
              }}
            >
              <Loader/>
              <ButtonLoader
                color="#0d6efd"
                width="100"
                height="100"
              />
            </div>  
          : <div>
            </div>
          }
        </Container>
      </div>
    </React.Fragment>
  )
}
