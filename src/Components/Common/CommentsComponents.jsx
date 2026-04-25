import { ErrorMessage } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardBody, CardHeader, FormGroup, Input, Label } from 'reactstrap'
import ComponentLoader from './ComponentLoader';

export default function CommentsComponents({
  values,
  handleBlur,
  setFieldValue,
  touched,
  errors,
  loadingProfile = false,
  disableEdit = false
}) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <div className="sub-title">
            {t("common.comments")}
          </div>
        </CardHeader>
        <CardBody>
          {loadingProfile ?
            <ComponentLoader/>
          : <>
              {/* ------ ملاحظات ------ */}
              <FormGroup>
                <Label
                  htmlFor="comments"
                  className="form-label"
                >
                  {t("common.enter")} {t("common.comments")}{" "}
                </Label>
                <Input
                  type="textarea"
                  placeholder={`${t("common.enter")} ${t("common.comments")} ${t("common.placeholder")}`}
                  title={t("common.comments")}
                  name="comments"
                  id="comments"
                  rows='5'
                  onChange={(e) =>
                    setFieldValue("comments", e.target.value)
                  }
                  value={values?.comments}
                  onBlur={handleBlur}
                  disabled={disableEdit}
                />
                {touched?.comments && errors?.comments && (
                  <ErrorMessage
                    name="comments"
                    component="div"
                    className="text-danger"
                  />
                )}
              </FormGroup>
            </>
          }
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
