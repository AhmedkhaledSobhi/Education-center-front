import React from 'react'
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb'
import { useTranslation } from 'react-i18next';

export default function AddStudent() {
  const { t, i18n } = useTranslation();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("LayoutMenuData.Users")}
            subTitle={t("LayoutMenuData.Users")}
            pageTitle={t("Student.Students")}
            pageTitleLink={"/student"}
            subPageTitle={t("Student.AddStudent")}
          />
          
        </Container>
      </div>
    </React.Fragment>
  )
}
