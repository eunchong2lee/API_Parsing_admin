import { useEffect, useState } from "react";
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
} from "reactstrap";
import axios from "axios";
import Dropzone from "react-dropzone";
import Select from "react-select";
import { Link } from "react-router-dom";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { Editor } from "react-draft-wysiwyg";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import { CardBody, Card } from "reactstrap";
// import "./_product.scss";

const HealthFoodDataRevise = () => {
  //   const setting = {
  //     PRDUCT: "예시) 6년근고려홍삼황제정스틱",
  //     STTEMNT_NO: "예시) 201600065981",
  //     ENTRPS: "예시) 토음바이오 주식회사",
  //     REGIST_DT: "예시) 20160704",
  //     DISTB_PD: "예시) 제조일로부터 24개월",
  //     SUNGSANG: "예시) 이미, 이취가 없고 고유의 향미가 있는 흑갈색의 액상",
  //     SRV_USE: "예시) 1일 1회, 1회 1포(15ml)를 섭취하십시오. ",
  //     PRSRV_PD: "예시) 직사광선을 피하고 서늘한 곳 보관",
  //     INTAKE_HINT1: "예시) 의약품(당뇨치료제, 혈액항응고제) 복용 시 섭취에 주의",
  //     MAIN_FNCTN:
  //       "예시) ①면역력 증진에 도움을 줄 수 있음②피로개선에 도움을 줄 수 있음③혈소판 응집 억제를 통한 혈액흐름에 도움을 줄 수 있음④기억력 개선에 도움을 줄 수 있음⑤항산화에 도움을 줄 수 있음",
  //     PRMS_IMG:
  //       "예시) https://stagebodybuddy.blob.core.windows.net/crawl/HealthFoodData/6%EB%85%84%EA%B7%BC%EA%B3%A0%EB%A0%A4%ED%99%8D%EC%82%BC%ED%99%A9%EC%A0%9C%EC%A0%95%EC%8A%A4%ED%8B%B1",
  //     PRMS_STANDARD: '예시) {"진세노사이드 Rg1, Rb1 및 Rg3의 합":"8.4mg"}',
  //   };

  const [data, setData] = useState<any>();
  const [selectedMulti, setselectedMulti] = useState(null);
  const [selectedFiles, setselectedFiles] = useState<any>([]);

  const GetOneData = async () => {
    try {
      const response = await axios
        .get(`http://localhost:3000/item/first`)
        .then(response => {
          console.log(response.data);
          setData(response.data);
        });
      console.log(1, data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetOneData();
  }, []);

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
    formData.append("file", selectedFiles[0]);
    formData.append("data", JSON.stringify(data));

    console.log("formData", formData.get("file"));
    console.log("formData", formData.get("data"));

    await axios
      .post("http://localhost:3000/item/test", formData)
      .then(response => {
        console.log("response", response.data);
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
  if (!data) {
    return null;
  }

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
                <form>
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
                              <input
                                name="PRDUCT"
                                type="text"
                                className="form-control"
                                id="PRDUCT"
                                placeholder={data.PRDUCT}
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
                                모델명(STTEMNT_NO)
                              </label>
                              <input
                                name="STTEMNT_NO"
                                type="text"
                                className="form-control"
                                id="STTEMNT_NO"
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
                                defaultValue={data.INTAKE_HINT1}
                                id="INTAKE_HINT1"
                                onChange={onChange}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </CardBody>
                  </div>

                  <div className="card border shadow-none mb-5">
                    <div className="card-header d-flex align-items-center">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                            02
                          </div>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="card-title">건강 정보</h5>
                      </div>
                    </div>
                    <CardBody>
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Row>
                              <label
                                className="form-label"
                                htmlFor="gen-info-name-input"
                              >
                                성분
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="gen-info-name-input"
                                placeholder="예시) 38,000 원"
                              />
                              <div>&nbsp;&nbsp;</div>
                            </Row>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="gen-info-name-input"
                            >
                              효능
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="gen-info-name-input"
                              placeholder="예시) 8,000 원"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Row>
                              <label
                                className="form-label"
                                htmlFor="gen-info-name-input"
                              >
                                섭취정보
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="gen-info-name-input"
                                placeholder="예시) 38,000 원"
                              />
                              <div>&nbsp;&nbsp;</div>
                            </Row>
                          </div>
                        </Col>
                      </Row>
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
                      <Form>
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
                          {selectedFiles.length ? (
                            selectedFiles.map((f: any, i: number) => {
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
                                          {/* <strong>{f.formattedSize}</strong> */}
                                        </p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              );
                            })
                          ) : (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={1}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <div>
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt={data.PRDUCT}
                                        src={data.PRMS_IMG}
                                      />
                                    </div>
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {data.PRDUCT}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          )}
                        </div>
                      </Form>
                    </CardBody>
                  </div>
                  <div>
                    <img src={data.PRMS_IMG} />
                  </div>

                  <div className="submit-button-item text-end">
                    <button
                      type="button"
                      className="btn btn1 btn-primary w-sm"
                      onClick={() => {
                        console.log(
                          "start================================================================"
                        );
                        postData();
                      }}
                    >
                      상품 저장
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default HealthFoodDataRevise;
