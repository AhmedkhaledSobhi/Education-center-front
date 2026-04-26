import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import ComponentLoader from './ComponentLoader';
import { BiX } from 'react-icons/bi';
import image from "../../assets/images/gallery-add.png";
import MySVG from '../../SVG/SVGIcons';
import ButtonComponent from './ButtonComponent';

export default function ImageComponent({
  setFieldValue,
  profileData,
  loadingProfile = false,
  disableEdit = false
}) {
  const { t } = useTranslation();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (profileData?.avatar) {
      setSelectedFiles([
        {
          preview: profileData.avatar,
          name: "profile-image",
        },
      ]);
    }
  }, [profileData]);

// ✅ رفع الصور
  function handleAcceptedFiles(files) {
    const mappedFiles = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: (file.size / 1024).toFixed(2) + " KB",
      })
    );
    setSelectedFiles(mappedFiles);
    // لو بتستخدم Formik
    if (files[0]) {
      setFieldValue("avatar", files[0]);
    }
  }

  // ✅ حذف الصورة
  const handleDeleteImage = (fileToDelete) => {
    setSelectedFiles((prev) =>
      prev.filter((file) => file !== fileToDelete)
    );
    // تنظيف الذاكرة لو الصورة مرفوعة من الجهاز
    if (fileToDelete.preview?.startsWith("blob:")) {
      URL.revokeObjectURL(fileToDelete.preview);
    }
    setFieldValue("avatar", null);
  };
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <div className="sub-title">
            {t("common.Attachments")}
          </div>
        </CardHeader>
        <CardBody>
          {loadingProfile ?
            <ComponentLoader/>
          : 
            <div className='d-flex align-items-center justify-content-center upload-box'
              style={{backgroundColor: disableEdit ? "#e9ebec" : "", opacity: disableEdit ? "0.7" : "1", pointerEvents: disableEdit ? "none" : "auto" }}
            >
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  id="fileUpload"
                  accept="image/*"
                  style={{
                    cursor: disableEdit ? "default" : "pointer"
                  }}
                  disabled={disableEdit}
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    handleAcceptedFiles(files);
                  }}
                />
                {selectedFiles.length === 0 &&(
                  <>
                    <div className='mx-auto' 
                      onClick={() => {
                        if (!disableEdit) {
                          fileInputRef.current.click();
                        }
                      }}
                    >
                      <h5 className="fs-15 my-1 mx-auto text-center">
                        {t("common.InsertProductImage")}
                      </h5>
                      <p className="text-muted image-text my-1 text-center">
                        {t("common.imagesize")}
                      </p>
                    </div>
                    <div
                      className="dropzone-custom text-center"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const files = Array.from(e.dataTransfer.files);
                        handleAcceptedFiles(files);
                      }}
                    >
                      <label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
                        <div className="text-center">
                            <div className="my-3">
                              <img
                                src={MySVG.GalleryAdd}
                                alt=""
                                className="display-4 avatar-md "
                              /> 
                            </div>           
                          <p className="text-muted fs-18">
                            {t(
                              "common.InsertDocumentsHere"
                            )} {" "}
                            <span className="fs-18">
                              {t("common.OrClickToUpload")}
                            </span>
                          </p>
                        </div>
                      </label>
                    </div>
                  </>
                )}
                <div
                  className="list-unstyled mb-0"
                  id="file-previews"
                >
                  {selectedFiles?.map((f, i) => {
                    return (
                      <div>
                        <div className="p-2 position-relative"
                          key={i + "-file"}
                        >
                        <Row className="align-items-center justify-content-center flex-column  ">
                          <button
                            style={{width: "35px", height: "35px", top:"10px", right: "-50px", display: disableEdit ? "none" : "flex" }}
                            className="d- flex align-items-center justify-content-center  rounded-5 position-absolute translate-middle bg-white"
                            onClick={() =>
                              handleDeleteImage(f)
                            }
                            disabled={disableEdit}
                          >
                            <i className='ri-close-circle-line fs-2 text-black'/>
                          </button>
                          
                          <Col className="col-auto"
                            disabled={disableEdit}
                            >
                            <img
                              onClick={() => {
                                if (!disableEdit) {
                                  fileInputRef.current.click();
                                }
                              }}
                              data-dz-thumbnail=""
                              height="200"
                              width="200"
                              className="avatar- sm rounded bg -light"
                              alt={
                                f?.name
                                  ? f?.name
                                  : "product"
                              }
                              src={
                                f?.preview
                                  ? f?.preview
                                  : f
                              }
                            />
                          </Col>
                          <Col className="col-auto mt-2">
                            <a
                              download
                              href={f?.preview}
                              className="text- muted font-weight-bold"
                            >
                              <strong>
                                {f?.name
                                  ? f?.name
                                  : ""}
                              </strong>
                            </a>
                          </Col>
                        </Row>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          }
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
