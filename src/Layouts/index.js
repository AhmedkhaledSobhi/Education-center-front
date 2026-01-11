
const Layout = (props) => {


  return (
    <React.Fragment>
      <div id="layout-wrapper">
        {/* <Header
          headerClass={headerClass}
          layoutModeType={layoutModeType}
          onChangeLayoutMode={onChangeLayoutMode}
        /> */}
        {/* <Sidebar layoutType={layoutType} /> */}
        <Suspense
          fallback={
            <div
              className="d-flex justify-content-center align-items-center"
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
      {/* <RightSidebar /> */}
    </React.Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.object,
};

export default withRouter(Layout);