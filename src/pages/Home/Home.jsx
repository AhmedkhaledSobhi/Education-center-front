import React, { useEffect, useState } from 'react'
import ButtonLoader from '../../Components/Common/ButtonLoader'
import { useTranslation } from 'react-i18next';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Container } from 'reactstrap';
import logoDark from "../../assets/images/Fatoorah2.png";
// import logoWhite from "../../assets/images/Logo.png";
import logoWhite from "../../assets/images/logo2.svg";

import waving from "../../assets/images/Waving Hand.png";
import { useGetProfile } from '../../helpers/getAllApiSelect';
import MySVG from '../../SVG/SVGIcons';


export default function Home() {
  const { t, i18n } = useTranslation();
  document.title = t("Registers.Center_Educations");
  const [style, setStyle] = useState({ maxWidth: "100%"});
  const [userInfo, setUserInfo] = useState();
  const { data: Profile = [], isLoading: profileLoading } = useGetProfile();

  useEffect(() => {
    if (Profile && Profile?.id !== userInfo?.id) {
      setUserInfo(Profile);
    }
  }, [Profile]);

  useEffect(() => {
    const updateStyle = () => {
      if (window.innerWidth <= 768) {
        setStyle({ maxWidth: "80px", opacity: "0.7" });
      } else {
        setStyle({ maxWidth: "100%", opacity: "0.7" });
      }
    };
    updateStyle();
    window.addEventListener("resize", updateStyle);
    return () => window.removeEventListener("resize", updateStyle);
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("common.main")}
            pageTitle={t("common.main")}
            subTitle={t("common.main")}
          />
          <Card className="p-0 mb-0">
            <CardBody className="d-flex justify-content-between align-items-center">
              <div className="">
                <img
                  // src={logoDark}
                  src={MySVG.logoSm}
                  alt="Center_Education logo"
                  style={{width: "50px", height: "50px"}}
                />
                <div
                  className="fs-4 fw-semibold my-2"
                  style={{ color: "rgba(40, 60, 71, 1)" }}
                >
                  {t("home.Welcome")}
                  {" "}
                  <span 
                    style={{ 
                      color: "rgba(13, 110, 253, 1)",
                      direction: "ltr",
                      unicodeBidi: "isolate",
                   }}
                  >
                    {userInfo?.first_name} {userInfo?.last_name}
                    {" "}
                  </span>
                  <img
                    src={waving}
                    alt="waving"
                    className="ms-1"
                  />
                  
                </div>
                <div className="fs-5 pe-3">{t("home.Center_Education")}</div>
              </div>
              <img
                style={style}
                src={logoWhite}
                alt="Center_Education logo"
              />
            </CardBody>
          </Card>
          {true && (
            <div className='d-flex align-items-center justify-content-center  ' style={{width: "100%", height: "50vh"}}>  
              <div >
                <h1 style={{color: '#0d6efd'}}>Welcome {t("Registers.Center_Education")}</h1>     
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
                    width="100"
                    height="100"
                  />
                </div>  
              </div>
            </div>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}