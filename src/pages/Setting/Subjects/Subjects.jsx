import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap'
import BreadCrumb from '../../../Components/Common/BreadCrumb'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Alert from '../../../Components/Common/Alert';
import TopTablesButtons from '../../../Components/Common/TopTablesButtons';
import ButtonLoader from '../../../Components/Common/ButtonLoader';
import TableContainerComponent from '../../../Components/Common/TableContainerComponent/TableContainerComponent';
import { useGetAllUser } from '../../../helpers/getAllApiSelect';

export default function Subjects() {
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
        Header: t("Subject.Identification_number"),
        accessor: "id",
        filterable: false,
        Cell: (cellProps)=>{
          return ( <span> {cellProps?.row?.original?.id} </span>)
        }
      },
      {
        Header: t("Subject.name"),
        accessor: "first_name",
        filterable: false,
        Cell: (cellProps)=>{
          return ( <span> {cellProps?.row?.original?.first_name } {cellProps?.row?.original?.last_name} </span>)
        }
      },
      {
        Header: t("Subject.Educational_Stages"),
        accessor: "email",
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
    ]
  );

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
