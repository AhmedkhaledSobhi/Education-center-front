import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Alert from '../../../Components/Common/Alert';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from "yup";
import { getEducationalStages, getPaymentType, getStatus } from '../../../helpers/dataLocal';
import { createCourse, delete_Course, getCourse, update_Course } from '../../../helpers/fakebackend_helper';
import { toast } from 'react-toastify';
import TopPageButttons from '../../../Components/Common/TopPageButttons';
import ComponentLoader from '../../../Components/Common/ComponentLoader';
import Select from "react-select";
import DeleteModal from '../../../Components/Common/DeleteModal';

export default function PreviewSubject() {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  const {id} = useParams();
  const location = useLocation();
  const [disableEdit, setDisableEdit] = useState(
    location?.state?.edit
  );
  document.title = `${disableEdit?t("common.view") : t("common.edit")} ${t("Subject.subject")}`;

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [loadsave, setLoadSave] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // ________________________________________________________________________________________

  const Status = getStatus();
  const PaymentType = getPaymentType();
  const EducationalStages = getEducationalStages();

  // ________________________________________________________________________________________

  const [initialValues, setInitialValues] = useState({
    name: "",
    EducationalStages: [],
    status: {name: t("common.active") , id: 0, value:"active"},
    paymentType: PaymentType?.[0],
    price: "",
    Description: "",
  });
  // ________________________________________________________________________________________

  const validationSchema = Yup.object({
    name: Yup.string().required(`${t("Subject.name")} ${t("common.required")}`),
    // EducationalStages: Yup.array().min(1, `${t("Teacher.Educational_Stages")} ${t("common.required")}`),
    status: Yup.object().required(`${t("common.status")} ${t("common.required")}`),
    price: Yup.number().required(`${t("Subject.price")} ${t("common.required")}`),
  });
  // ________________________________________________________________________________________

  const handleSaveNew = async (values, action) =>{
    try{
      setLoadSave(true)
      await validationSchema.validate(values, { abortEarly: false });         
      const payload = {
        id: id,
        title: values?.name || "",
        description: values?.Description || "",
        imagePath: "",
        price: values?.paymentType?.value === "ONE_TIME" ? Number(values?.price) : 0,
        discount: 0,
        paymentType: values?.paymentType?.value || "",
        monthlyPrice: values?.paymentType?.value === "MONTHLY" ? Number(values?.price) : 0,
        teacherId: 63
      };
      update_Course(payload).then((res) => {
        if (res && res.status) {
          toast.success(res?.message, {
            position: "top-center",
            hideProgressBar: false,
            progress: undefined,
            toastId: "",
          });
          nav("/subjects")
          setLoadSave(false)
        } else{
          toast.error(res?.message, {
            position: "top-center",
            hideProgressBar: false,
            progress: undefined,
            toastId: "",
          });
          setLoadSave(false)
        }
      })
    } 
    catch(error){
      if (error.name === "ValidationError") {
        setLoadSave(false)
      }else {
        console.error(error);
        setLoadSave(false)
      }
      return;
    }
  };
  // ________________________________________________________________________________________
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (id) => {
    setDeleteModal(true);
  };
  const handleDeleteTicket = async () => {
    const data = { id: id };

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
        nav("/subjects");
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
  }
  // ________________________________________________________________________________________
  const getData= ()=>{    
    setLoadingProfile(true);
    getCourse({id}).then((res) => {
      if (res && res.status) {
        setInitialValues({
          name: res?.data?.title || "",
          EducationalStages: res?.data?.EducationalStages || [],
          price: res?.data?.paymentType === "ONE_TIME" ? res?.data?.price :  res?.data?.monthlyPrice,
          paymentType: PaymentType?.find((option) => option?.value === res?.data?.paymentType) || PaymentType?.[0],
          status: Status?.find((option) => option?.value === res?.data?.status) || Status?.[0],
          Description: res?.data?.description || "",
        })
        setLoadingProfile(false);
       } else{
        toast.error(res?.message, {
          position: "top-center",
          hideProgressBar: false,
          progress: undefined,
          toastId: "",
        });
        setLoadingProfile(false);
      }
    });
  };
  useEffect(() => {
    getData();
  }, [id]);
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
            pageTitleLink={"/subjects"}
            subPageTitle={`${disableEdit?t("common.view"): t("common.edit")} ${t("Subject.subject")}`}
          />
          <Row>
            <Col xxl={12}>
              <Alert
                message={"descMsg"}
                close={isInfoOpen}
                onClose={()=> setIsInfoOpen(!isInfoOpen)}
              />
            </Col>
            <Col xxl={12}>
              <Formik
                initialValues={initialValues}
                validationSchema={() => {
                  return validationSchema;
                }}
                onSubmit={(values, formikBag) => {
                  formikBag.setErrors({});
                }}
                enableReinitialize={true}
              >
                {({
                  handleSubmit,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  values,
                  isSubmitting,
                  setFieldValue,
                  setFieldTouched,
                  validateForm,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                      }
                    }}
                  >
                    <TopPageButttons
                      edit={true}
                      disableEdit={disableEdit}
                      setDisableEdit={setDisableEdit}
                      deleteButton={()=> onClickDelete(id)}
                      PageTittle={`${disableEdit?t("common.view") : t("common.edit")} ${t("Subject.subject")}`}
                      handleSave={() => handleSaveNew(values)}
                      loadsave={loadsave}
                      close={() => {nav("/subjects")}}
                      information={()=> setIsInfoOpen(!isInfoOpen)}
                    />
                    <Card>
                      <CardHeader>
                        <div className="sub-title">
                          {t("branches.Basic_information")}
                        </div>
                      </CardHeader>
                      <CardBody>
                        {loadingProfile ?
                          <ComponentLoader /> :
                            <Row>
                              {/* ------ اسم المادة ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="name"
                                  >
                                    {t("Subject.name")}{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    placeholder={`${t("common.enter")} ${t("Subject.name")} ${t("common.placeholder")}`}
                                    title={t("Subject.name")}
                                    name="name"
                                    id="name"
                                    onChange={(e) =>
                                      setFieldValue("name", e.target.value)
                                    }
                                    value={values?.name}
                                    onBlur={handleBlur}
                                    disabled={disableEdit}
                                  />
                                  {touched?.name && errors?.name && (
                                    <ErrorMessage
                                      name="name"
                                      component="div"
                                      className="text-danger"
                                    />
                                  )}
                                </FormGroup>
                              </Col>

                              {/* ------ المراحل التعليمية ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="EducationalStages"
                                  >
                                    {t("Teacher.Educational_Stages")}{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Select
                                    theme={(theme) => ({
                                      ...theme,
                                      colors: {
                                        ...theme.colors,
                                        primary25: "#BEC4C7",
                                        primary: "#283C47",
                                      },
                                      cursor: "default",
                                      ":active": {
                                        backgroundColor: "#BEC4C7",
                                      },
                                    })}
                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    styles={{
                                      menuPortal: (base) => ({
                                        ...base,
                                        zIndex: 9999,
                                      }),
                                    }}
                                    id="EducationalStages"
                                    name="EducationalStages"
                                    placeholder={`${t("common.Select")} ${t("Teacher.Educational_Stages")} ${t("common.placeholder")}`}    
                                    options={EducationalStages}
                                    getOptionLabel={(option) => option?.name}
                                    getOptionValue={(option) => option?.id}
                                    value={
                                      EducationalStages.find((option)=>{
                                        return  option?.value === values?.EducationalStages
                                      }) 
                                    } 
                                    onChange={(option) => {
                                      setFieldValue("EducationalStages", option);
                                    }}
                                    onBlur={() => {
                                      setFieldTouched("EducationalStages", true);
                                    }}
                                    isMulti
                                    isDisabled={true}
                                  />
                                  {touched?.EducationalStages && errors?.EducationalStages && (
                                    <ErrorMessage
                                      name="EducationalStages"
                                      component="div"
                                      className="text-danger"
                                    />
                                  )}
                                </FormGroup>
                              </Col>
                              {/* ------ نوع الدفع ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="paymentType"
                                  >
                                    {t("Subject.paymentType")}{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Select
                                    theme={(theme) => ({
                                      ...theme,
                                      colors: {
                                        ...theme.colors,
                                        primary25: "#BEC4C7",
                                        primary: "#283C47",
                                      },
                                      cursor: "default",
                                      ":active": {
                                        backgroundColor: "#BEC4C7",
                                      },
                                    })}
                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    styles={{
                                      menuPortal: (base) => ({
                                        ...base,
                                        zIndex: 9999,
                                      }),
                                    }}
                                    id="paymentType"
                                    name="paymentType"
                                    placeholder={`${t("common.Select")} ${t("Subject.paymentType")} ${t("common.placeholder")}`}    
                                    options={PaymentType}
                                    getOptionLabel={(option) => option?.name}
                                    getOptionValue={(option) => option?.id}
                                    value={
                                      PaymentType.find((option)=>{
                                        return  option?.value === values?.paymentType?.value
                                      }) 
                                    } 
                                    onChange={(option) => {
                                      setFieldValue("paymentType", option);
                                    }}
                                    onBlur={() => {
                                      setFieldTouched("paymentType", true);
                                    }}
                                    isDisabled={disableEdit}
                                  />
                                  {touched?.paymentType && errors?.paymentType && (
                                    <ErrorMessage
                                      name="paymentType"
                                      component="div"
                                      className="text-danger"
                                    />
                                  )}
                                </FormGroup>
                              </Col>
                              {/* ------ السعر ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="price"
                                  >
                                    {t("Subject.price")}{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    type="number"
                                    placeholder={`${t("common.enter")} ${t("Subject.price")} ${t("common.placeholder")}`}
                                    title={t("Subject.price")}
                                    name="price"
                                    id="price"
                                    onChange={(e) =>
                                      setFieldValue("price", e.target.value)
                                    }
                                    value={values?.price}
                                    onBlur={handleBlur}
                                    onWheel={(e) => e.target.blur()}
                                    disabled={disableEdit}
                                  />
                                  {touched?.price && errors?.price && (
                                    <ErrorMessage
                                      name="price"
                                      component="div"
                                      className="text-danger"
                                    />
                                  )}
                                </FormGroup>
                              </Col>

                              {/* ------ الحالة ------ */}
                              <Col lg={4}>
                                <FormGroup>
                                  <Label
                                    htmlFor="status"
                                  >
                                    {t("common.status")}{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Select
                                    theme={(theme) => ({
                                      ...theme,
                                      colors: {
                                        ...theme.colors,
                                        primary25: "#BEC4C7",
                                        primary: "#283C47",
                                      },
                                      cursor: "default",
                                      ":active": {
                                        backgroundColor: "#BEC4C7",
                                      },
                                    })}
                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    styles={{
                                      menuPortal: (base) => ({
                                        ...base,
                                        zIndex: 9999,
                                      }),
                                    }}
                                    id="status"
                                    name="status"
                                    placeholder={`${t("common.Select")} ${t("common.status")} ${t("common.placeholder")}`}    
                                    options={Status}
                                    getOptionLabel={(option) => option?.name}
                                    getOptionValue={(option) => option?.id}
                                    value={
                                      Status.find((option)=>{
                                        return  option?.value === values?.status?.value
                                      }) 
                                    } 
                                    onChange={(option) => {
                                      setFieldValue("status", option);
                                    }}
                                    onBlur={() => {
                                      setFieldTouched("status", true);
                                    }}
                                    isDisabled={disableEdit}
                                  />
                                  {touched?.status && errors?.status && (
                                    <ErrorMessage
                                      name="status"
                                      component="div"
                                      className="text-danger"
                                    />
                                  )}
                                </FormGroup>
                              </Col>

                              {/* ------ الوصف ------ */}
                              <Col lg={12}>
                                <FormGroup>
                                  <Label
                                    htmlFor="Description"
                                  >
                                    {t("common.Description")}{" "}
                                  </Label>
                                  <Input
                                    type="textarea"
                                    placeholder={`${t("common.enter")} ${t("common.Description")} ${t("common.placeholder")}`}
                                    title={t("common.Description")}
                                    name="Description"
                                    id="Description"
                                    onChange={(e) =>
                                      setFieldValue("Description", e.target.value)
                                    }
                                    value={values?.Description}
                                    onBlur={handleBlur}
                                    disabled={disableEdit}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          }
                      </CardBody>
                    </Card>
                  </form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
