import React, { useState } from 'react'
import ButtonLoader from '../../Components/Common/ButtonLoader'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { Container } from 'reactstrap'
import { useTranslation } from 'react-i18next';

export default function Assistant() {
  const { t, i18n } = useTranslation();
  const [loadingProfile, setLoadingProfile] = useState(true);


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("LayoutMenuData.Users")}
            subTitle={t("LayoutMenuData.Users")}
            pageTitle={t("LayoutMenuData.Assistants")}
          />
          {loadingProfile?
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
                width="70"
                height="70"
              />
            </div>
            :<div> </div>            
          }
        </Container>
      </div>
    </React.Fragment>
  )
}
