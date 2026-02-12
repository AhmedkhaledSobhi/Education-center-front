import React from 'react'

export default function PreviewTeacher() {
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
