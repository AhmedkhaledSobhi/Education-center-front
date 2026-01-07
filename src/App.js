import React, { useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import './assets/scss/themes.scss';
import Route from "./Routes";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";


function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n && i18n.language ? i18n.language : "ar";
    const dir = lang.startsWith("ar") ? "rtl" : "ltr";
    document.body.dir = dir;
    document.documentElement.lang = dir === "ltr" ? "en" : "ar";
    document.documentElement.dir = dir;
  }, [i18n && i18n.language]);
  
  return (
    <React.Fragment>
      <ToastContainer />
      <Route />
    </React.Fragment>
  );
}

export default App;
