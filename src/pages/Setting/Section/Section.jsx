import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Alert from '../../../Components/Common/Alert';
import TopTablesButtons from '../../../Components/Common/TopTablesButtons';
import TableContainerComponent from '../../../Components/Common/TableContainerComponent/TableContainerComponent';
import { useGetAllRoom } from '../../../helpers/getAllApiSelect';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ComponentLoader from '../../../Components/Common/ComponentLoader';

export default function Section() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();

  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const [roomsData, setroomsData] = useState([]);

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
        Header: t("section.Identification_number"),
        accessor: "id",
        filterable: false,
        Cell: (cellProps)=>{
          return ( <span> {cellProps?.row?.original?.id} </span>)
        }
      },
      {
        Header: t("section.name"),
        accessor: "name",
        filterable: false,
        Cell: (cellProps)=>{
          return ( <span> {cellProps?.row?.original?.name}</span>)
        }
      },
      {
        Header: t("section.Number_students"),
        accessor: "capacity",
        filterable: false,
      },
      {
        Header: t("section.Whiteboard"),
        accessor: "phone",
        filterable: false,
        Cell: (cellProps)=>{
          const phone = cellProps?.row?.original?.phone ?.replace(/^\(\+20\)/, "");
          return ( <span> {phone} </span>)
        }
      },
      {
        Header: t("section.Screen"),
        accessor: "age",
        filterable: false,
      },
      {
        Header: t("section.Branch"),
        accessor: "location",
        filterable: false,
      },
      {
        Header: t("common.type"),
        accessor: "type",
        filterable: false,
        Cell: (cellProps)=>{
          let typeText = "";
          if (cellProps?.row?.original?.type === "OFFLINE") {
            typeText = t("common.offline");
          } else if(cellProps?.row?.original?.type === "ONLINE"){
            typeText = t("common.online");
          }
          return (
            <span className="">
              {typeText}
            </span>
          )
        }
      },
      {
        Header: t("common.status"),
        accessor: "isActive",
        filterable: false,
        Cell: (cellProps)=>{
          let statusText = "";
          let className = "";
          if (cellProps?.row?.original?.isActive === true) {
            statusText = t("common.active");
            className = "badge bg-success bg- primary text-white";
          } else if (cellProps?.row?.original?.isActive === false) {
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
  const { data: Rooms, isLoading: LoadingRoom } = useGetAllRoom( {...params} );

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      limit : per_page?.id,
      page: page,
    }));
  }, [per_page, page]);

  useEffect(() => {
    if (!Rooms) return;
    setroomsData(Rooms?.data);
    setTotalItems(Rooms?.pagination?.total);
    setTotalPage(Rooms?.pagination?.totalPages);
  }, [Rooms]);
  // ____________________________________________________________________

  return (
    <React.Fragment>
      <div className="page-content ">
        <Container fluid>
          <BreadCrumb
            title={t("LayoutMenuData.Setting")}
            subTitle={t("LayoutMenuData.Setting")}
            pageTitle={t("section.Section")}
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
                PageTittle={`${t("section.Section")}`}
                addTitle={`${t("common.add")} ${t("section.Section")}`}
                link={() => nav("/addSection")}
                information={()=> setIsInfoOpen(!isInfoOpen)}
              />
            </Col>
            
            <Col xs={12}>
              <div className="card-body pt-0">
                <Card>
                  <CardBody className="pt-0">
                    {LoadingRoom?
                      <ComponentLoader /> 
                      : (
                        <TableContainerComponent
                          columns={tableDataColumns || []}
                          data={roomsData || [] }
                          customPagination={true}  
                          currentPage={page}
                          totalItem={totalItems}
                          totalPage={totalPage}
                          per_page={per_page}
                          setPer_page={setPer_page}
                          setPage={setPage}
                          previewItem={"/teacher"}
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
