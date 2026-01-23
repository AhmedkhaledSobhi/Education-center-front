import React from 'react'
import ButtonLoader from '../../Components/Common/ButtonLoader'
import { useTranslation } from 'react-i18next';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Container } from 'reactstrap';

export default function Home() {
  const { t, i18n } = useTranslation();
  document.title = t("Registers.Center_Educations");

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("common.main")}
            pageTitle={t("common.main")}
            subTitle={t("common.main")}
          />

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