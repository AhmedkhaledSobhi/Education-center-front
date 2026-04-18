import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, CardHeader, Col, Container } from 'reactstrap';
// import logoDark from "../../assets/images/Fatoorah2.png";
// import logoWhite from "../../assets/images/Logo.png";
import logoWhite from "../../assets/images/logo2.svg";

import waving from "../../assets/images/Waving Hand.png";
import { useGetProfile } from '../../helpers/getAllApiSelect';
import MySVG from '../../SVG/SVGIcons';
import PagesCard from '../../Components/Common/PagesCard';
import ComponentLoader from '../../Components/Common/ComponentLoader';


export default function Home() {
  const { t } = useTranslation();
  document.title = t("Registers.Center_Educations");
  const [style, setStyle] = useState({ maxWidth: "100%"});
  const [userInfo, setUserInfo] = useState();
  const { data: Profile = [], isLoading: profileLoading } = useGetProfile();

  useEffect(() => {
    if (Profile && Profile?.id !== userInfo?.id) {
      setUserInfo(Profile);
    }
  }, [Profile, userInfo?.id]);

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

          {profileLoading ? (
            <div className='d-flex align-items-center justify-content-center  ' style={{width: "100%", height: "50vh"}}>  
              <div >
                <h1 style={{color: '#0d6efd'}}>Welcome {t("Registers.Center_Education")}</h1>     
                <ComponentLoader
                  height={200}
                  size={100}
                /> 
              </div>
            </div>
            ) : (
             <>
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

              <Col
                xxl={12}
                className='my-4'
              >
                <Card>
                  <CardHeader>
                    <div className="sub-title">         
                      {t("home.QuickLinks")}
                    </div>
                  </CardHeader>
                  <CardBody
                    style={{
                      paddingTop: "0",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "start",
                      gap: "20px",
                    }}
                  >
                    <PagesCard
                      size={"250px"}
                      paddin={"30px 34px"}
                      icon={
                        <img
                          src={MySVG.Plus}
                          alt="Plus Icon"
                          style={{width: "35px"}}
                        />
                      }
                      title={t("home.AddTeacher")}
                      subTitle={""}
                      link="/addTeacher"
                      soon={false}
                    />
                    <PagesCard
                      size={"250px"}
                      paddin={"30px 34px"}
                      icon={
                        <img
                          src={MySVG.Plus}
                          alt="Plus Icon"
                          style={{width: "35px"}}
                        />
                      }
                      title={t("home.AddStudent")}
                      subTitle={""}
                      link="/addStudent"
                      soon={false}
                    />
                    <PagesCard
                      size={"250px"}
                      paddin={"30px 34px"}
                      icon={
                        <img
                          src={MySVG.Plus}
                          alt="Plus Icon"
                          style={{width: "35px"}}
                        />
                      }
                      title={t("home.AddBranch")}
                      subTitle={""}
                      // link="/add-invoice"
                      soon={true}
                    />
                    <PagesCard
                      size={"250px"}
                      paddin={"30px 34px"}
                      icon={
                        <img
                          src={MySVG.Plus}
                          alt="Plus Icon"
                          style={{width: "35px"}}
                        />
                      }
                      title={t("home.AddAssistant")}
                      subTitle={""}
                      // link="/add-invoice"
                      soon={true}
                    />
                    <PagesCard
                      size={"250px"}
                      paddin={"30px 34px"}
                      icon={
                        <img
                          src={MySVG.Plus}
                          alt="Plus Icon"
                          style={{width: "35px"}}
                        />
                      }
                      title={`${t("common.add")} ${t("home.subject")}`}
                      subTitle={""}
                      // link="/addSubject"
                      soon={true}
                    />
                  </CardBody>
                </Card>
              </Col>

              <Col
                xxl={12}
                className='my-4'
              >
                <Card>
                  <CardHeader>
                    <div className="sub-title">         
                      {t("home.All_premium_services")}
                    </div>
                  </CardHeader>
                  <CardBody
                    style={{
                      paddingTop: "0",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "start",
                      gap: "20px",
                    }}
                  >
                    <PagesCard
                      size={"265px"}
                      paddin={"30px 34px"}
                      icon={
                        <img
                          src={MySVG.Plus}
                          alt="Plus Icon"
                          style={{width: "35px"}}
                        />
                      }
                      title={t("home.AddTeacher")}
                      subTitle={t("محاضرات واختبارات ")}
                      link="/addTeacher"
                      soon={false}
                    /> 
                  </CardBody>
                </Card>
              </Col>
             </> 
            )
          }
        </Container>
      </div>
    </React.Fragment>
  )
}