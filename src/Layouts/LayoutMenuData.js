import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { checkModuleExists, checkUserRoles } from "../helpers";
// import { CartContext } from "../Context/CartContext";

//Import Icons
import { BiCategory } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { GiSettingsKnobs } from "react-icons/gi";
import { CiMonitor } from "react-icons/ci";
import { AiFillDollarCircle, AiOutlinePoundCircle } from "react-icons/ai";
import { LuBaggageClaim } from "react-icons/lu";
import { IoCubeOutline } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { TbCalculatorFilled } from "react-icons/tb";
import { LuUserSquare2 } from "react-icons/lu";
import { IoBarChartOutline } from "react-icons/io5";
import { FaCalculator } from "react-icons/fa6";
import { RiFileExcel2Line } from "react-icons/ri";

const Navdata = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const loginType = localStorage.getItem("loginType") || "admin";
  const authUser = JSON.parse(localStorage.getItem("authUser"))?.client_id;
  const roleData = JSON.parse(localStorage.getItem("role") || "{}");
  const mainAdmin = roleData?.mainAdmin;

  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);
  const [isCustomers, setIsCustomers] = useState(false);

  const [isExpenses, setIsExpenses] = useState(false);
  const [PaymentGateway, setPaymentGateway] = useState(false);  
  const [isUsers, setisUsers] = useState(false);
  const [isJobList, setIsJobList] = useState(false);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }

    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    
    if (iscurrentState !== "isUsers") {
      setisUsers(false);
    }

    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }

    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    
    if (iscurrentState !== "Customers") {
      setIsCustomers(false);
    }
    
    if (iscurrentState !== "Expenses") {
      setIsExpenses(false);
    }
    
    if (iscurrentState !== "Payment_gateway") {
      setPaymentGateway(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isUsers,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
    isCustomers,
    // ctx,
    isExpenses,
    PaymentGateway,
    checkModuleExists,
  ]);

  // ------------------ بدا شيفت جديد ------------------
  const isPosExists = checkModuleExists("teacher");
  // ------------------ مدرس ------------------
  const isTeacher = checkModuleExists("teacher");
  // ------------------ مدرس ------------------
  const isStudent = checkModuleExists("student");
  // ------------------ Assistant ------------------
  const isAssistant = checkModuleExists("assistant");


  //others
  const isPagesExists = checkModuleExists("pages");

  // E-Payment module checks

  const isPaymentLinkExists = checkUserRoles(
    "E-Payment",
    "create_payment_link",
    mainAdmin
  );



  const menuItems = [
    // ------ الرئيسية ------
    {
      id: "dashboard",
      label: t("LayoutMenuData.main"),
      icon: <BiCategory className="fs-22" />,
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "Home",
          label: t("LayoutMenuData.main"),
          link: "/Home",
        },
      ].filter(Boolean),
    },
    // ------ المستخدمين ------
    {
      id: "Users",
      label: "LayoutMenuData.Users",
      icon: <HiUserGroup className="fs-22" />,
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setisUsers(!isUsers);
        setIscurrentState("isUsers");
        updateIconSidebar(e);
      },
      stateVariables: isUsers,
      subItems: [
        {
          id: "Teacher",
          label: "LayoutMenuData.Teachers",
          link: "/teacher",
        },
        {
          id: "Student",
          label: t("LayoutMenuData.Students"),
          link: "/student",
        },
        {
          id: "Assistant",
          label: t("LayoutMenuData.Assistants"),
          link: "/assistant",
        },

        isPosExists && {
          id: "assets",
          label: t("LayoutMenuData.POSsettings"),
          link: "/pos-settings",
        },
      ].filter(Boolean),
    },
    // ------ الإعدادات ------
    {
      id: "setting",
      label: t("LayoutMenuData.Setting"),
      icon: <GiSettingsKnobs className="fs-22" />,
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsJobList(!isJobList);
        setIscurrentState("JobsList");
        updateIconSidebar(e);
      },
      stateVariables: isJobList,
      subItems: [
        {
          id: "setting",
          label: t("LayoutMenuData.rolesPermissions"),
          link: "/user-roles",
        },
        {
          id: "setting",
          label: t("LayoutMenuData.Section"),
          link: "/section",
        },
      ].filter(Boolean),
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
