import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import i18n from "../../i18n";
import i18next from "i18next";
import languages from "../../common/languages";

const LanguageDropdown = () => {
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("I18N_LANGUAGE") ?? "ar"
  );

  useEffect(() => {
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
    setSelectedLang(currentLanguage);
  }, []);

  const changeLanguageAction = (lang) => {
    i18n.changeLanguage(lang);
    i18next.changeLanguage(lang);
    localStorage.setItem("I18N_LANGUAGE", lang);
    setSelectedLang(lang);
  };

  const [isLanguageDropdown, setIsLanguageDropdown] = useState(false);
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdown(!isLanguageDropdown);
  };

  const get = (obj, path, defaultValue = undefined) => {
    return (
      path
        .split(".")
        .reduce(
          (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
          obj
        ) ?? defaultValue
    );
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isLanguageDropdown}
        toggle={toggleLanguageDropdown}
        className="ms-1 topbar-head-dropdown header-item"
      >
        <DropdownToggle
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
          tag="button"
        >
          <img
            src={get(languages, `${selectedLang}.flag`)}
            alt="Header Language"
            height="20"
            className="rounded"
          />
        </DropdownToggle>
        <DropdownMenu className="notify-item language py-2">
          {Object.keys(languages).map((key) => (
            <DropdownItem
              style={{
                display: "flex",
                justifyContent: "space-around",
                direction: "rtl",
              }}
              key={key}
              onClick={() => changeLanguageAction(key)}
              className={`notify-item ${
                selectedLang === key ? "active" : "none"
              }`}
            >
              <img
                src={get(languages, `${key}.flag`)}
                alt="Skote"
                className="me-2 rounded"
                height="18"
              />
              <span className="align-middle">
                {get(languages, `${key}.label`)}
              </span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default LanguageDropdown;
