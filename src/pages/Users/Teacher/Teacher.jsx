import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { useNavigate } from 'react-router-dom';
import TopTablesButtons from '../../../Components/Common/TopTablesButtons';
import Alert from '../../../Components/Common/Alert';
import TableContainerComponent from '../../../Components/Common/TableContainerComponent/TableContainerComponent';
import { useGetAllTeacher } from '../../../helpers/getAllApiSelect';
import ComponentLoader from '../../../Components/Common/ComponentLoader';

export default function Teacher() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const [productsData, setProductsData] = useState([]);

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
        Header: t("Teacher.Identification_number"),
        accessor: "id",
        filterable: false,
        Cell: (cellProps)=>{
          return ( <span> {cellProps?.row?.original?.id} </span>)
        }
      },
      {
        Header: t("Teacher.name"),
        accessor: "first_name",
        filterable: false,
        Cell: (cellProps)=>{
          return ( <span> {cellProps?.row?.original?.first_name } {cellProps?.row?.original?.last_name} </span>)
        }
      },
      {
        Header: t("Teacher.email"),
        accessor: "email",
        filterable: false,
      },
      {
        Header: t("Teacher.phoneNumber"),
        accessor: "phone",
        filterable: false,
        Cell: (cellProps)=>{
          const phone = cellProps?.row?.original?.phone ?.replace(/^\(\+20\)/, "");
          return ( <span> {phone} </span>)
        }
      },
      {
        Header: t("Teacher.age"),
        accessor: "age",
        filterable: false,
      },
      {
        Header: t("Teacher.Address"),
        accessor: "address",
        filterable: false,
      },
      {
        Header: t("Teacher.Account_type"),
        accessor: "role",
        filterable: false,
        Cell: (cellProps)=>{
          return cellProps?.row?.original?.role
        }
      },
      {
        Header: t("common.settings"),
        Cell: (cellProps) => {
          return (
            <UncontrolledDropdown onClick={(e) => e?.stopPropagation()} >
              <DropdownToggle
                tag="a"
                className="btn btn-light btn-sm"
              >
                <i className="ri-more-2-fill align-middle"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end" >
                <li>
                  <DropdownItem
                    onClick={(e) => {
                      e?.stopPropagation();
                      nav("/PreviewTeacher/" + cellProps?.row?.original?.id, {
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
                      nav("/PreviewTeacher/" + cellProps?.row?.original?.id, {
                        state: {
                          detail: cellProps?.row?.original,
                          edit: true,
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
                  <DropdownItem>
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
    ]);

  // ____________________________________________________________________
  const { data: Teachers = [], isLoading: LoadingTeacher } = useGetAllTeacher({...params});

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      limit : per_page?.id,
      page: page,
    }));
  }, [per_page, page]);
  
  useEffect(() => {
    if (!Teachers) return;

    if(Teachers){
      const result = Teachers?.data?.filter((item) => {
        return item.role == "TEACHER";
      });
      setProductsData(result);
      
      setTotalItems(Teachers?.pagination?.total);
      setTotalPage(Teachers?.pagination?.totalPages);
    }
  }, [Teachers]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("LayoutMenuData.Users")}
            subTitle={t("LayoutMenuData.Users")}
            pageTitle={t("Teacher.Teachers")}
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
                PageTittle={`${t("Teacher.Teachers")}`}
                addTitle={t("Teacher.AddTeacher")}
                link={() => nav("/addTeacher")}
                information={()=> setIsInfoOpen(!isInfoOpen)}
              />
            </Col>
            
            <Col xs={12}>
              <div className="card-body pt-0">
                <Card>
                  <CardBody className="pt-0">
                    {LoadingTeacher?
                      <ComponentLoader /> 
                      : ( 
                        <TableContainerComponent
                          columns={tableDataColumns || []}
                          data={productsData || [] }
                          customPagination={true}

                          currentPage={page}
                          handlePageChange={setPage}
                          totalItem={totalItems}
                          totalPage={totalPage}
                          per_page={per_page}
                          setPer_page={setPer_page}
                          setPage={setPage}
                          previewItem={"PreviewTeacher"}
                        /> 
                      )           
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
