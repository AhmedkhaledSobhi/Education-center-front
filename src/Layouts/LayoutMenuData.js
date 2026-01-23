import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Import Icons
import { BiCategory } from "react-icons/bi";
import { CiMonitor } from "react-icons/ci";
import { AiFillDollarCircle, AiOutlinePoundCircle } from "react-icons/ai";
import { LuBaggageClaim } from "react-icons/lu";
import { IoCubeOutline } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi";
import { TbCalculatorFilled } from "react-icons/tb";
import { LuUserSquare2 } from "react-icons/lu";
import { IoBarChartOutline } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { checkModuleExists, checkUserRoles } from "../helpers";
// import { CartContext } from "../Context/CartContext";
import { FaCalculator } from "react-icons/fa6";
import { RiFileExcel2Line } from "react-icons/ri";

const Navdata = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const loginType = localStorage.getItem("loginType") || "admin";

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

  const [isHRModule, setIsHRModule] = useState(false);
  const [isHrReports, setIsHrReports] = useState(false);
  const [isHrReports1, setIsHrReports1] = useState(false);
  const [isHrReports2, setIsHrReports2] = useState(false);
  const [isHrReports3, setIsHrReports3] = useState(false);
  const [isHrReports4, setIsHrReports4] = useState(false);
  const [isHrReports5, setIsHrReports5] = useState(false);
  const [isHrReports6, setIsHrReports6] = useState(false);
  const [isHrReports7, setIsHrReports7] = useState(false);
  const [isHrReports8, setIsHrReports8] = useState(false);
  // const ctx = useContext(CartContext);

  // Apps
  const [isEmail, setEmail] = useState(false);
  const [isSubEmail, setSubEmail] = useState(false);
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isExcelExport, setIsExcelExport] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isUsers, setisUsers] = useState(false);
  const [isCRM, setIsCRM] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSupportTickets, setIsSupportTickets] = useState(false);
  const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);

  const [isJobs, setIsJobs] = useState(false);
  const [isJobList, setIsJobList] = useState(false);
  const [isCandidateList, setIsCandidateList] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

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
    if (iscurrentState === "Landing") {
      setIsLanding(false);
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
    if (iscurrentState !== "HR_Module") {
      setIsHRModule(false);
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

  // نقاط البيع
  const isShiftSystemExists = checkModuleExists("shiftsystem");
  const isShiftExists = checkModuleExists("shift");
  // ------------------بدا شيفت جديد
  const isPosExists = checkModuleExists("pos");
  // ------------------اعدادات نقاط البيع
  const isHomeExists = checkModuleExists("home");
  // ------------------ المؤشرات

  //فواتير المبيعات
  const isSaleInvoiceExists = checkModuleExists("sale_invoice");
  const isReturnSaleInvoiceExists = checkModuleExists("returnsaleinvoice");
  const isOfferPriceExists = checkModuleExists("offerprice");

  // المصروفات
  const isExpensesExists = checkModuleExists("Expenses");
  const isExpensesClassificationExists = checkModuleExists(
    "ExpensesClassification"
  );
  // const s3 = checkModuleExists();

  //فواتير المشتريات
  const isBuyInvoiceExists = checkModuleExists("buy_invoice");
  const isReturnBuyInvoiceExists = checkModuleExists("returnbuyinvoice");
  const isBuyOrderExists = checkModuleExists("buyorder");

  //المخزون
  const isProductsExists = checkModuleExists("products");
  const isAdditionWarehouseReceiptExists =
    checkModuleExists("additionwarehousereceipt") ||
    checkModuleExists("dismissalwarehousereceipt");
  const isTransferWarehouseReceiptExists = checkModuleExists(
    "transferwarehousereceipt"
  );
  const isPriceListExists = checkModuleExists("pricelist");
  const isStoreInventoryExists = checkModuleExists("storeinventory");
  const isWorkPlacesExists = checkModuleExists("workplaces");
  const isStocksExists = checkModuleExists("stocks");

  //العملاء
  const isUsersExists = checkModuleExists("users");

  //الموردين
  const isSuppliersExists = checkModuleExists("suppliers");

  //الحسابات العامة
  // ------------------دليل الحسابات
  const isCostCenterExists = checkModuleExists("costcenter");
  const isJournalExists = checkModuleExists("journal");
  const isBondExists = checkModuleExists("bond"); //سند الصرف والقبض
  const isBankAccountExists = checkModuleExists("bankaccount");
  const isDirectAccountExists = checkModuleExists("directaccount"); //توجيه الحسابات العامة

  //المستخدمين
  const isEmployeesExists = checkModuleExists("employees");

  //التقارير
  const isReportsExists = checkModuleExists("Reports");

  //الاعدادات
  const isTaxesExists = checkModuleExists("taxes");
  const isMajorUnitsExists = checkModuleExists("majorunits");
  const isCategoryExists = checkModuleExists("category");
  const isClassificationExists = checkModuleExists("classification");
  const isRolesExists = checkModuleExists("roles");


  //others
  const isDismissalWarehouseReceiptExists = checkModuleExists(
    "dismissalwarehousereceipt"
  );
  const isFinancialPeriodExists = checkModuleExists("financialperiod");
  const isAccountExists = checkModuleExists("account"); // توجيه الحسابات
  const isInstructionExists = checkModuleExists("instruction");
  const isPagesExists = checkModuleExists("pages");
  const isAssetCatsExists = checkModuleExists("asset_cats");

  // E-Payment module checks
  const isEPaymentExists = checkModuleExists("E-Payment");
  const roleData = JSON.parse(localStorage.getItem("role") || "{}");
  const mainAdmin = roleData?.mainAdmin;
  const isPaymentLinkExists = checkUserRoles(
    "E-Payment",
    "create_payment_link",
    mainAdmin
  );

  const authUser = JSON.parse(localStorage.getItem("authUser"))?.client_id;


  const menuItems = [
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
        // {
        //   id: "Assistant",
        //   label: t("LayoutMenuData.Assistants"),
        //   link: "/assistant",
        // },

      ].filter(Boolean),
    },
    
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
        isPosExists && {
          id: "Assistant",
          label: t("LayoutMenuData.Assistants"),
          link: "/Assistant",
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
        isPagesExists && {
          id: "setting",
          label: t("LayoutMenuData.additionalTerms"),
          link: "/additional-items",
        },
      ].filter(Boolean),
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
