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

const HealthFoodFormEditors = () => {
  const [content, setContent] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );

  const [File, setFile] = useState<any>(null);

  const formatBytes = (bytes: any, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const onChangeFiles = (event: any) => {
    console.log(event.currentTarget.files[0]);

    setFile(event.currentTarget.files[0]);
  };

  //   const onChangeFiles = (e: ChangeEvent<HTMLInputElement> | any) => {
  //     console.log(e);
  //     let selectFiles: File[] = [];

  //     if (e.type === "drop") {
  //       selectFiles.push(e.dataTransfer.files);
  //     } else {
  //       selectFiles.push(e.target.files);
  //     }
  //     console.log(selectFiles);
  //     setFile(selectFiles);
  //   };

  const postContent = async () => {
    const draft_data = JSON.stringify(
      convertToRaw(content.getCurrentContent())
    );
    console.log(draft_data);

    await axios
      .post(`http://localhost:3000/draft/`, { data: draft_data })
      .then(response => {
        const response_data = response.data;

        console.log("message", response_data.message);
        console.log("data", response_data.data);
      });

    // const SendContent = JSON.stringify(convertToRaw(content));
  };

  const getContent = async () => {
    console.log(1);
    await axios.get(`http://localhost:3000/draft?id=3`).then(response => {
      const response_data = response.data;
      console.log(response_data);
      if (response_data.data.length) {
        const draft_data = convertFromRaw(
          JSON.parse(response_data.data[0].text)
        );
        const editor_data = EditorState.createWithContent(draft_data);
        // const draft_data = createWithContent(JSON.parse(response_data.data));
        setContent(editor_data);
      }
    });
  };

  const postFile = async () => {
    const formData = new FormData();
    formData.append("file", File);
    formData.append("data", "hello");

    console.log(File);

    await axios
      .post(`http://localhost:3000/draft/file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data, boundary=${form._boundary}",
        },
      })
      .then(response => {
        console.log("complete");
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getContent();
    console.log(content);
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Form Editors | Dashonic - React Admin & Dashboard Template
          </title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Editors" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="card-header justify-content-between d-flex align-items-center">
                  <h4 className="card-title">react-draft-wysiwyg</h4>
                  <Link
                    to="//www.npmjs.com/package/react-draft-wysiwyg"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-soft-secondary"
                  >
                    Docs <i className="mdi mdi-arrow-right align-middle"></i>
                  </Link>
                </CardHeader>
                <CardBody>
                  <Form method="post">
                    <Editor
                      editorState={content}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={setContent}
                    />
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={11}>
              <div className="mb-3">
                <Label htmlFor="formFile" className="form-label">
                  사업자 등록증
                </Label>
                <Input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={onChangeFiles}
                  //   errorMessage="파일을 업로드하세요"
                />
              </div>
            </Col>
            <Col xl={1}>
              <Button
                color="primary"
                onClick={() => {
                  postFile();
                }}
              >
                {" "}
                test
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xl={11}></Col>
            <Col xl={1}>
              <Button
                color="primary"
                onClick={() => {
                  postContent();
                }}
              >
                submit
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default HealthFoodFormEditors;
