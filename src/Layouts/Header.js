import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Form,
} from "reactstrap";

//import images
import logoSm from "../assets/images/logo-sm.png";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";

//import Components
import LanguageDropdown from "../Components/Common/LanguageDropdown";
import FullScreenDropdown from "../Components/Common/FullScreenDropdown";
import NotificationDropdown from "../Components/Common/NotificationDropdown";
import LightDark from "../Components/Common/LightDark";
import ProfileDropdown from "../Components/Common/ProfileDropdown";
// import HeaderChatButton from "../Components/ChatWidget/HeaderChatButton";
import avatar1 from "../assets/images/user-avatar.png";
import { changeSidebarVisibility } from "../slices/thunks";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { profile } from "../helpers/fakebackend_helper";
import { useTranslation } from "react-i18next";
import { IoReload } from "react-icons/io5";
import i18n from "../i18n";

const Header = ({ onChangeLayoutMode, layoutModeType, headerClass }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectDashboardData = createSelector(
    (state) => state.Layout.sidebarVisibilitytype,
    (sidebarVisibilitytype) => sidebarVisibilitytype
  );
  // Inside your component
  const sidebarVisibilitytype = useSelector(selectDashboardData);

  const [userInfo, setUserInfo] = useState();

  const getProfileData = async () => {
    try {
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const data ={id: Number(authUser?.id) }
      if(authUser?.id){
        const res = await profile(data);
        setUserInfo(res);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProfileData();
  }, [localStorage.getItem("authUser")]);

  const [search, setSearch] = useState(false);
  const toogleSearch = () => {
    setSearch(!search);
  };

  const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth;
    dispatch(changeSidebarVisibility("show"));

    if (windowSize > 767)
      document.querySelector(".hamburger-icon").classList.toggle("open");

    //For collapse horizontal menu
    if (document.documentElement.getAttribute("data-layout") === "horizontal") {
      document.body.classList.contains("menu")
        ? document.body.classList.remove("menu")
        : document.body.classList.add("menu");
    }

    //For collapse vertical and semibox menu
    if (
      sidebarVisibilitytype === "show" &&
      (document.documentElement.getAttribute("data-layout") === "vertical" ||
        document.documentElement.getAttribute("data-layout") === "semibox")
    ) {
      if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "sm"
          ? document.documentElement.setAttribute("data-sidebar-size", "")
          : document.documentElement.setAttribute("data-sidebar-size", "sm");
      } else if (windowSize > 1025) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "lg"
          ? document.documentElement.setAttribute("data-sidebar-size", "sm")
          : document.documentElement.setAttribute("data-sidebar-size", "lg");
      } else if (windowSize <= 767) {
        document.body.classList.add("vertical-sidebar-enable");
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
    }

    //Two column menu
    if (document.documentElement.getAttribute("data-layout") === "twocolumn") {
      document.body.classList.contains("twocolumn-panel")
        ? document.body.classList.remove("twocolumn-panel")
        : document.body.classList.add("twocolumn-panel");
    }
  };

  const location = useLocation();

  // Access the current route link
  const currentPath = location.pathname;
  useEffect(() => {
    var windowSize = document.documentElement.clientWidth;
    if (windowSize <= 767) {
      document.body.classList.remove("vertical-sidebar-enable");
    }
  }, [currentPath]);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleReload = async () => {
    try {
      
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      const data ={id: Number(authUser?.id) }
      const res = await profile(data);

      // localStorage.removeItem("packages");
      // localStorage.setItem("packages", JSON.stringify(res?.data));
      
      localStorage.setItem("authUser", JSON.stringify(res));
      localStorage.setItem("userInfo", JSON.stringify(res));
      localStorage.setItem("myInfo", JSON.stringify(res));
      localStorage.setItem("role", JSON.stringify(res?.role));
      window.location.reload();
    } catch (error) {}
  };

  const handleImageError = (event) => {
    event.target.src = avatar1;
    event.target.alt = "placeholder-image";
  };

  return (
    <React.Fragment>
      <header
        id="page-topbar"
        className={
          document.documentElement.dir == "rtl"
            ? headerClass
            : "page-topbar-ltr"
        }
      >
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box horizontal-logo">
                <Link
                  to="/"
                  className="logo logo-dark"
                >
                  <span className="logo-sm">
                    <img
                      src={logoSm}
                      alt=""
                      height="22"
                    />tt
                  </span>
                  <span className="logo-lg">
                    <img
                      src={logoDark}
                      alt=""
                      height="17"
                    />rr
                  </span>
                </Link>

                <Link
                  to="/"
                  className="logo logo-light"
                >
                  <span className="logo-sm">
                    <img
                      src={logoSm}
                      alt=""
                      height="22"
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src={logoLight}
                      alt=""
                      height="17"
                    />
                  </span>
                </Link>
              </div>

              {/* hamburger-icon */}
              <button
                onClick={toogleMenuBtn}
                type="button"
                className={`btn btn-sm ps3 fs-16 header-item vertical-menu-btn topnav-hamburger ${isSmallScreen ? (i18n?.language == "en" ? "ps-3" : "pe-3") : "px-3"}`}
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
              <div
                className={`dropdown-header d-flex gap-1 align-items-center ${isSmallScreen ? " mx-0 px-0 flexcolumn" : ""} `}
              >
                <div className="container-header-profile-user overflow-hidden me-1  ">
                  <img
                    className="roundedcircle header-profile-user header-profile-user-sm me2"
                    src={
                      userInfo?.image_path
                        ? userInfo?.image_path
                        : avatar1
                    }
                    alt="Header Avatar"
                    style={{
                      maxWidth: isSmallScreen ? "30px !important" : "",
                      minWidth: isSmallScreen ? "10px !important" : "",
                      borderRadius: isSmallScreen ? "10%" : "",
                    }}
                    onError={handleImageError}
                  />
                </div>

                <div className="d-flex">
                  <div
                    style={{
                      fontSize: isSmallScreen ? "15px" : "",
                      textAlign: isSmallScreen ? "center" : "right",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "700",
                        fontSize: "10px",
                        marginBottom: "3px",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      {isSmallScreen
                        ? userInfo
                          ?(() => {
                              const words =
                                userInfo?.first_name
                                  ?.trim()
                                  .split(" ") || [];
                              const word =
                                userInfo?.last_name
                                  ?.trim()
                                  .split(" ") || [];    
                              const secondWord = word[0] || "";
                              const firstLetter = words[0] || "";
                              return (
                                <>
                                  {firstLetter } 
                                  {secondWord}
                                </>
                              );
                            })()
                          : t("ProfileDropdown.CompanyNameNotAvailable")
                        : ((userInfo?.first_name ) ? userInfo?.first_name + " " + userInfo?.last_name : t("common.Welcome_to"))}
                      {userInfo?.id && (
                        <span>{`( ${userInfo?.id} )`}</span>
                      )}
                    </div>

                    <div
                      style={{
                        color: "rgba(111, 124, 132, 1)",
                        fontSize: "10px",
                      }}
                    >
                      {t("common.Platform")} {" "} {t("Registers.Center_Educations")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <Dropdown
                isOpen={search}
                toggle={toogleSearch}
                className="d-md-none topbar-head-dropdown header-item"
              >
                <DropdownToggle
                  type="button"
                  tag="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                >
                  <i className="bx bx-search fs-22"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                  <Form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          aria-label="Recipient's username"
                        />
                        <button
                          className="btn btn-primary"
                          type="submit"
                        >
                          <i className="mdi mdi-magnify"></i>
                        </button>
                      </div>
                    </div>
                  </Form>
                </DropdownMenu>
              </Dropdown>

              <button
                onClick={handleReload}
                type="button"
                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              >
                <IoReload className="fs-22"
                  style={{color: "#0d6efd"}}
                />
              </button>

              {/* LanguageDropdown */}
              <LanguageDropdown />

              {/* FullScreenDropdown */}
              <FullScreenDropdown />

              {/* Dark/Light Mode set */}
              {/* <LightDark
                layoutMode={layoutModeType}
                onChangeLayoutMode={onChangeLayoutMode}
              /> */}

              {/* NotificationDropdown */}
              {/* <NotificationDropdown /> */}

              {/* ProfileDropdown */}
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
