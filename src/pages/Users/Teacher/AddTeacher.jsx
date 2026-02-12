import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import { useTranslation } from 'react-i18next';

export default function AddTeacher() {
  const { t, i18n } = useTranslation();
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("LayoutMenuData.Users")}
            subTitle={t("LayoutMenuData.Users")}
            pageTitle={t("Teacher.Teachers")}
            pageTitleLink={"/teacher"}
            subPageTitle={t("Teacher.AddTeacher")}
          />
          
        </Container>
      </div>
    </React.Fragment>
  )
}
