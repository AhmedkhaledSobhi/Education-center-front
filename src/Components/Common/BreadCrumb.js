import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

const BreadCrumb = ({
  title,
  pageTitle,
  subTitleLink,
  subPageTitle,

  subPageTitleLink,
  pageTitleLink,
  subTitle,
}) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box ">
            <Row>
              <h5 className="text- secondary mb-sm-0">{title}</h5>
            </Row>
            <div className="page-title-left mt-2">
              <ol className="breadcrumb m-0">
                {subTitle && (
                  <li className="breadcrumb-item ">
                    <Link to={subTitleLink ?? "#"}>{subTitle}</Link>
                  </li>
                )}
                {pageTitle && (
                  <li
                    className={
                      subPageTitle
                        ? "breadcrumb-item  "
                        : "breadcrumb-item active fw-bold"
                    }
                  >
                    <Link to={pageTitleLink ?? "#"}>{pageTitle}</Link>
                  </li>
                )}
                {subPageTitle && (
                  <li className="breadcrumb-item active fw-bold">
                    <Link to={subPageTitleLink ?? "#"}>{subPageTitle}</Link>
                  </li>
                )}
              </ol>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumb;
