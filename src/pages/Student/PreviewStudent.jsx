import React from 'react'

export default function PreviewStudent() {
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
