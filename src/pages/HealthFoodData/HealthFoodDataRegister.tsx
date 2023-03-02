import { useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Col,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import axios from "axios";
import Dropzone from "react-dropzone";

import { Link } from "react-router-dom";
import "flatpickr/dist/themes/material_blue.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { AvForm, AvField } from "availity-reactstrap-validation";

import { CardBody, Card } from "reactstrap";
import StandardSearch from "./StandardSearch";
import HealthFoodFormEditors from "./editors";
import { convertToRaw, EditorState } from "draft-js";

// component

const HealthFoodDataRegister = () => {
  const setting = {
    PRDUCT: "",
    STTEMNT_NO: "",
    ENTRPS: "",
    REGIST_DT: "",
    DISTB_PD: "",
    SUNGSANG: "",
    SRV_USE: "",
    PRSRV_PD: "",
    INTAKE_HINT1: "",
    MAIN_FNCTN: "",
    PRMS_IMG: "",
    PRMS_STANDARD: "",
  };

  const [loading, setLoading] = useState(false);
  // modal
  const [RegistModal, setRegistModal] = useState(false);
  // data 및 images
  const [data, setData] = useState<any>(setting);
  const [selectedFiles, setselectedFiles] = useState<any>([]);
  // editor content
  const [content, setContent] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );
  // pdf file upload
  const [File, setFile] = useState<any[]>([]);
  // 성분
  const [inputItems, setInputItems] = useState<InputItem[]>([
    { standard: "", quantity: "" },
  ]);

  const toggle = () => setRegistModal(!RegistModal);

  ////////////// 성분 //////////////////
  interface InputItem {
    standard: string;
    quantity: string;
  }

  // 추가
  function addInput() {
    const input = {
      standard: "",
      quantity: "",
    };
    setInputItems([...inputItems, input]); // 기존 값에 새로운 인풋객체를 추가해준다.
  }
  // 삭제
  function deleteInput() {
    const parse_length = inputItems.length - 1;
    setInputItems(
      inputItems.filter((item, index) => {
        return index != parse_length;
      })
    );
  }

  // Change
  const standardChange = (
    index: number,
    e: { target: { value: any; name: any } }
  ) => {
    const { value, name } = e.target;

    const new_inputItems: any = JSON.parse(JSON.stringify(inputItems));
    new_inputItems[index][name] = value;
    setInputItems(new_inputItems);
  };

  const onChange = (e: { target: { value: any; name: any } }) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setData({
      ...data, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  // data 값 변경
  const searchstandardChange = (data: any) => {
    const low_data = data.low_data;
    const index = data.index;

    const new_inputItems: any = JSON.parse(JSON.stringify(inputItems));
    new_inputItems[index]["standard"] = low_data;
    setInputItems(new_inputItems);
  };

  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  // low component data
  const HighSearch = (low_data: any) => {
    try {
      searchstandardChange(low_data);
    } catch (err) {}
  };

  const HighEditorData = (low_data: any) => {
    try {
      if (low_data.content) {
        setContent(low_data.content);
      }

      if (low_data.file) {
        setFile([...File, low_data.file]);
      }
    } catch (err) {}
  };

  const HighDeleteFile = (index: number) => {
    const newFile = File.filter((file, i) => {
      return i != index;
    });
    setFile(newFile);
  };

  // server 요청
  const postData = async () => {
    const formData = new FormData();

    let parse_data: any = new Object();
    if (inputItems.length) {
      for (let i = 0; i < inputItems.length; i++) {
        const key = inputItems[i].standard;
        const value = inputItems[i].quantity;
        parse_data[key] = value;
      }
    }

    // image input
    if (selectedFiles.length) {
      for (const images of selectedFiles) {
        formData.append("images", images);
      }
    }

    // file input
    if (File.length) {
      for (const file of File) {
        formData.append("files", file);
      }
    }

    // draft input
    const draftData = JSON.stringify(convertToRaw(content.getCurrentContent()));

    // data input
    formData.append("PRDUCT", data.PRDUCT);
    formData.append("STTEMNT_NO", data.STTEMNT_NO);
    formData.append("ENTRPS", data.ENTRPS);
    formData.append("REGIST_DT", data.REGIST_DT);
    formData.append("DISTB_PD", data.DISTB_PD);
    formData.append("SUNGSANG", data.SUNGSANG);
    formData.append("SRV_USE", data.SRV_USE);
    formData.append("PRSRV_PD", data.PRSRV_PD);
    formData.append("INTAKE_HINT1", data.INTAKE_HINT1);
    formData.append("MAIN_FNCTN", data.MAIN_FNCTN);
    formData.append("draft", draftData);
    formData.append("PRMS_STANDARD", JSON.stringify(parse_data));

    await axios
      .post("http://localhost:3000/item", formData)
      .then(response => {
        // 완료시
        // window.location.href = `/HealthFoodData`;
      })
      .catch(err => {});
  };

  return (
    <div className="page-content">
      <Container fluid>
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="상품등록" breadcrumbItem="상품" />

        <Row>
          <div className="col-xxl-12 col-lg-11">
            <Card>
              <CardBody>
                <h5 className="card-title mb-4">일반 상품 등록</h5>
                <AvForm>
                  <div className="card border shadow-none mb-5">
                    <div className="card-header d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                            01
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title">기본 정보</h5>
                      </div>
                    </div>
                    <CardBody>
                      <div>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="gen-info-name-input"
                              >
                                상품명
                              </label>
                              <div>
                                <AvField
                                  name="PRDUCT"
                                  type="text"
                                  className="form-control"
                                  id="PRDUCT"
                                  placeholder="예시) 6년근고려홍삼황제정스틱"
                                  errorMessage="Email invalid or already in use"
                                  onChange={onChange}
                                />
                              </div>
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="gen-info-name-input"
                              >
                                모델명
                              </label>
                              <input
                                name="STTEMNT_NO"
                                type="text"
                                className="form-control"
                                id="STTEMNT_NO"
                                required
                                placeholder="예시) 201600065981"
                                onChange={onChange}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="gen-info-name-input"
                              >
                                제조사명
                              </label>
                              <input
                                name="ENTRPS"
                                type="text"
                                className="form-control"
                                id="ENTRPS"
                                required
                                placeholder="예시) 토음바이오 주식회사"
                                onChange={onChange}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="gen-info-name-input"
                              >
                                등록번호
                              </label>
                              <input
                                name="REGIST_DT"
                                type="text"
                                className="form-control"
                                id="REGIST_DT"
                                placeholder="예시) 20160704"
                                onChange={onChange}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="gen-info-name-input"
                              >
                                사용기간
                              </label>
                              <input
                                name="DISTB_PD"
                                type="text"
                                className="form-control"
                                id="DISTB_PD"
                                placeholder="예시) 제조일로부터 24개월"
                                onChange={onChange}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="gen-info-name-input"
                              >
                                권유 섭취량
                              </label>
                              <input
                                name="SRV_USE"
                                type="text"
                                className="form-control"
                                id="SRV_USE"
                                placeholder="예시) 1일 1회, 1회 1포(15ml)를 섭취하십시오. "
                                onChange={onChange}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="gen-info-name-input"
                              >
                                성상
                              </label>
                              <input
                                name="SUNGSANG"
                                type="text"
                                className="form-control"
                                id="SUNGSANG"
                                placeholder="예시) 이미, 이취가 없고 고유의 향미가 있는 흑갈색의 액상"
                                onChange={onChange}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="gen-info-name-input"
                              >
                                보관장소
                              </label>
                              <input
                                name="PRSRV_PD"
                                type="text"
                                className="form-control"
                                id="PRSRV_PD"
                                placeholder="예시) 직사광선을 피하고 서늘한 곳 보관"
                                onChange={onChange}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="gen-info-name-input"
                              >
                                주의사항
                              </label>
                              <input
                                name="INTAKE_HINT1"
                                type="text"
                                className="form-control"
                                id="INTAKE_HINT1"
                                placeholder="예시) 의약품(당뇨치료제, 혈액항응고제) 복용 시 섭취에 주의"
                                onChange={onChange}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="gen-info-name-input"
                              >
                                상품정보
                              </label>
                              <input
                                name="MAIN_FNCTN"
                                type="text"
                                className="form-control"
                                id="MAIN_FNCTN"
                                placeholder="예시) ①면역력 증진에 도움을 줄 수 있음②피로개선에 도움을 줄 수 있음③혈소판 응집 억제를 통한 혈액흐름에 도움을 줄 수 있음④기억력 개선에 도움을 줄 수 있음⑤항산화에 도움을 줄 수 있음"
                                onChange={onChange}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </CardBody>
                  </div>

                  <div className="card border shadow-none">
                    <div className="card-header d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                            2
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title">건강 성분</h5>
                      </div>
                      <div>
                        <Button
                          color="danger"
                          outline
                          size=""
                          onClick={() => {
                            deleteInput();
                          }}
                        >
                          -
                        </Button>{" "}
                        <Button
                          color="primary"
                          outline
                          size=""
                          onClick={() => {
                            addInput();
                          }}
                        >
                          +
                        </Button>
                      </div>

                      <div></div>
                    </div>
                    <CardBody>
                      <Row>
                        <Col lg={3}>
                          <label htmlFor="workexperience-designation-input">
                            성분명
                          </label>
                        </Col>
                        <Col lg={3}>
                          <label htmlFor="workexperience-designation-input">
                            성분량
                          </label>
                        </Col>
                      </Row>
                      {inputItems.map((item, index) => (
                        <div key={index}>
                          <Row>
                            <Col lg={3}>
                              <div className="mb-3" key={index}>
                                {item.standard ? (
                                  <div className="form-control">
                                    {item.standard}
                                  </div>
                                ) : (
                                  <div className="form-control">선택하세요</div>
                                )}
                              </div>
                            </Col>
                            <Col lg={3}>
                              <div className="mb-3" key={index}>
                                <input
                                  key={index}
                                  type="text"
                                  name="quantity"
                                  className="form-control"
                                  id="workexperience-designation-input"
                                  placeholder={"ex) 10mg, 20ug"}
                                  onChange={standardChange.bind(null, index)}
                                />
                              </div>
                            </Col>
                            <Col lg={3}>
                              <StandardSearch
                                index={index}
                                value={HighSearch}
                                propFunction={HighSearch}
                              ></StandardSearch>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </CardBody>
                  </div>

                  <div className="card border shadow-none">
                    <div className="card-header d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                            03
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title">이미지 정보</h5>
                      </div>
                    </div>
                    <CardBody>
                      <Dropzone
                        onDrop={acceptedFiles => {
                          handleAcceptedFiles(acceptedFiles);
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <div className="mb-3">
                                <i className="display-4 text-muted uil uil-cloud-upload"></i>
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div
                        className="dropzone-previews mt-3"
                        id="file-previews"
                      >
                        {selectedFiles.map((f: any, i: number) => {
                          return (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </CardBody>
                  </div>

                  <div>
                    <HealthFoodFormEditors
                      toggleOnOff={1}
                      content={content}
                      file={File}
                      propFunction={HighEditorData}
                      propDeleteFunction={HighDeleteFile}
                    ></HealthFoodFormEditors>
                  </div>

                  <div className="submit-button-item text-end">
                    <Button color="primary" type="button" onClick={toggle}>
                      상품 등록
                    </Button>
                    <Modal isOpen={RegistModal} toggle={toggle}>
                      {/* <Modal isOpen={modal} toggle={toggle} {...args}> */}
                      <ModalHeader toggle={toggle}>
                        상품을 등록하겠습니까?
                      </ModalHeader>
                      <ModalBody>상품을 등록하겠습니까?</ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          type="button"
                          onClick={() => {
                            toggle();
                            postData();
                          }}
                        >
                          예
                        </Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                          아니요
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </AvForm>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default HealthFoodDataRegister;
