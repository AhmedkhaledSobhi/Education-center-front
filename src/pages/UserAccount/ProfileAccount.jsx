import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardText, Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { useTranslation } from 'react-i18next';
import ButtonLoader from '../../Components/Common/ButtonLoader';
import axios from 'axios';
import configService from '../../helpers/config';
import { checkUserRoles } from '../../helpers';
import avatar1 from "../../assets/images/user-avatar.png";
import { profile } from '../../helpers/fakebackend_helper';

export default function ProfileAccount() {
  const { t, i18n } = useTranslation();
  document.title = t("ProfileDropdown.Profile");
  const [profileData, setProfileData] = useState();
  const [loadingProfile, setLoadingProfile] = useState(false);

  const [userDataModal, setUserDataModal] = useState(false);

  const roleCheckChangePassword = checkUserRoles(
    "Auth_private",
    "Auth_private_change_password"
  );
  const getProfileData = async () => {
    try {
      setLoadingProfile(true);
      
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const data ={id: Number(authUser?.id) }
      const response = await profile(data); 
      if(response){
        const phone = response?.phone?.replace(/^\(\+20\)/, "");
        setProfileData((prev) => {
          return {
            name: response?.first_name + " " + response?.last_name,
            phone: phone,
            email: response?.email,
            phone_code_id: "996",
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
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("ProfileDropdown.Settings")}
            subTitle={t("ProfileDropdown.Settings")}
            pageTitle={t("ProfileDropdown.Profile")}
          />
          {loadingProfile?
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: 200,
              }}
            >
              <ButtonLoader
                color="#0d6efd"
                width="70"
                height="70"
              />
            </div>  
            : <div
              style={{ display: "grid", placeItems: "center" }}
            >
              <div style={{ width: "350px" }}>
                <Card style={{ minHeight: "330px", height: "100%" }}>
                  <CardBody
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      gap: "9px",
                      paddingBottom: "14%",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{ aspectRatio: "1 / 1", width: "150px", height: "150px" }}
                      >
                        <img
                          src={
                            profileData?.avatar || "https://via.placeholder.com/100x100"
                          }
                          alt="Fake img"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "50%",
                          }}
                        />
                      </div>

                      <div
                        style={{
                          border: "1px solid rgba(234, 236, 237, 1)",
                          borderRadius: "50%",
                          padding: "7px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "35px",
                          height: "35px",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setUserDataModal(true);
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.53999 19.5235C4.92999 19.5235 4.35999 19.3135 3.94999 18.9235C3.42999 18.4335 3.17999 17.6935 3.26999 16.8935L3.63999 13.6535C3.70999 13.0435 4.07999 12.2335 4.50999 11.7935L12.72 3.10347C14.77 0.933467 16.91 0.873467 19.08 2.92347C21.25 4.97347 21.31 7.11347 19.26 9.28347L11.05 17.9735C10.63 18.4235 9.84999 18.8435 9.23999 18.9435L6.01999 19.4935C5.84999 19.5035 5.69999 19.5235 5.53999 19.5235ZM15.93 2.91347C15.16 2.91347 14.49 3.39347 13.81 4.11347L5.59999 12.8135C5.39999 13.0235 5.16999 13.5235 5.12999 13.8135L4.75999 17.0535C4.71999 17.3835 4.79999 17.6535 4.97999 17.8235C5.15999 17.9935 5.42999 18.0535 5.75999 18.0035L8.97999 17.4535C9.26999 17.4035 9.74999 17.1435 9.94999 16.9335L18.16 8.24347C19.4 6.92347 19.85 5.70347 18.04 4.00347C17.24 3.23347 16.55 2.91347 15.93 2.91347Z"
                            fill="#1C2B32"
                          />
                          <path
                            d="M17.3399 10.9528C17.3199 10.9528 17.2899 10.9528 17.2699 10.9528C14.1499 10.6428 11.6399 8.27278 11.1599 5.17278C11.0999 4.76278 11.3799 4.38278 11.7899 4.31278C12.1999 4.25278 12.5799 4.53278 12.6499 4.94278C13.0299 7.36278 14.9899 9.22278 17.4299 9.46278C17.8399 9.50278 18.1399 9.87278 18.0999 10.2828C18.0499 10.6628 17.7199 10.9528 17.3399 10.9528Z"
                            fill="#1C2B32"
                          />
                          <path
                            d="M21 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H21C21.41 21.25 21.75 21.59 21.75 22C21.75 22.41 21.41 22.75 21 22.75Z"
                            fill="#1C2B32"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* ------ الاسم ------ */}
                    <CardText
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                      }}
                    >
                      <span>{t("ProfileDropdown.name")}</span>
                      <span>{profileData?.name}</span>
                    </CardText>

                    {/* ------ رقم الهاتف ------ */}
                    <CardText
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                      }}
                    >
                      <span>{t("ProfileDropdown.phoneNumber")}</span>
                      <span>{profileData?.phone}</span>
                    </CardText>

                    {/* ------ البريد الإلكتروني ------ */}
                    <CardText
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                      }}
                    >
                      <span>{t("ProfileDropdown.email")}</span>
                      <span>{profileData?.email}</span>
                    </CardText>

                    {/* ------ كلمة المرور ------ */}
                    {!roleCheckChangePassword && (
                      <CardText
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "12px",
                        }}
                      >
                        <span>{t("ProfileDropdown.password")}</span>{" "}
                        <span
                          style={{
                            color: "rgba(42, 157, 148, 1)",
                            borderBottom: " 1px solid rgba(42, 157, 148, 1)",
                            fontWeight: "600",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            // setChangePasswordModal(true);
                            // setShowUserModal(true);

                            // setChangePasswordModal(true);
                            // sendOtp();
                          }}
                        >
                          {t("ProfileDropdown.changePassword")}
                        </span>
                      </CardText>
                    )}
                  </CardBody>
                </Card>
              </div>
            </div>
          }
        </Container>
      </div>
    </React.Fragment>
)
}
