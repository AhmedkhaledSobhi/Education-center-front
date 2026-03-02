import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
import ButtonLoader from '../../../Components/Common/ButtonLoader';
import Alert from '../../../Components/Common/Alert';
import TopTablesButtons from '../../../Components/Common/TopTablesButtons';
import TableContainerComponent from '../../../Components/Common/TableContainerComponent/TableContainerComponent';
import { useNavigate } from 'react-router-dom';
import { useGetAllUser } from '../../../helpers/getAllApiSelect';

export default function Student() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [limit, setLimit] = useState([]);

  // ____________________________________________________________________

  const tableDataColumns = useMemo(
    () => [
      {
        Header: t("Student.Identification_number"),
        accessor: "id",
        filterable: false,
        Cell: (cellProps)=>{
          return ( <span> {cellProps?.row?.original?.id} </span>)
        }
      },
      {
        Header: t("Student.name"),
        accessor: "first_name",
        filterable: false,
        Cell: (cellProps)=>{
          return ( <span> {cellProps?.row?.original?.first_name } {cellProps?.row?.original?.last_name} </span>)
        }
      },
      {
        Header: t("Student.email"),
        accessor: "email",
        filterable: false,
      },
      {
        Header: t("Student.phoneNumber"),
        accessor: "phone",
        filterable: false,
        Cell: (cellProps)=>{
          const phone = cellProps?.row?.original?.phone ?.replace(/^\(\+20\)/, "");
          return ( <span> {phone} </span>)
        }
      },
      {
        Header: t("Student.age"),
        accessor: "age",
        filterable: false,
      },
      {
        Header: t("Student.Address"),
        accessor: "address",
        filterable: false,
      },
      {
        Header: t("Student.Account_type"),
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
            <UncontrolledDropdown onClick={(e) => e?.stopPropagation()}>
              <DropdownToggle
                tag="a"
                className="btn btn-light btn-sm"
              >
                <i className="ri-more-2-fill align-middle"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end" >
                <li>
                  <DropdownItem>
                    <div className="d-flex justify-content-start align-items-center">
                      <i className={`mdi mdi-eye-circle-outline  align-bottom text -muted text-primary-emphasis ${i18n.language === "ar" ? "me-2" : "ms-2"}`}></i>
                      <div>{t("common.view")}</div>
                    </div>
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem>
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
  const { data: Students = [], isLoading: LoadingStudent } = useGetAllUser();
  useEffect(() => {
    if(Students){
      const result = Students?.data?.filter((item) => {
        return item.role == "STUDENT";
      });
      setProductsData(result);
      setTotalPage(Students?.meta?.total)
      setCurrentPage(Students?.meta?.page)
      setLimit(Students?.meta?.limit)
    }
  }, [Students]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("LayoutMenuData.Users")}
            subTitle={t("LayoutMenuData.Users")}
            pageTitle={t("Student.Students")}
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
                PageTittle={`${t("Student.Students")}`}
                addTitle={t("Student.AddStudent")}
                link={() => nav("/addStudent")}
                information={()=> setIsInfoOpen(!isInfoOpen)}
              />
            </Col>
            
            <Col xs={12}>
              <div className="card-body pt-0">
                <Card>
                  <CardBody className="pt-0">
                    {LoadingStudent?
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
                          pages={productsData?.meta?.page}
                          
                          limit={limit}
                          totalPage={totalPage}
                          currentPage={currentPage}
                          setParams={productsData}
                          params={limit}
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
