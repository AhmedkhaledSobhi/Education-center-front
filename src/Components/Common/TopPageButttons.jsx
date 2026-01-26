import React from 'react'
import ButtonComponent from './ButtonComponent';
import MySVG from '../../SVG/SVGIcons';
import { useTranslation } from 'react-i18next';

export default function TopPageButttons({
  PageTittle,
  handleSave,
  loadsave,
  handleSaveDraft,
  loadsaveDraft,
  close,
  information,

}) {
  const { t, i18n } = useTranslation();

  return (
    <React.Fragment>
      <div
        className="new-card-header jus-end mb-3 mobile-card"
        style={{
          justifyContent: "space-between",
        }}
      >
        <div className="title mobile-title">
          {PageTittle ?? t("common.edit")}
        </div>
        <div className="new-card-info">
          {handleSave && (
            <ButtonComponent
              nameBtn={t("common.SaveNew")}
              className={"drop-down-save mobile-button mx-1"}
              classNameImage={"hide-on-mobile"}
              img={MySVG.save}
              onClick={handleSave}
              styleImg={"brightness(0) invert(1)"}
              loading={loadsave}
              disabled={loadsave}
            />
          )}

          {handleSaveDraft && (
            <ButtonComponent
              nameBtn={t("common.SaveAsADraft")}
              className={"add-product-new-table mobile-button hide-on-mobile mx-1"}
              classNameImage={"hide-on-mobile"}
              img={MySVG.saveDraft}
              onClick={handleSaveDraft}
              styleImg={
                "invert(61%) sepia(88%) saturate(4762%) hue-rotate(196deg) brightness(92%) contrast(101%)"
              }
              loading={loadsaveDraft}
              disabled={loadsave || loadsaveDraft}
              colorLoading={"#00a598"}
            />
          )}
          {close && (
            <ButtonComponent
              nameBtn={t("common.cancel")}
              className={"add-product-new-table mobile-button hide-on-mobile mx-1"}
              classNameImage={"hide-on-mobile"}
              icon={" ri-close-circle-line"}
              onClick={close}
              iconStyle={{ fontSize: "20px", fontWeight: 500, }}
              loading={loadsaveDraft}
              disabled={loadsave || loadsaveDraft}
              style={{ color: "#D60000", borderColor: "#D60000", padding: "8px 18px" }}
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
    </React.Fragment>      
  )
}
