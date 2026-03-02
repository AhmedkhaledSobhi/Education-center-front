import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import SubjectHeader from './SubjectHeader';
import Select from "react-select";
import { useGetAllUser } from '../../../../helpers/getAllApiSelect';
import { getSubjects } from '../../../../helpers/dataLocal';

export default function SubjectComponent({ 
  values, 
  handleBlur, 
  setFieldValue, 
  touched, 
  errors,
  subjectInput,
  setSubjectInputs,
}) {
  const { t, i18n } = useTranslation();
  const Subjects = getSubjects();

  const [inputs, setInputs] = useState([
    {
      name: "",
      Subjects: "",
      desc: "",
    },
  ]);
  const { data: Teachers = [], isLoading: LoadingTeacher } = useGetAllUser();

  const handleDeleteInput = (subjectInput, index, setSubjectInputs) => {
    const newArray = [...subjectInput];
    newArray.splice(index, 1);
    setSubjectInputs(newArray);
  };
 const handleAddInput = () => {
    setSubjectInputs([
      ...subjectInput,
      {
        subject: "",
        Teacher: "",
        price: "",
        description: "",
      }
    ])
 }
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <div className="sub-title">
            {t("Student.Subjects")}
          </div>
        </CardHeader>
        <CardBody>
          <div className="permmision-table">
            <div className="table-container overflow- x-scroll">
              <table
                className="content-table"
                style={{
                  width: "100%",
                }}
              >
                <SubjectHeader/>
                <tbody>
                  {subjectInput.map((item, index) => (
                    <tr
                      className="input_container"
                      key={index}
                    >
                      <td
                        style={{
                          width: "15px",
                          minWidth: "10px",
                        }}
                      >
                        <div className="table-number">
                          {index + 1}
                        </div>
                      </td>
                      <td
                        style={{
                          width: "200px",
                          minWidth: "100px",
                        }}
                      >
                        <div className="input-group flex-nowrap border-left-1 d-flex">
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
                            className='w-100'
                            styles={{
                              menuPortal: (base) => ({
                                ...base,
                                zIndex: 9999,
                              }),
                            }}
                            id="Subjects"
                            name="Subjects"
                            placeholder={`${t("common.Select")} ${t("Student.Name_Subject")} ${t("common.placeholder")}`}    
                            options={Subjects}
                            getOptionLabel={(option) => option?.name}
                            getOptionValue={(option) => option?.id}
                            value={
                              Subjects.find((option)=>{
                                return  option?.value === values?.Subjects
                              }) 
                            } 
                            onChange={(option) => {
                              const updated = [...subjectInput];
                              updated[index].subject = option || "";
                              setSubjectInputs(updated);
                            }}
                            isLoading={LoadingTeacher}
                            isClearable
                          />
                        </div>
                      </td>
                      <td
                        style={{
                          width: "200px",
                          minWidth: "100px",
                        }}
                      >                           
                        <div className="input-group flex-nowrap border-left-1 d-flex">
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
                            className='w-100'
                            styles={{
                              menuPortal: (base) => ({
                                ...base,
                                zIndex: 9999,
                              }),
                            }}
                            id="teacher"
                            name="teacher"
                            placeholder={`${t("common.Select")} ${t("Teacher.teacher")} ${t("common.placeholder")}`}    
                            options={Teachers?.data?.filter((item) => {
                              return item?.role == "TEACHER" ? item : null;
                            })}
                            getOptionLabel={(option) => option?.first_name + " " + option?.last_name}
                            getOptionValue={(option) => option?.id}
                            value={
                              Teachers?.data?.find((option)=>{
                                return  option?.id === values?.teacher?.id
                              }) 
                            } 
                            onChange={(option) => {
                              const updated = [...subjectInput];
                              updated[index].Teacher = option || "";
                              setSubjectInputs(updated);
                            }}
                            isLoading={LoadingTeacher}
                            isClearable
                          />
                        </div>
                      </td>
                      <td
                        style={{
                          width: "200px",
                          minWidth: "100px",
                        }}
                      >                           
                        <Input
                          type="number"
                          placeholder={`${t("common.enter")} ${t("Student.Course_Price")} ${t("common.placeholder")}`}
                          title={t("Student.Course_Price")}
                          name="Course_Price"
                          id="Course_Price"
                          onChange={(e) => {
                            const updated = [...subjectInput];
                            updated[index].price = e.target.value;
                            setSubjectInputs(updated);
                          }}
                          value={values?.Course_Price}
                          onBlur={handleBlur}
                          onWheel={(e) => e.target.blur()}
                        />
                      </td>
                      <td>
                        <div className="remove-item">
                          <Input
                            type="text"
                            placeholder={`${t("common.enter")} ${t("common.Description")} ${t("common.placeholder")}`}
                            title={t("common.Description")}
                            name="Description"
                            id="Description"
                            onChange={(e) => {
                              const updated = [...subjectInput];
                              updated[index].description = e.target.value;
                              setSubjectInputs(updated);
                            }}
                            value={values?.Description}
                            onBlur={handleBlur}
                          />
                          
                          {subjectInput?.length > 1 && (
                            <div
                              className="table-delete p-2"
                              onClick={() => {
                                handleDeleteInput(subjectInput, index, setSubjectInputs);
                              }}
                            >
                              <i className=" ri-delete-bin-line ri-xl"></i>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-3 w-100 d-flex flex-column flex-lg-row align-items-lg-start align-items-end justify-content-lg-between">
            <div className="w-100">
              <button
                className="add-product-table bg-primary-subtle text-primary border-0"
                onClick={() => handleAddInput()}
              >
                <i className="ri-add-line"></i>
                {t("common.add")} {""}
                {t("Student.New_Course")}
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
