import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Alert from '../../../Components/Common/Alert';
import TopTablesButtons from '../../../Components/Common/TopTablesButtons';
import ButtonLoader from '../../../Components/Common/ButtonLoader';
import TableContainerComponent from '../../../Components/Common/TableContainerComponent/TableContainerComponent';
import { useGetAllCourse, useGetAllUser } from '../../../helpers/getAllApiSelect';
import DeleteModal from '../../../Components/Common/DeleteModal';
import { toast } from 'react-toastify';
import { delete_Course } from '../../../helpers/fakebackend_helper';

export default function Subjects() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();

  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [limit, setLimit] = useState([]);

  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState({ label: 5, id: 5 });
  const [totalItems, setTotalItems] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [params, setParams] = useState({
    page: page ?? 1,
    limit: per_page?.id ?? 5,
  });
  // ____________________________________________________________________

  const tableDataColumns = useMemo(
    () => [
      {
        Header: t("Subject.Identification_number"),
        accessor: "id",
        filterable: false,
        Cell: (cellProps)=>{
          return ( <span> {cellProps?.row?.original?.id} </span>)
        }
      },
      {
        Header: t("Subject.name"),
        accessor: "title",
        filterable: false,
        Cell: (cellProps)=>{
          return ( <span> {cellProps?.row?.original?.title } </span>)
        }
      },
      {
        Header: t("Subject.Instructor"),
        accessor: "teacher",
        filterable: false,
        Cell: (cellProps)=>{
          return ( <span> {cellProps?.row?.original?.teacher?.first_name} {cellProps?.row?.original?.teacher?.last_name}</span>)
        }
      },
      {
        Header: t("Subject.Educational_Stages"),
        accessor: "email",
        filterable: false,
        Cell: (cellProps)=>{
          return ( <span> {cellProps?.row?.original?.teacher?.first_name } </span>)
        }
      },
      {
        Header: t("Subject.price"),
        accessor: "price",
        filterable: false,
        Cell: (cellProps)=>{
          return ( 
            <span> 
              {cellProps?.row?.original?.price}
              <svg width="24" height="24" viewBox="0 0 24 24">
                {/* <!-- L --> */}
                <path d="M5 4H8V18H13V20H5V4Z" fill="currentColor"/>
                
                {/* <!-- E --> */}
                <path d="M15 4H21V6H17V10H20V12H17V18H21V20H15V4Z" fill="currentColor"/>
              </svg>
            </span>
          )
        }
      },
      {
        Header: t("Subject.paymentType"),
        accessor: "paymentType",
        filterable: false,
      },
      {
        Header: t("common.status"),
        accessor: "role",
        filterable: false,
        Cell: (cellProps)=>{
          let statusText = "";
          let className = "";
          if (cellProps?.row?.original?.role === "STUDENT") {
            statusText = t("common.active");
            className = "badge bg-success text-white";
          } else if (cellProps?.row?.original?.role === "STUDENT") {
            statusText = t("common.Inactive");
            className = "badge bg-danger text-white";
          } 
          else{
            statusText = t("common.active");
            className = "badge bg-success text-white";
            // statusText = t("common.Inactive");
            // className = "badge bg-danger text-white";
          }
          return (
            <span className={className} 
              style={{ 
                padding: "6px", 
                boxSizing: "border-box",
              }}
            >
              {statusText}
            </span>
          )
        }
      },
      {
        Header: t("common.settings"),
        Cell: (cellProps) => {
          return (
            <UncontrolledDropdown onClick={(e) => e?.stopPropagation()}>
              <DropdownToggle
                tag="a"
                className="btn btn-light btn-sm"
              >
                <i className="ri-more-2-fill align-middle"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end " >
                <li>
                  <DropdownItem
                    onClick={(e) => {
                      e?.stopPropagation();
                      nav("/previewSubject/" + cellProps?.row?.original?.id, {
                        state: {
                          detail: cellProps?.row?.original,
                          edit: true,
                        },
                      })
                    }}
                  >
                    <div className="d-flex justify-content-start align-items-center">
                      <i className={`mdi mdi-eye-circle-outline  align-bottom text -muted text-primary-emphasis ${i18n.language === "ar" ? "me-2" : "ms-2"}`}></i>
                      <div>{t("common.view")}</div>
                    </div>
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem
                    onClick={(e) => {
                      e?.stopPropagation();
                      nav("/previewSubject/" + cellProps?.row?.original?.id, {
                        state: {
                          detail: cellProps?.row?.original,
                          edit: false,
                        },
                      })
                    }}
                  >
                    <div className="d-flex justify-content-start align-items-center">
                      <i className={`bx bxs-edit  align-bottom text -muted text-primary-emphasis ${i18n.language === "ar" ? "me-2" : "ms-2"}`}></i>{" "}
                      <div>{t("common.edit")}</div>
                    </div>
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem
                    onClick={(e) => {
                      e?.stopPropagation();
                      onClickDelete(cellProps?.row?.original?.id);
                    }}
                  >
                    <div className="d-flex justify-content-start align-items-center">
                      <i className={`ri-delete-bin-5-line align-bottom text- muted text-primary-emphasis ${i18n.language === "ar" ? "me-2" : "ms-2"}`}></i>{" "}
                      <div>{t("common.delete")}</div>
                    </div>
                  </DropdownItem>
                </li>
              </DropdownMenu>
            </UncontrolledDropdown>
          )
        }
      }
    ]
  );
  // ________________________________________________________________________________________
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const onClickDelete = (id) => {
    setSelectedId(id);
    setDeleteModal(true);
  };
  const handleDeleteTicket = async () => {
    const data = { id: selectedId };
    const id = selectedId;
    try {
      const res = await delete_Course(data);
      if (res && res.status) {
        toast.success(res?.message, {
          position: "top-center",
          hideProgressBar: false,
          autoClose: 3000,
          progress: undefined,
          toastId: "",
        });        
        setDeleteModal(false);
        const index = productsData?.findIndex(
          (item) => item?.id === id
        );
        const newData = [
          ...productsData?.slice(0, index),
          ...productsData?.slice(index + 1),
        ];
        setProductsData(newData);        
      } else {
        toast.error(res?.message, {
          position: "top-center",
          hideProgressBar: false,
          autoClose: 3000,
          progress: undefined,
          toastId: "",
        });
      }
    } catch (error) {
      toast.error("An error occurred while deleting the branch", {
        position: "top-center",
        hideProgressBar: false,
        autoClose: 3000,
        progress: undefined,
        toastId: "",
      });
    }
  };
  
  // ____________________________________________________________________

  const { data: Courses = [], isLoading: LoadingCourse } = useGetAllCourse( {...params} );
  
  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      limit : per_page?.id,
      page: page,
    }));
  }, [per_page, page]);

  useEffect(() => {
    if (!Courses) return;
    setProductsData(Courses?.data);
    setTotalItems(Courses?.pagination?.total);
    setTotalPage(Courses?.pagination?.totalPages);
  }, [Courses]);

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onCloseClick={() => setDeleteModal(false)}
        onDeleteClick={handleDeleteTicket}
      />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("LayoutMenuData.Setting")}
            subTitle={t("LayoutMenuData.Setting")}
            pageTitle={t("Subject.Subjects")}
          />
          <Row>
            <Col xs={12}>
              <Alert
                message={"descMsg"}
                close={isInfoOpen}
                onClose={()=> setIsInfoOpen(!isInfoOpen)}
              />
            </Col>

            <Col xs={12}>
              <TopTablesButtons 
                PageTittle={`${t("Subject.Subjects")}`}
                addTitle={`${t("common.add")} ${t("Subject.subject")} ${t("common.new")}`}
                link={() => nav("/addSubject")}
                information={()=> setIsInfoOpen(!isInfoOpen)}
              />
            </Col>
            <Col xs={12}>
              <div className="card-body pt-0">
                <Card>
                  <CardBody className="pt-0">
                    {LoadingCourse?
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
                      </div> : <div> 
                        <TableContainerComponent
                          columns={tableDataColumns || []}
                          data={productsData || [] }
                          customPagination={true}
                          currentPage={page}
                          totalItem={totalItems}
                          totalPage={totalPage}
                          per_page={per_page}
                          setPer_page={setPer_page}
                          setPage={setPage}
                          previewItem={"previewSubject"}
                        /> 
                      </div>            
                    }  
                  </CardBody>
                </Card>
              </div>
            </Col>

          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
