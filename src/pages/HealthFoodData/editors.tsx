import React, { ChangeEvent, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import {
  Form,
  Card,
  CardBody,
  Col,
  Row,
  Container,
  CardHeader,
  Button,
  Label,
  Input,
} from "reactstrap";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";

// Form Editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";

const HealthFoodFormEditors = (props: any) => {
  const [toggle, setToggle] = useState(0);
  const [loading, setLoading] = useState(0);

  const onChangeFiles = (event: any) => {
    console.log(event.currentTarget.files[0]);

    props.propFunction({ file: event.currentTarget.files[0] });
  };

  const onChangeEditor = (e: any) => {
    props.propFunction(e);
  };

  const setData = () => {};

  // const postContent = async () => {
  //   const draft_data = JSON.stringify(
  //     convertToRaw(content.getCurrentContent())
  //   );
  //   console.log(draft_data);

  //   await axios
  //     .post(`http://localhost:3000/draft/`, { data: draft_data })
  //     .then(response => {
  //       const response_data = response.data;

  //       console.log("message", response_data.message);
  //       console.log("data", response_data.data);
  //     });
  // };

  // const getContent = async () => {
  //   console.log(1);
  //   await axios.get(`http://localhost:3000/draft?id=3`).then(response => {
  //     const response_data = response.data;
  //     console.log(response_data);
  //     if (response_data.data.length) {
  //       const draft_data = convertFromRaw(
  //         JSON.parse(response_data.data[0].text)
  //       );
  //       const editor_data = EditorState.createWithContent(draft_data);
  //       setContent(editor_data);
  //     }
  //   });
  // };

  // const postFile = async () => {
  //   const formData = new FormData();
  //   formData.append("file", File);
  //   formData.append("data", "hello");

  //   console.log(File);

  //   await axios
  //     .post(`http://localhost:3000/draft/file`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data, boundary=${form._boundary}",
  //       },
  //     })
  //     .then(response => {
  //       console.log("complete");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    setToggle(props.toggleOnOff);
    setData();
    setLoading(1);
    console.log("toggle", props.toggleOnOff);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <>
      {toggle ? (
        <>
          <div className="card border shadow-none">
            <div className="card-header d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm">
                  <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                    4
                  </div>
                </div>
              </div>
              <div className="flex-grow-1">
                <h5 className="card-title">리포트</h5>
              </div>
            </div>
            <CardBody>
              <Editor
                editorState={props.content}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(content: any) =>
                  onChangeEditor({ content })
                }
              />
            </CardBody>
          </div>

          <div className="card border shadow-none">
            <div className="card-header d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm">
                  <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                    5
                  </div>
                </div>
              </div>
              <div className="flex-grow-1">
                <h5 className="card-title">파일 첨부</h5>
              </div>
            </div>
            <CardBody>
              <Row>
                <Col xl={6}>
                  <div className="mb-3">
                    <Input
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={onChangeFiles}
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </div>
        </>
      ) : (
        <>
          <div className="card border shadow-none">
            <div className="card-header d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm">
                  <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                    4
                  </div>
                </div>
              </div>
              <div className="flex-grow-1">
                <h5 className="card-title">리포트</h5>
              </div>
            </div>
            <CardBody>
              <Editor
                readOnly={true}
                editorState={props.content}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
              />
            </CardBody>
          </div>

          <div className="card border shadow-none">
            <div className="card-header d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm">
                  <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                    5
                  </div>
                </div>
              </div>
              <div className="flex-grow-1">
                <h5 className="card-title">파일 첨부</h5>
              </div>
            </div>
            <CardBody>
              <Row>
                <Col xl={6}>
                  <div className="mb-3">
                    <Input
                      className="form-control"
                      type="file"
                      id="formFile"
                      onChange={onChangeFiles}
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </div>
        </>
      )}
    </>
  );
};

export default HealthFoodFormEditors;
