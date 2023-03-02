import { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Col,
  Container,
  Row,
  Form,
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

import { CardBody, Card } from "reactstrap";
// component
import StandardSearch from "./StandardSearch";
import HealthFoodFormEditors from "./editors";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";

const HealthFoodDataRevise = () => {
  // interface
  interface InputItem {
    standard: string;
    quantity: string;
  }

  const [loading, setLoading] = useState(false);

  // basic data
  const [data, setData] = useState<any>([]);
  const [copydata, setCopyData] = useState<any>([]);

  // 수정 완료 취소
  const [toggle, setToggle] = useState(0);

  // modal toggle
  const [ReviseModal, setReviseModal] = useState(false);
  const Revisetoggle = () => setReviseModal(!ReviseModal);

  // 에러 모달창
  const [errortoggle, setErrortoggle] = useState<number>(0);
  const ErrorToggle = (statusCode: number) => setErrortoggle(statusCode);

  //   standard
  const [inputItems, setInputItems] = useState<InputItem[]>([]);
  const [inputcopyItems, setInputcopyItems] = useState<InputItem[]>([]);

  // editor content, copyContent
  const [content, setContent] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );
  const [copyContent, setCopyContent] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );

  // images
  const [selectedFiles, setselectedFiles] = useState<any[]>([]);
  const [requestImages, setRequestImages] = useState<any[]>([]);

  // pdf file upload
  const [File, setFile] = useState<any[]>([]);
  const [requestFiles, setRequestFiles] = useState<any[]>([]);

  // low component data
  const HighEditorData = async (low_data: any) => {
    try {
      if (low_data.content) {
        setContent(low_data.content);
      }

      if (low_data.file) {
        Object.assign(low_data.file, {
          new: true,
        });
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

  // searchstandard
  const searchstandardChange = (data: any) => {
    const low_data = data.low_data;
    const index = data.index;

    const new_inputItems: any = JSON.parse(JSON.stringify(inputItems));
    new_inputItems[index]["standard"] = low_data;
    setInputItems(new_inputItems);
  };

  // low component data
  const HighSearch = async (low_data: any) => {
    try {
      searchstandardChange(low_data);
    } catch (err) {}
  };

  // Base Data
  const GetOneData = async () => {
    try {
      const url = window.location.href;
      const id = url.split("/")[url.split("/").length - 1];
      const response = await axios
        .get(`http://localhost:3000/item/${id}`)
        .then(response => {
          if (response.data.item) {
            const responseData = response.data.item;
            setData(responseData);
            setCopyData(responseData);

            if (responseData.PRMS_STANDARD) {
              const JSONData = JSON.parse(responseData.PRMS_STANDARD);

              const dataLength = Object.keys(JSONData).length;
              const inputItem: any = [];

              for (let i = 0; i < dataLength; i++) {
                const key = Object.keys(JSONData)[i];
                const value = JSONData[Object.keys(JSONData)[i]];
                const new_object: InputItem = {
                  standard: key,
                  quantity: value,
                };
                inputItem.push(new_object);
              }
              const copyinputItem = JSON.parse(JSON.stringify(inputItem));

              setInputItems(inputItem);
              setInputcopyItems(copyinputItem);
            }
          }

          if (response.data.draft) {
            const responseData = response.data.draft;
            if (JSON.stringify(responseData) !== "{}") {
              const draftData = convertFromRaw(JSON.parse(responseData.text));
              const editorData = EditorState.createWithContent(draftData);
              const copyeEditorData = JSON.parse(JSON.stringify(editorData));
              setContent(editorData);
              setCopyContent(copyeEditorData);
            }
          }

          if (response.data.images.length) {
            const responseData = response.data.images;
            setRequestImages(responseData);
            setselectedFiles(responseData);
          }

          if (response.data.files.length) {
            const responseData = response.data.files;
            setRequestFiles(responseData);
            setFile(responseData);
          }
        });
    } catch (err) {}
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
    setContent(copyContent);
    setFile(requestFiles);
    setselectedFiles(requestImages);
  };

  ////////////// 성분 //////////////////
  // 추가
  function addInput() {
    const input = {
      standard: "ex) 아연, 진세노사이드",
      quantity: "ex) 10mg, 20ug",
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
  /////////////////////////////////////

  const onChange = (e: { target: { value: any; name: any } }) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setCopyData({
      ...copydata, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const putData = async () => {
    const url = window.location.href;
    const id = url.split("/")[url.split("/").length - 1];

    // form data
    const formData = new FormData();

    // standard parsing
    let parseData: any = new Object();
    if (inputItems.length) {
      for (let i = 0; i < inputItems.length; i++) {
        const key = inputItems[i].standard;
        const value = inputItems[i].quantity;
        parseData[key] = value;
      }
    }
    // draft data
    const draftData = JSON.stringify(convertToRaw(content.getCurrentContent()));

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

    formData.append("PRDUCT", copydata.PRDUCT);
    formData.append("STTEMNT_NO", copydata.STTEMNT_NO);
    formData.append("ENTRPS", copydata.ENTRPS);
    formData.append("REGIST_DT", copydata.REGIST_DT);
    formData.append("DISTB_PD", copydata.DISTB_PD);
    formData.append("SUNGSANG", copydata.SUNGSANG);
    formData.append("SRV_USE", copydata.SRV_USE);
    formData.append("PRSRV_PD", copydata.PRSRV_PD);
    formData.append("INTAKE_HINT1", copydata.INTAKE_HINT1);
    formData.append("MAIN_FNCTN", copydata.MAIN_FNCTN);
    formData.append("draft", draftData);
    formData.append("PRMS_STANDARD", JSON.stringify(parseData));

    await axios
      .put(`http://localhost:3000/item/${id}`, formData)
      .then(response => {
        if (response.data.item) {
          const responseData = response.data.item;

          setData(responseData);
          setCopyData(responseData);
          if (responseData.PRMS_STANDARD) {
            const JSONData = JSON.parse(responseData.PRMS_STANDARD);
            const dataLength = Object.keys(JSONData);
            const inputItem = [];
            for (let i = 0; i < dataLength.length; i++) {
              const key = Object.keys(JSONData)[i];
              const value = JSONData[Object.keys(JSONData)[i]];
              const newObject: InputItem = { standard: key, quantity: value };
              inputItem.push(newObject);
            }

            setInputItems(inputItem);
            setInputcopyItems(inputItem);
          }
        }

        if (response.data.image.length) {
          const responseData = response.data.image;
          setRequestImages(responseData);
          setselectedFiles(responseData);
        }

        if (response.data.file.length) {
          const responseData = response.data.files;
          setRequestFiles(responseData);
          setFile(responseData);
        }

        if (response.data.draft) {
          const responseData = response.data.draft;
          if (JSON.stringify(responseData) !== "{}") {
            const draftData = convertFromRaw(JSON.parse(responseData.text));
            const editorData = EditorState.createWithContent(draftData);
            const copyeEditorData = JSON.parse(JSON.stringify(editorData));
            setContent(editorData);
            setCopyContent(copyeEditorData);
          }
        }
      })
      .catch(err => {});
  };

  const deleteImage = async (i: number) => {
    setselectedFiles(
      selectedFiles.filter((item, index) => {
        return index != i;
      })
    );
  };

  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
        new: true,
      })
    );
    setselectedFiles([...selectedFiles, ...files]);
  }

  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <div className="page-content">
      <Container fluid>
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="건강식품 목록" breadcrumbItem="건강식품 수정" />

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
                              상품명
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
                            ) : data.PRDUCT ? (
                              <Card className="form-control">
                                {data.PRDUCT}
                              </Card>
                            ) : (
                              <Card className="form-control">
                                {"해당 정보가 없습니다."}
                              </Card>
                            )}
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
                            {toggle ? (
                              <input
                                name="STTEMNT_NO"
                                type="text"
                                className="form-control"
                                id="STTEMNT_NO"
                                value={copydata.STTEMNT_NO}
                                onChange={onChange}
                              />
                            ) : data.STTEMNT_NO ? (
                              <Card className="form-control">
                                {data.STTEMNT_NO}
                              </Card>
                            ) : (
                              <Card className="form-control">
                                {"해당 정보가 없습니다."}
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
                              제조사명
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
                            ) : data.ENTRPS ? (
                              <Card className="form-control">
                                {data.ENTRPS}
                              </Card>
                            ) : (
                              <Card className="form-control">
                                {"해당 정보가 없습니다."}
                              </Card>
                            )}
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
                            {toggle ? (
                              <input
                                name="REGIST_DT"
                                type="text"
                                className="form-control"
                                id="REGIST_DT"
                                value={copydata.REGIST_DT}
                                onChange={onChange}
                              />
                            ) : data.REGIST_DT ? (
                              <Card className="form-control">
                                {data.REGIST_DT}
                              </Card>
                            ) : (
                              <Card className="form-control">
                                {"해당 정보가 없습니다."}
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
                              사용기간
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
                            ) : data.DISTB_PD ? (
                              <Card className="form-control">
                                {data.DISTB_PD}
                              </Card>
                            ) : (
                              <Card className="form-control">
                                {"해당 정보가 없습니다."}
                              </Card>
                            )}
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
                            {toggle ? (
                              <input
                                name="SRV_USE"
                                type="text"
                                className="form-control"
                                id="SRV_USE"
                                value={copydata.SRV_USE}
                                onChange={onChange}
                              />
                            ) : data.SRV_USE ? (
                              <Card className="form-control">
                                {data.SRV_USE}
                              </Card>
                            ) : (
                              <Card className="form-control">
                                {"해당 정보가 없습니다."}
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
                              성상
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
                            ) : data.SUNGSANG ? (
                              <Card className="form-control">
                                {data.SUNGSANG}
                              </Card>
                            ) : (
                              <Card className="form-control">
                                {"해당 정보가 없습니다."}
                              </Card>
                            )}
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
                            {toggle ? (
                              <input
                                name="PRSRV_PD"
                                type="text"
                                className="form-control"
                                id="PRSRV_PD"
                                value={copydata.PRSRV_PD}
                                onChange={onChange}
                              />
                            ) : data.PRSRV_PD ? (
                              <Card className="form-control">
                                {data.PRSRV_PD}
                              </Card>
                            ) : (
                              <Card className="form-control">
                                {"해당 정보가 없습니다."}
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
                              주의사항
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
                            ) : data.INTAKE_HINT1 ? (
                              <Card className="form-control">
                                {data.INTAKE_HINT1}
                              </Card>
                            ) : (
                              <Card className="form-control">
                                {"해당 정보가 없습니다."}
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
                              상품정보
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
                            ) : data.MAIN_FNCTN ? (
                              <Card className="form-control">
                                {data.MAIN_FNCTN}
                              </Card>
                            ) : (
                              <Card className="form-control">
                                {"해당 정보가 없습니다."}
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
                                  <div className="form-control" id="standard">
                                    {inputItems[index].standard}
                                  </div>
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
                              <Col lg={3}>
                                <StandardSearch
                                  index={index}
                                  value={HighSearch}
                                  propFunction={HighSearch}
                                ></StandardSearch>
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
                                  <Col className="col-auto" lg={6}>
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
                                    <Col xl={11}>
                                      <Row>
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
                                    </Col>
                                    <Col xl={1}>
                                      <Button
                                        color="danger"
                                        onClick={() => {
                                          deleteImage(i);
                                        }}
                                      >
                                        x
                                      </Button>
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

                <div>
                  <HealthFoodFormEditors
                    toggleOnOff={toggle}
                    content={content}
                    file={File}
                    propFunction={HighEditorData}
                    propDeleteFunction={HighDeleteFile}
                  ></HealthFoodFormEditors>
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
