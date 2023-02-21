import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Button, Input } from "reactstrap";
// Form Editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import embed from "embed-video";

const HealthFoodFormEditors = (props: any) => {
  const [loading, setLoading] = useState(0);

  const onChangeFiles = (event: any) => {
    console.log(event.currentTarget.files[0]);

    props.propFunction({ file: event.currentTarget.files[0] });
  };

  const onChangeEditor = (e: any) => {
    props.propFunction(e);
  };

  const deleteFile = (index: number) => {
    props.propDeleteFunction(index);
  };

  // const getContent = async () => {
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

  const uploadCallback = async (file: Blob) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const body = { id: 1 };
      formData.append("image", file);
      formData.append("id", "1");
      axios
        .post(`http://localhost:3000/draft/image`, formData)
        .then(response => {
          resolve({ data: { link: response.data } });
          // resolve(`<img src= ${response.data}>`);
        });
    });
  };

  useEffect(() => {
    setLoading(1);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <>
      {props.toggleOnOff ? (
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
                toolbar={{
                  image: {
                    uploadCallback: uploadCallback,
                    previewImage: true,
                    inputAccept:
                      "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                    alt: { present: true, mandatory: false },
                    defaultSize: {
                      height: "auto",
                      width: "auto",
                    },
                  },
                  link: {
                    linkCallback: (params: any) => ({ ...params }),
                  },
                  embedded: {
                    embedCallback: (link: any) => {
                      const detectedSrc = /<iframe.*? src="(.*?)"/.exec(
                        embed(link)
                      );
                      return (detectedSrc && detectedSrc[1]) || link;
                    },
                  },
                }}
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
              <Row>
                {props.file.length
                  ? props.file.map((file: any, index: number) => {
                      return (
                        <div key={index}>
                          <Row>
                            <Col xl={4}>
                              <div className="form-control"> {file.name}</div>
                            </Col>
                            <Col xl={1}>
                              <Button
                                color="danger"
                                onClick={() => {
                                  deleteFile(index);
                                }}
                              >
                                {"x"}
                              </Button>
                            </Col>
                            <div>&nbsp;</div>
                          </Row>
                        </div>
                      );
                    })
                  : null}
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
                    <Card className="form-control" id="formFile">
                      {"파일을 추가하거나 삭제하고 싶으면 수정버튼을 누르세요"}
                    </Card>
                  </div>
                </Col>
              </Row>
              <Row>
                {props.file.length
                  ? props.file.map((file: any, index: number) => {
                      return (
                        <div key={index}>
                          <Row>
                            <Col xl={4}>
                              <div className="form-control"> {file.name}</div>
                              <script async src={file.File}></script>
                            </Col>
                            <div>&nbsp;</div>
                          </Row>
                        </div>
                      );
                    })
                  : null}
              </Row>
            </CardBody>
          </div>
        </>
      )}
    </>
  );
};

export default HealthFoodFormEditors;
