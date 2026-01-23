import React, { useEffect } from "react";
import logo from './logo.svg';
// import './App.css';
import './assets/scss/themes.scss';
import "rsuite/dist/rsuite.min.css";

import Route from "./Routes";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";

import configService from "./helpers/config";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n && i18n.language ? i18n.language : "ar";
    const dir = lang.startsWith("ar") ? "rtl" : "ltr";
    document.body.dir = dir;
    document.documentElement.lang = dir === "ltr" ? "en" : "ar";
    document.documentElement.dir = dir;
  }, [i18n && i18n.language]);



  useEffect(() => {
    if (configService.showElevenlabs === true) {
      const widgetAr = document.getElementById("elevenlabs-widget-ar");
      const widgetEn = document.getElementById("elevenlabs-widget-en");

      if (widgetAr && widgetEn) {
        const isRtl = i18n.dir() === "rtl";

        // Show Arabic widget when RTL, English widget when LTR
        widgetAr.style.display = isRtl ? "block" : "none";
        widgetEn.style.display = isRtl ? "none" : "block";
      }
    }
  }, [i18n.dir()]);

  return (
    <React.Fragment>
      <ToastContainer />
      <Route />
    </React.Fragment>
  );
}

export default App;
