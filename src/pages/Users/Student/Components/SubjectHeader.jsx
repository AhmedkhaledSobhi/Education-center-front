import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

export default function SubjectHeader() {
  const { t } = useTranslation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <React.Fragment>
      <thead>
        <tr>
          <th
            style={{
              width: "10px",
              minWidth: "10px",
            }}
          >
            #
          </th>
          <th
            style={{
              width: "300px",
              minWidth: isSmallScreen ? "300px" : "100px",
              // width: "auto",
            }}
          >
            {t("Student.Name_Subject")}
          </th>

          <th
            style={{
              width: "300px",
              minWidth: "100px",
            }}
          >
            {t("Teacher.teacher")}
          </th>
          <th
            style={{
              width: "300px",
              minWidth: "100px",
            }}
          >
            {t("Student.Course_Price")}
          </th>
          <th
            style={{
              width: "300px",
              minWidth: "150px",
            }}
          >
            {t("common.Description")}
          </th>
        </tr>
      </thead>
    </React.Fragment>
  )
}
