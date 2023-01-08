import { useCallback, useEffect, useRef, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Col,
  Container,
  Row,
  InputGroup,
  Form,
  Label,
  Input,
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

// component

const HealthFoodDataRegister = () => {
  const [loading, setLoading] = useState(false);

  const setting = {
    PRDUCT: "예시) 6년근고려홍삼황제정스틱",
    STTEMNT_NO: "예시) 201600065981",
    ENTRPS: "예시) 토음바이오 주식회사",
    REGIST_DT: "예시) 20160704",
    DISTB_PD: "예시) 제조일로부터 24개월",
    SUNGSANG: "예시) 이미, 이취가 없고 고유의 향미가 있는 흑갈색의 액상",
    SRV_USE: "예시) 1일 1회, 1회 1포(15ml)를 섭취하십시오. ",
    PRSRV_PD: "예시) 직사광선을 피하고 서늘한 곳 보관",
    INTAKE_HINT1: "예시) 의약품(당뇨치료제, 혈액항응고제) 복용 시 섭취에 주의",
    MAIN_FNCTN:
      "예시) ①면역력 증진에 도움을 줄 수 있음②피로개선에 도움을 줄 수 있음③혈소판 응집 억제를 통한 혈액흐름에 도움을 줄 수 있음④기억력 개선에 도움을 줄 수 있음⑤항산화에 도움을 줄 수 있음",
    PRMS_IMG:
      "예시) https://stagebodybuddy.blob.core.windows.net/crawl/HealthFoodData/6%EB%85%84%EA%B7%BC%EA%B3%A0%EB%A0%A4%ED%99%8D%EC%82%BC%ED%99%A9%EC%A0%9C%EC%A0%95%EC%8A%A4%ED%8B%B1",
    PRMS_STANDARD: '예시) {"진세노사이드 Rg1, Rb1 및 Rg3의 합":"8.4mg"}',
  };

  // modal
  const [RegistModal, setRegistModal] = useState(false);

  const toggle = () => setRegistModal(!RegistModal);

  //

  const [data, setData] = useState<any>(setting);
  const [selectedMulti, setselectedMulti] = useState(null);
  const [selectedFiles, setselectedFiles] = useState<any>([]);

  ////////////// 성분 //////////////////
  interface InputItem {
    standard: string;
    quantity: string;
  }

  //   const nextID = useRef<number>(1);
  const [inputItems, setInputItems] = useState<InputItem[]>([
    { standard: "ex) 아연, 진세노사이드", quantity: "ex) 10mg, 20ug" },
  ]);

  // 추가
  function addInput() {
    const input = {
      standard: "ex) 아연, 진세노사이드",
      quantity: "ex) 10mg, 20ug",
    };

    setInputItems([...inputItems, input]); // 기존 값에 새로운 인풋객체를 추가해준다.
    // nextID.current += 1; // id값은 1씩 늘려준다.
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
    console.log(value, name, index);

    const new_inputItems: any = JSON.parse(JSON.stringify(inputItems));
    new_inputItems[index][name] = value;
    setInputItems(new_inputItems);
  };
  /////////////////////////////////////

  const onChange = (e: { target: { value: any; name: any } }) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setData({
      ...data, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
    console.log(data);
  };

  const postData = async () => {
    const formData = new FormData();
    let final_data = data;
    let parse_data: any = new Object();
    if (inputItems.length) {
      for (let i = 0; i < inputItems.length; i++) {
        const key = inputItems[i].standard;
        const value = inputItems[i].quantity;
        parse_data[key] = value;
      }
    }

    final_data.PRMS_STANDARD = parse_data;
    formData.append("file", selectedFiles[0]);
    formData.append("data", JSON.stringify(data));

    await axios
      .post("http://localhost:3000/item", formData)
      .then(response => {
        console.log("response", response.data);
        window.location.href = `/HealthFoodData`;
      })
      .catch(err => {
        console.log(err);
      });
  };

  function handleMulti(selectedMulti: any) {
    setselectedMulti(selectedMulti);
  }

  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const optionGroup = [
    { label: "Photoshop", value: "photoshop" },
    { label: "illustrator", value: "illustrator" },
    { label: "HTML", value: "HTML" },
    { label: "CSS", value: "CSS" },
    { label: "Javascript", value: "Javascript" },
    { label: "Php", value: "Php" },
    { label: "Python", value: "Python" },
  ];

  ////////////////////////////////////////////////////////////////
  // data 값 변경

  const searchstandardChange = (data: any) => {
    const low_data = data.low_data;
    const index = data.index;

    const new_inputItems: any = JSON.parse(JSON.stringify(inputItems));
    new_inputItems[index]["standard"] = low_data;
    setInputItems(new_inputItems);
    console.log(inputItems, "변경");
  };

  // low component data
  const HighSearch = async (low_data: any) => {
    try {
      searchstandardChange(low_data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page-content">
      <MetaTags>
        <title>
          User Settings | Dashonic - React Admin & Dashboard Template
        </title>
      </MetaTags>
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
                                상품명(PRDUCT)
                              </label>
                              <div>
                                <AvField
                                  name="PRDUCT"
                                  type="text"
                                  className="form-control"
                                  id="PRDUCT"
                                  placeholder="hello"
                                  errorMessage="Email invalid or already in use"
                                  value={data.PRDUCT}
                                  onChange={onChange}
                                />
                              </div>
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
                                모델명(STTEMNT_NO)
                              </label>
                              <input
                                name="STTEMNT_NO"
                                type="text"
                                className="form-control"
                                id="STTEMNT_NO"
                                required
                                placeholder={data.STTEMNT_NO}
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
                                제조사명(ENTRPS)
                              </label>
                              <input
                                name="ENTRPS"
                                type="text"
                                className="form-control"
                                id="ENTRPS"
                                required
                                placeholder={data.ENTRPS}
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
                                상품정보(MAIN_FNCTN)
                              </label>
                              <input
                                name="MAIN_FNCTN"
                                type="text"
                                className="form-control"
                                id="MAIN_FNCTN"
                                placeholder={data.MAIN_FNCTN}
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
                                등록번호(REGIST_DT)
                              </label>
                              <input
                                name="REGIST_DT"
                                type="text"
                                className="form-control"
                                id="REGIST_DT"
                                placeholder={data.REGIST_DT}
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
                                사용기간(DISTB_PD)
                              </label>
                              <input
                                name="DISTB_PD"
                                type="text"
                                className="form-control"
                                id="DISTB_PD"
                                placeholder={data.DISTB_PD}
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
                                성상(SUNGSANG)
                              </label>
                              <input
                                name="SUNGSANG"
                                type="text"
                                className="form-control"
                                id="SUNGSANG"
                                placeholder={data.SUNGSANG}
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
                                권유 섭취량(SRV_USE)
                              </label>
                              <input
                                name="SUNGSANG"
                                type="text"
                                className="form-control"
                                id="SRV_USE"
                                placeholder={data.SRV_USE}
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
                                보관장소(PRSRV_PD)
                              </label>
                              <input
                                name="SUNGSANG"
                                type="text"
                                className="form-control"
                                id="PRSRV_PD"
                                placeholder={data.PRSRV_PD}
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
                                주의사항(INTAKE_HINT1)
                              </label>
                              <input
                                name="INTAKE_HINT1"
                                type="text"
                                className="form-control"
                                id="INTAKE_HINT1"
                                placeholder={data.INTAKE_HINT1}
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
                        <Col lg={2}>
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
                            <Col lg={2}>
                              <div className="mb-3" key={index}>
                                <input
                                  key={index}
                                  type="text"
                                  name="standard"
                                  className="form-control"
                                  id="workexperience-designation-input"
                                  placeholder={item.standard || ""}
                                  onChange={standardChange.bind(null, index)}
                                />
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
                                  placeholder={item.quantity || ""}
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
