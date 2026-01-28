import React, { Suspense, useEffect, useState } from "react";
import withRouter from "../Components/Common/withRouter";
import PropTypes from "prop-types";

//import Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
// import RightSidebar from "../Components/Common/RightSidebar";

//import actions
import {
  changeLayout,
  changeSidebarTheme,
  changeLayoutMode,
  changeLayoutWidth,
  changeLayoutPosition,
  changeTopbarTheme,
  changeLeftsidebarSizeType,
  changeLeftsidebarViewType,
  changeSidebarVisibility,
} from "../slices/thunks";
import RightSidebar from "../Components/Common/RightSidebar";

const Layout = (props) => {
  const [headerClass, setHeaderClass] = useState("");
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.Layout;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutType: layout.layoutType,
      leftSidebarType: layout.leftSidebarType,
      layoutModeType: layout.layoutModeType,
      layoutWidthType: layout.layoutWidthType,
      layoutPositionType: layout.layoutPositionType,
      topbarThemeType: layout.topbarThemeType,
      leftsidbarSizeType: layout.leftsidbarSizeType,
      leftSidebarViewType: layout.leftSidebarViewType,
      leftSidebarImageType: layout.leftSidebarImageType,
      preloader: layout.preloader,
      sidebarVisibilitytype: layout.sidebarVisibilitytype,
    })
  );

  // Inside your component
  const {
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    preloader,
    sidebarVisibilitytype,
  } = useSelector(selectLayoutProperties);

    // class add remove in header
  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });
  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setHeaderClass("topbar-shadow");
    } else {
      setHeaderClass("");
    }
  }

    const onChangeLayoutMode = (value) => {
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
    }
  };

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header
          headerClass={headerClass}
          layoutModeType={layoutModeType}
          onChangeLayoutMode={onChangeLayoutMode}
        />
        <Sidebar layoutType={layoutType} />
        <Suspense
          fallback={
            <div
              className="bg-danger d-flex justify-content-center align-items-center"
              style={{ height: "100vh", width: "100vw" }}
            >
              <div id="status">
                <div
                  className="spinner-border text-primary avatar-sm"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          }
        >
          <div className={"main-content"}>            
            {props.children}
            <Footer />
          </div>
        </Suspense>
      </div>
      <RightSidebar />
    </React.Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.object,
};

export default withRouter(Layout);