import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./style.css";

//SimpleBar
import SimpleBar from "simplebar-react";
import {
  activate_notification,
  delete_notification,
  notification,
  read_notification,
  toggle_notification,
} from "../../helpers/fakebackend_helper";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
// import { CartContext } from "../../Context/CartContext";

const NotificationDropdown = () => {
  const { t } = useTranslation();
  // const { notificationsList, isNotificationSuccess } = useContext(CartContext);
  //Dropdown Toggle
  // const [isNotificationDropdown, setIsNotificationDropdown] = useState(false);
  // const toggleNotificationDropdown = () => {
  //   setIsNotificationDropdown(!isNotificationDropdown);
  // };
  // const [isNotificationDropdown1, setIsNotificationDropdown1] = useState(false);
  // const toggleNotificationDropdown1 = () => {
  //   setIsNotificationDropdown1(!isNotificationDropdown1);
  // };
  // const [checked, setChecked] = useState();
  // const handleChangeChecked = (event) => {
  //   setChecked(event.target.checked);
  //   // toggleNotification();
  // };
  // const readNotification = () => {
  //   read_notification()
  //     .then((res) => {
  //       toast.success(res?.message, {
  //         position: "top-center",
  //       });
  //     })
  //     .catch((err) => {});
  // };
  // const deleteAllNotification = () => {
  //   delete_notification()
  //     .then((res) => {
  //       toast.success(res?.message, {
  //         position: "top-center",
  //         hideProgressBar: false,
  //         autoClose: 3000,
  //         progress: undefined,
  //       });
  //     })
  //     .catch((err) => {});
  // };
  // const toggleNotification = () => {
  //   toggle_notification()
  //     .then((res) => {
  //       toast.success(res?.message, {
  //         autoClose: 3000,
  //       });
  //     })
  //     .catch((err) => {});
  // };

  //Tab
  const [activeTab, setActiveTab] = useState("1");

  // const [isNotificationSuccess, setIsNotificationSuccess] = useState(false);
  // const [notificationsList , setNotificationList] = useState()
  // const getNotification = () => {
  //     notification()
  //     .then((res) => {
  //         setNotificationList(res.data);
  //         setIsNotificationSuccess(true);
  //     })
  //     .catch((err) => {
  //
  //     });
  // };

  // useEffect(() => {
  //     getNotification();
  // }, []);
  return (
    <React.Fragment>
      <Dropdown
        // isOpen={isNotificationDropdown}
        // toggle={toggleNotificationDropdown}
        className="topbar-head-dropdown ms-1 header-item"
      >
        <DropdownToggle
          type="button"
          tag="button"
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
        >
          <i className="bx bx-bell fs-22"></i>
          <span className="position-absolute topbar-badge translate-middle badge rounded-pill bg-danger">
            {/* {notificationsList?.length} */} 0
            <span className="visually-hidden">unread messages</span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0 rounded">
          <div
            className="dropdown-head bg-pattern rounded-top border-bottom-1"
            style={{ borderBottom: "1px solid #EAECED" }}
          >
            <div className="p-2">
              <Row className="align-items-center">
                <Col>
                  <h6
                    className="m-0 fs-16 fw-semibold"
                    style={{ color: "#268F87" }}
                  >
                    {" "}
                    {t("Notifications.notifications")}{" "}
                  </h6>
                </Col>
                <div className="col-auto dropdown-tabs">
                  <Dropdown
                    // isOpen={isNotificationDropdown1}
                    // toggle={toggleNotificationDropdown1}
                    className="topbar-head-dropdown"
                  >
                    <DropdownToggle
                      type="button"
                      tag="button"
                      className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                    >
                      <span className="badge bg-light-subtle text-body fs-13">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="30px"
                          viewBox="0 0 24 24"
                          id="three-dots"
                        >
                          <g
                            id="_20x20_three-dots--grey"
                            data-name="20x20/three-dots--grey"
                            transform="translate(24) rotate(90)"
                          >
                            <rect
                              id="Rectangle"
                              width="24"
                              height="24"
                              fill="none"
                            />
                            <circle
                              id="Oval"
                              cx="1"
                              cy="1"
                              r="1"
                              transform="translate(5 11)"
                              stroke="#000000"
                              stroke-miterlimit="10"
                              stroke-width="0.5"
                            />
                            <circle
                              id="Oval-2"
                              data-name="Oval"
                              cx="1"
                              cy="1"
                              r="1"
                              transform="translate(11 11)"
                              stroke="#000000"
                              stroke-miterlimit="10"
                              stroke-width="0.5"
                            />
                            <circle
                              id="Oval-3"
                              data-name="Oval"
                              cx="1"
                              cy="1"
                              r="1"
                              transform="translate(17 11)"
                              stroke="#000000"
                              stroke-miterlimit="10"
                              stroke-width="0.5"
                            />
                          </g>
                        </svg>
                      </span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                      <div
                        className="dropdown-head bg-pattern rounded-top border-bottom-1"
                        style={{ borderBottom: "1px solid #EAECED" }}
                      >
                        <DropdownItem className="p-0">
                          <div
                            className="dropdown-item"
                            // onClick={() => readNotification()}
                          >
                            <i className="mdi mdi-eye text-muted fs-16 align-middle me-1"></i>
                            <span className="align-middle">
                              {t("Notifications.showNonReadable")}
                            </span>
                          </div>
                        </DropdownItem>
                        <DropdownItem className="p-0">
                          <div
                            // onClick={() => readNotification()}
                            className="dropdown-item"
                          >
                            <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "}
                            <span className="align-middle">
                              {t("Notifications.selectAllIsReadable")}
                            </span>
                          </div>
                        </DropdownItem>
                        <DropdownItem className="p-0">
                          <div
                            // onClick={() => deleteAllNotification()}
                            className="dropdown-item"
                          >
                            <i className="mdi mdi-delete text-muted fs-16 align-middle me-1"></i>{" "}
                            <span className="align-middle">
                              {t("Notifications.deleteAll")}
                            </span>
                          </div>
                        </DropdownItem>
                        <DropdownItem className="p-0">
                          <Link
                            to={
                              process.env.PUBLIC_URL + "/notification-settings"
                            }
                            className="dropdown-item"
                            // onClick={() => {
                            //   setIsNotificationDropdown(
                            //     !isNotificationDropdown
                            //   );
                            //   setIsNotificationDropdown1(
                            //     !isNotificationDropdown1
                            //   );
                            // }}
                          >
                            <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{" "}
                            <span className="align-middle">
                              {t("Notifications.settings")}
                            </span>
                          </Link>
                        </DropdownItem>
                        {/* <div className="p-0">
                                                <div
                                                    className="dropdown-item"
                                                >
                                                    <Switch checked={checked} onChange={handleChangeChecked} />
                                                    <span className="align-middle"> {checked ? t('إلغاء تفعيل الإشعارات') : t('تفعيل الإشعارات')} </span>
                                                </div>
                                            </div> */}
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </Row>
            </div>
          </div>

          <TabContent activeTab={activeTab}>
            <SimpleBar
              style={{ maxHeight: "300px" }}
              className="pe-2"
            >
              {/* {notificationsList?.length > 0 ? (
                isNotificationSuccess &&
                notificationsList.slice(0, 10)?.map((notify, index) => (
                  <div
                    key={index}
                    className={`text-reset notification-item d-block dropdown-item position-relative ${notify?.is_active ? "active_notification" : ""}`}
                    style={{ padding: "0.5rem 1rem" }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="avatar-xs me-3 flex-shrink-0">
                        <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                          <i className="bx bx-badge-check"></i>
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <Link
                          to="#"
                          className="stretched-link notify-link"
                        >
                          <p className="mb-2 fs-13 fw-medium">
                            {notify?.title}
                          </p>
                        </Link>
                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                          <span>
                            <i className="mdi mdi-clock-outline"></i>{" "}
                            {notify?.created_at ? notify?.created_at : ""}{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: "170px", width: "100%" }}
                >
                  <span>{t("Notifications.noNotifications")}</span>
                </div>
              )} */}
            </SimpleBar>
            <div>
              {/* {isNotificationSuccess && notificationsList?.length > 0 && (
                <div className="my-1 text-center">
                  <Link
                    to={"/notification"}
                    // onClick={toggleNotificationDropdown}
                    className="btn view-all-notifications waves-effect waves-light"
                  >
                    <span>عـرض الـكـل</span>{" "}
                    <i className="ri-arrow-left-line align-middle"></i>
                  </Link>
                </div>
              )} */}
            </div>
          </TabContent>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default NotificationDropdown;
