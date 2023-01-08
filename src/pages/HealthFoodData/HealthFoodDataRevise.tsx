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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import Dropzone from "react-dropzone";
import { Link, useLocation } from "react-router-dom";
import "flatpickr/dist/themes/material_blue.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { CardBody, Card } from "reactstrap";
// component
import StandardSearch from "./StandardSearch";

const HealthFoodDataRevise = () => {
  const [data, setData] = useState<any>([]);
  const [copydata, setCopyData] = useState<any>([]);

  const [selectedMulti, setselectedMulti] = useState(null);
  const [selectedFiles, setselectedFiles] = useState<any>([]);
  // useEffect memory
  const [loading, setLoading] = useState(false);

  // 수정 완료 취소
  const [toggle, setToggle] = useState(0);

  // modal toggle
  const [ReviseModal, setReviseModal] = useState(false);
  const Revisetoggle = () => setReviseModal(!ReviseModal);

  // 에러 모달창
  const [errortoggle, setErrortoggle] = useState<number>(0);
  const ErrorToggle = (statusCode: number) => setErrortoggle(statusCode);

  //   const nextID = useRef<number>(1);
  const [inputItems, setInputItems] = useState<InputItem[]>([]);
  const [inputcopyItems, setInputcopyItems] = useState<InputItem[]>([]);

  // Base Data
  const GetOneData = async () => {
    try {
      const url = window.location.href;
      const id = url.split("/")[url.split("/").length - 1];
      const response = await axios
        .get(`http://localhost:3000/item/${id}`)
        .then(response => {
          console.log(response);
          if (response.data) {
            console.log("data 받아왔습니다.");
            const responsedata = response.data;
            setData(responsedata);
            setCopyData(responsedata);
            const JSON_data = JSON.parse(responsedata.PRMS_STANDARD);
            const data_length = Object.keys(JSON_data);
            const input_item: any = [];
            for (let i = 0; i < data_length.length; i++) {
              const key = Object.keys(JSON_data)[i];
              const value = JSON_data[Object.keys(JSON_data)[i]];
              const new_object: InputItem = { standard: key, quantity: value };
              input_item.push(new_object);
            }
            const copyinput_item = JSON.parse(JSON.stringify(input_item));

            setInputItems(input_item);
            setInputcopyItems(copyinput_item);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    GetOneData();
    setLoading(false);
  }, []);

  // toggle set
  const onChangeToggle = (num: number) => {
    setToggle(num);
  };

  // cancel onclie
  const CancelClick = () => {
    setCopyData(data);
    setInputItems(inputcopyItems);
    setselectedFiles([]);
  };

  ////////////// 성분 //////////////////
  interface InputItem {
    standard: string;
    quantity: string;
  }

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
    console.log(inputItems, inputcopyItems);
  };
  /////////////////////////////////////

  const onChange = (e: { target: { value: any; name: any } }) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    console.log(value, name);
    setCopyData({
      ...copydata, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
    console.log(copydata);
  };

  const putData = async () => {
    const url = window.location.href;
    const id = url.split("/")[url.split("/").length - 1];
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
    console.log(inputItems, inputcopyItems);

    final_data.PRMS_STANDARD = parse_data;
    console.log(final_data);
    formData.append("file", selectedFiles[0]);
    formData.append("data", JSON.stringify(copydata));

    await axios
      .put(`http://localhost:3000/item/${id}`, formData)
      .then(response => {
        const responsedata = response.data;
        console.log(responsedata);
        responsedata.PRMS_STANDARD = JSON.stringify(responsedata.PRMS_STANDARD);
        setData(responsedata);
        setCopyData(responsedata);
        console.log(responsedata);
        const JSON_data = JSON.parse(responsedata.PRMS_STANDARD);
        const data_length = Object.keys(JSON_data);
        const input_item = [];
        for (let i = 0; i < data_length.length; i++) {
          const key = Object.keys(JSON_data)[i];
          const value = JSON_data[Object.keys(JSON_data)[i]];
          const new_object: InputItem = { standard: key, quantity: value };
          input_item.push(new_object);
        }

        setInputItems(input_item);
        setInputcopyItems(input_item);
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

  return (
    <div className="page-content">
      <MetaTags>
        <title>
          User Settings | Dashonic - React Admin & Dashboard Template
        </title>
      </MetaTags>
      <Container fluid>
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="건강식품 관리" breadcrumbItem="건강식품" />

        <Row>
          <div className="col-xxl-12 col-lg-11">
            <Card>
              <CardBody>
                <h5 className="card-title mb-4">건강 식품 관리</h5>
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
                            {toggle ? (
                              <input
                                name="PRDUCT"
                                type="text"
                                className="form-control"
                                id="PRDUCT"
                                value={copydata.PRDUCT}
                                onChange={onChange}
                              />
                            ) : (
                              <Card className="form-control">
                                {data.PRDUCT}
                              </Card>
                            )}
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
                            {toggle ? (
                              <input
                                name="STTEMNT_NO"
                                type="text"
                                className="form-control"
                                id="STTEMNT_NO"
                                value={copydata.STTEMNT_NO}
                                onChange={onChange}
                              />
                            ) : (
                              <Card className="form-control">
                                {data.STTEMNT_NO}
                              </Card>
                            )}
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
                            {toggle ? (
                              <input
                                name="ENTRPS"
                                type="text"
                                className="form-control"
                                id="ENTRPS"
                                value={copydata.ENTRPS}
                                onChange={onChange}
                              />
                            ) : (
                              <Card className="form-control">
                                {data.ENTRPS}
                              </Card>
                            )}
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
                            {toggle ? (
                              <input
                                name="MAIN_FNCTN"
                                type="text"
                                className="form-control"
                                id="MAIN_FNCTN"
                                value={copydata.MAIN_FNCTN}
                                onChange={onChange}
                              />
                            ) : (
                              <Card className="form-control">
                                {data.MAIN_FNCTN}
                              </Card>
                            )}
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
                            {toggle ? (
                              <input
                                name="REGIST_DT"
                                type="text"
                                className="form-control"
                                id="REGIST_DT"
                                value={copydata.REGIST_DT}
                                onChange={onChange}
                              />
                            ) : (
                              <Card className="form-control">
                                {data.REGIST_DT}
                              </Card>
                            )}
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
                            {toggle ? (
                              <input
                                name="DISTB_PD"
                                type="text"
                                className="form-control"
                                id="DISTB_PD"
                                value={copydata.DISTB_PD}
                                onChange={onChange}
                              />
                            ) : (
                              <Card className="form-control">
                                {data.DISTB_PD}
                              </Card>
                            )}
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
                            {toggle ? (
                              <input
                                name="SUNGSANG"
                                type="text"
                                className="form-control"
                                id="SUNGSANG"
                                value={copydata.SUNGSANG}
                                onChange={onChange}
                              />
                            ) : (
                              <Card className="form-control">
                                {data.SUNGSANG}
                              </Card>
                            )}
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
                            {toggle ? (
                              <input
                                name="SRV_USE"
                                type="text"
                                className="form-control"
                                id="SRV_USE"
                                value={copydata.SRV_USE}
                                onChange={onChange}
                              />
                            ) : (
                              <Card className="form-control">
                                {data.SRV_USE}
                              </Card>
                            )}
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
                            {toggle ? (
                              <input
                                name="PRSRV_PD"
                                type="text"
                                className="form-control"
                                id="PRSRV_PD"
                                value={copydata.PRSRV_PD}
                                onChange={onChange}
                              />
                            ) : (
                              <Card className="form-control">
                                {data.PRSRV_PD}
                              </Card>
                            )}
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
                            {toggle ? (
                              <input
                                name="INTAKE_HINT1"
                                type="text"
                                className="form-control"
                                id="INTAKE_HINT1"
                                value={copydata.INTAKE_HINT1}
                                onChange={onChange}
                              />
                            ) : (
                              <Card className="form-control">
                                {data.INTAKE_HINT1}
                              </Card>
                            )}
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
                    {toggle ? (
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
                    ) : null}
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
                    {toggle
                      ? inputItems.map((item, index) => (
                          <div key={index}>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <input
                                    name="standard"
                                    type="text"
                                    className="form-control"
                                    id="standard"
                                    value={inputItems[index].standard}
                                    onChange={standardChange.bind(null, index)}
                                  />
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    name="quantity"
                                    className="form-control"
                                    id="quantity"
                                    value={item.quantity}
                                    onChange={standardChange.bind(null, index)}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </div>
                        ))
                      : inputItems.map((item, index) => (
                          <div key={index}>
                            <Row>
                              <Col lg={3}>
                                <div className="mb-3" key={index}>
                                  <Card className="form-control">
                                    {item.standard}
                                  </Card>
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div className="mb-3" key={index}>
                                  <Card className="form-control">
                                    {item.quantity}
                                  </Card>
                                </div>
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
                    <Form>
                      {toggle ? (
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
                      ) : null}

                      <div
                        className="dropzone-previews mt-3"
                        id="file-previews"
                      >
                        {data.PRMS_IMG ? (
                          selectedFiles.length ? (
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
                          )
                        ) : (
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
                        )}
                      </div>
                    </Form>
                  </CardBody>
                </div>

                {toggle ? (
                  <div>
                    <Row>
                      <Col md={10}></Col>
                      <Col md={1}>
                        <div className="submit-button-item text-end">
                          <button
                            type="button"
                            className="btn btn1 btn-danger w-sm"
                            onClick={() => {
                              onChangeToggle(0);
                              CancelClick();
                            }}
                          >
                            수정 취소
                          </button>
                        </div>
                      </Col>
                      <Col md={1}>
                        <div className="submit-button-item text-end">
                          <button
                            type="button"
                            className="btn btn1 btn-primary w-sm"
                            onClick={Revisetoggle}
                          >
                            저장 하기
                          </button>
                          <Modal isOpen={ReviseModal} toggle={Revisetoggle}>
                            {/* <Modal isOpen={modal} toggle={toggle} {...args}> */}
                            <ModalHeader toggle={Revisetoggle}>
                              상품을 수정하겠습니까?
                            </ModalHeader>
                            <ModalBody>상품을 수정하겠습니까?</ModalBody>
                            <ModalFooter>
                              <Button
                                color="primary"
                                type="button"
                                onClick={() => {
                                  Revisetoggle();
                                  onChangeToggle(0);
                                  putData();
                                }}
                              >
                                예
                              </Button>{" "}
                              <Button color="secondary" onClick={Revisetoggle}>
                                아니요
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <div className="submit-button-item text-end">
                    <button
                      type="button"
                      className="btn btn1 btn-primary w-sm"
                      onClick={() => {
                        onChangeToggle(1);
                      }}
                    >
                      상품 수정
                    </button>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default HealthFoodDataRevise;
