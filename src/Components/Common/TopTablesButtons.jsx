import React from 'react'
import { useTranslation } from 'react-i18next';
import ButtonComponent from './ButtonComponent';
import MySVG from '../../SVG/SVGIcons';
import { Col, Row } from 'reactstrap';

export default function TopTablesButtons({
  PageTittle,
  addTitle,
  link,
  information,
}) {
  const { t, i18n } = useTranslation();

  return (
    <React.Fragment>
      <Row>
        <Col
          style={{ width: "96%", margin: "auto" }}
          xs={11}
          xl={12}
        >
          <div className="page-title-box mt-1 " style={{borderRadius: "15px"}}>
            <div
              className=" new-card-header jus-end my-2 mobile-card"
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="title mobile-title">
                {PageTittle ?? t("common.edit")}
              </div>
              <div className="new-card-info">
                {addTitle && link &&(
                  <ButtonComponent
                    nameBtn={addTitle}
                    className={"drop-down-save mobile-button mx-1"}
                    classNameImage={"hide-on-mobile"}
                    img={MySVG.Plus}
                    onClick={link}
                    styleImg={"brightness(0) invert(1)"}
                    // disabled={loadsave}
                  />
                )}
                {information && (
                  <ButtonComponent
                    className={"info-icon mobile-button hide-on-mobile"}
                    icon={"ri-information-line"}
                    onClick={information}
                    classNameImage={""}
                    nameBtn={""}
                    styleImg={""}
                    loading={""}
                  />
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}
