import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import axios from "axios";

//import images
import avatar1 from "../../assets/images/user-avatar.png";
import { getLoggedInUser, logout, profile } from "../../helpers/fakebackend_helper";
import { useTranslation } from "react-i18next";
// import { CartContext } from "../../Context/CartContext.jsx";
import { checkUserRoles } from "../../helpers/index.js";
import i18n from "../../i18n.js";
// import { useMediaQuery } from "@mui/material";
import { performLogoutCleanup } from "../../helpers/logoutCleanup";
import MySVG from "../../SVG/SVGIcons";
import { useGetProfile } from "../../helpers/getAllApiSelect.js";

const ProfileDropdown = () => {
  const nav = useNavigate();
  const { t } = useTranslation();
  // const { profileData } = useContext(CartContext);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  const { data: Profile = [], isLoading: profileLoading } = useGetProfile();
  const userInfo = Profile

  // ____________/ old \____________
  // const [userInfo, setUserInfo] = useState();
  // const getProfileData = async () => {
  //   try {
  //     const user = getLoggedInUser();
  //     const data ={id: Number(user?.id) }
  //     if (user) {
  //       const response = await profile(data);
  //       if (response) {
  //         setUserInfo(response?.data);
  //       }
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   if (Profile && Profile?.id !== userInfo?.id) {
  //     setUserInfo(Profile);
  //   }
  // }, [Profile]);

  const handleLogOut = async () => {
    // logout()
    //   .then((res) => {
    //     if (res && res.status) {
    //       // performLogoutCleanup();
    //       nav("/login");
    //     }
    //   })
    //   .catch((error) => {});
    performLogoutCleanup();
    nav("/login");
  };
  
  const handleExternalLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // _________________________________________________________________________________________________

  const checkUpgradeUserRole = checkUserRoles(
    "Auth_private",
    "Auth_private_upgradeUser"
  );
  const roleCheckChangePassword = checkUserRoles(
    "Auth_private",
    "Auth_private_change_password"
  );

  // _________________________________________________________________________________________________

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className={`topbar-head-dropdown ms1  header-item ${isSmallScreen ? "px-0" : "ms-1"}`}
        style={{
          maxWidth: isSmallScreen ? "120px" : "",
        }}
      >
        <DropdownToggle
          tag="button"
          type="button"
          className={`btn p-0  ${isSmallScreen ? "" : "pe-2 ps-1"}`}
        >
          <div
            className={`dropdown-header d-flex align-items-center ${isSmallScreen ? " mx-0 px-0 flexcolumn" : ""} `}
          >
            <div className="container-header-profile-user overflow-hidden me-1  ">
              <img
                className="roundedcircle header-profile-user header-profile-user-sm me2"
                src={userInfo?.image_path ? `http://localhost:5173/api/${userInfo?.image_path}` : avatar1}
                alt="Header Avatar"
                style={{
                  maxWidth: isSmallScreen ? "30px !important" : "",
                  minWidth: isSmallScreen ? "10px !important" : "",
                  borderRadius: isSmallScreen ? "10%" : "",
                }}
              />
            </div>
            <div className="ms1">
              {isProfileDropdown ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5891 13.0841C15.9145 13.4095 15.9145 13.9371 15.5891 14.2625C15.2637 14.5879 14.736 14.5879 14.4106 14.2625L9.99984 9.85179L5.58909 14.2625C5.26366 14.5879 4.73602 14.5879 4.41058 14.2625C4.08514 13.9371 4.08514 13.4095 4.41058 13.0841L9.70521 7.78947C9.86793 7.62675 10.1317 7.62675 10.2945 7.78947L15.5891 13.0841Z"
                    fill="#0d6efd"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.5891 6.91595C15.2637 6.59052 14.736 6.59052 14.4106 6.91595L9.99984 11.3267L5.58909 6.91595C5.26366 6.59052 4.73602 6.59052 4.41058 6.91595C4.08514 7.24139 4.08514 7.76903 4.41058 8.09446L9.70521 13.3891C9.86793 13.5518 10.1317 13.5518 10.2945 13.3891L15.5891 8.09446C15.9145 7.76903 15.9145 7.24139 15.5891 6.91595Z"
                    fill="#0d6efd"
                  />
                </svg>
              )}
            </div>
          </div>
        </DropdownToggle>
        <DropdownMenu
          className="dropdown-menu-end p-0 mt-2"
          style={{ width: "200px" }}
        >
          {/* ------ مرحباً بك ------ */}
          <DropdownItem className="p-0 pe-2 ps-1">
            <div className="dropdown-header d-flex align-items-center gap-2">
              <img
                src={MySVG.Point}
                alt="Point"
              />
              <div>
                <div
                  style={{
                    fontSize: "10px",
                    textAlign: "justify"
                  }}
                >
                  {t("ProfileDropdown.Welcome")}
                </div>
                <div
                  style={{
                    width: "120px",
                    textAlign: "justify"
                  }}
                >
                  <span
                    style={{
                      display: "b lock",
                    }}
                  >
                    {/* First part */}
                    {userInfo?.first_name?.split(" ").slice(0, 3).join(" ")}{" "}
                  </span>
                  <span
                    style={{
                      display: "b lock",
                    }}
                  >
                    {/* Remaining parts */}
                    {/* {userInfo?.last_name?.split(" ").slice(3).join(" ")}{" "} */}
                    {userInfo?.last_name?.split(" ").slice(0, 3).join(" ")}{" "}
                  </span>
                </div>
              </div>
            </div>
          </DropdownItem>

          {/* ------ الملف الشخصي ------ */}
          <div className="dropdown-divider m-0"></div>
          <DropdownItem className="p-0 pe-2 ps-1">
            <Link
              to={"/profile"}
              className="dropdown-item p-0"
            >
              <div className="dropdown-header d-flex align-items-center gap-2">
                <img
                  src={MySVG.Profile}
                  alt="Profile"
                />
                <div>
                  <div
                    style={{
                      color: "rgba(40, 60, 71, 1)",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    {t("ProfileDropdown.Profile")}
                  </div>
                </div>
              </div>
            </Link>
          </DropdownItem>

          {/* ------ الترقيات والاشتراكات ------ */}
          <div className="dropdown-divider m-0"></div>
          <div className="soon-parent">
            <DropdownItem disabled className="p-0 pe-2 ps-1 ">
              <Link
                to={"/upgrades-subscriptions"}
                className="dropdown-item p-0"
              >
                <div className="dropdown-header d-flex align-items-center gap-2">
                  <img
                    src={MySVG.UpgradesSubscriptions}
                    alt="UpgradesSubscriptions"
                  />
                  <div>
                    <div
                      style={{
                        color: "rgba(40, 60, 71, 1)",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                    >
                      {t("ProfileDropdown.UpgradesAndSubscriptions")}
                    </div>
                  </div>
                </div>
              </Link>
              <span className="soon-container">
                {t("common.soon")}
              </span>
            </DropdownItem>
          </div>
           
          {/* ------ تغيير كلمة المرور ------ */}
          <div className="dropdown-divider m-0"></div>
          <DropdownItem disabled className="p-0 pe-2 ps-1 soon-parent">
            <Link
              to={"/user-account"}
              className="dropdown-item p-0"
            >
              <div className="dropdown-header d-flex align-items-center gap-2">
                <img
                  src={MySVG.changePassword}
                  alt="changePassword"
                />
                <div>
                  <div
                    style={{
                      color: "rgba(40, 60, 71, 1)",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    {t("ProfileDropdown.changePassword")}
                  </div>
                </div>
              </div>
            </Link>
            <span className="soon-container">
              {t("common.soon")}
            </span>
          </DropdownItem>

          {/* ------ المساعد ------ */}
          <div className="dropdown-divider m-0"></div>
          <DropdownItem disabled className="p-0 pe-2 ps-1 soon-parent">
            <Link
              onClick={() =>
                handleExternalLink(
                  "https://api.whatsapp.com/send?phone=201026496334"
                  // "https://wa.me/201026496334?text=مرحبا%20أريد%20التواصل"
                )
              }
              rel="noopener noreferrer"
              className="dropdown-item p-0"
            >
              <div className="dropdown-header d-flex align-items-center gap-2">
                <img
                  src={MySVG.Help}
                  alt="Help"
                />
                <div>
                  <div
                    style={{
                      color: "rgba(40, 60, 71, 1)",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    {t("ProfileDropdown.Help")}
                  </div>
                </div>
              </div>
            </Link>
            <span className="soon-container">
              {t("common.soon")}
            </span>
          </DropdownItem>

          {/* ------ إعدادات الحساب ------ */}
          <div className="dropdown-divider m-0"></div>
          <DropdownItem className="p-0 pe-2 ps-1">
            <Link
              to={"/user-account"}
              className="dropdown-item p-0"
            >
              <div className="dropdown-header d-flex align-items-center gap-2">
                <img
                  src={MySVG.Settings}
                  alt="Settings"
                />
                <div >
                  <div
                    style={{
                      color: "rgba(40, 60, 71, 1)",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    {t("ProfileDropdown.accountSettings")}
                  </div>
                </div>
              </div>
            </Link>
          </DropdownItem>
          {/* ------ تسجيل خروج ------ */}
          <div className="dropdown-divider m-0"></div>
          <DropdownItem
            className="p-0"
            onClick={handleLogOut}
          >
            <Link
              to={""}
              className="dropdown-item d-flex align-items-center justify-content-center"
              style={{ padding: "11px 0" }}
            >
              <span
                className="align-middle"
                data-key="t-logout"
                style={{
                  color: "rgba(111, 124, 132, 1)",
                  fontSize: "12px",
                }}
              >
                {t("ProfileDropdown.Logout")}
              </span>
              <div>
                {i18n?.language == "ar" ? (
                  <span className="mdi mdi-arrow-left-thin text-muted  px-1"></span>
                ) : (
                  <span className="mdi mdi-arrow-right-thin text-muted px-1"></span>
                )}
              </div>
            </Link>
          </DropdownItem>

        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
