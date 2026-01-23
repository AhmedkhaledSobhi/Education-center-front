import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Container } from 'reactstrap'
import BreadCrumb from '../../Components/Common/BreadCrumb';
import ButtonLoader from '../../Components/Common/ButtonLoader';
import ButtonComponent from '../../Components/Common/ButtonComponent';
import MySVG from '../../SVG/SVGIcons';
import ImageWithLoader from '../../Components/Common/ImageWithLoader';
// import "../../assets/scss/StorePermission.css";

export default function Teacher() {
  const { t, i18n } = useTranslation();
  const [loadingProfile, setLoadingProfile] = useState(true);
  
  return (

    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("LayoutMenuData.Users")}
            subTitle={t("LayoutMenuData.Users")}
            pageTitle={t("LayoutMenuData.Teachers")}
          />
          <div className="new-card-info">
            <ImageWithLoader
              src={"productData?.product?.image"}
              // width={60}
              // height={60}
              className="object-fit-contain"
              alt="images/1.png"
            />
            <ButtonComponent
              nameBtn={t("common.SaveNew")}
              className={"drop-down-save mobile-button mx-1"}
              classNameImage={"hide-on-mobile"}
              img={MySVG.save}
              // onClick={() => {
              //   step < 2
              //     ? setSweetAlertModal(true)
              //     : formSubmitted && handleSaveNew(values);
              // }}
              styleImg={"brightness(0) invert(1)"}
              // loading={loading}
              // disabled={loading || loadingSaveDraft}
            />
            <ButtonComponent
              nameBtn={t("common.SaveAsADraft")}
              className={"add-product-new-table mobile-button hide-on-mobile mx-1"}
              classNameImage={"hide-on-mobile"}
              img={MySVG.saveDraft}
              // onClick={() => {
              //   step < 2
              //     ? setSweetAlertModal(true)
              //     : formSubmittedSaveDraft && handleSaveDraft(values);
              // }}
              styleImg={
                "invert(61%) sepia(88%) saturate(4762%) hue-rotate(196deg) brightness(92%) contrast(101%)"
              }
              // loading={loadingSaveDraft}
              // disabled={loading || loadingSaveDraft}
              colorLoading={"#00a598"}
            />
          </div>



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
