import React, { useEffect, useState } from "react";
import {
  Col,
  Input,
  Label,
  Row,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
// import "../_user.scss";
import "./_healthItem.scss";
import { indexOf } from "lodash";

const ProductSearchForm = (props: any) => {
  const [toggle, setToggle] = useState(1);

  const onclick = () => {
    if (toggle == 0) {
      props.data.date = `${props.date.firstDate}~${props.date.secondDate}`;
    } else {
      props.data.date = "";
    }
    props.propFunction(props.data);
    props.setSearch();
  };

  const onChangeToggle = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const num = parseInt(value);
    setToggle(num);
  };

  const onChangeSelection = (e: { target: { value: string; name: any } }) => {
    const { value, name } = e.target;

    props.setData(value, name);
  };

  const onChangeDate = (e: { target: { value: string; name: any } }) => {
    const { value, name } = e.target;

    props.ChangeDate(value, name);
  };
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="justify-content-between d-flex align-items-center">
          <h4 className="card-title">상품 검색</h4>
        </CardHeader>
        <CardBody>
          <Row>
            <div>
              <Row>
                <Col xl={6}>
                  {" "}
                  <Row className="mb-3">
                    <Label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      검색분류
                    </Label>
                    <Col md={2}>
                      <Input
                        type="select"
                        className="form-select form-box"
                        name="tab"
                        id="tab"
                        onChange={onChangeSelection}
                      >
                        <option value="제품명">제품명</option>
                        <option value="제품번호">제품번호</option>
                        <option value="제조사">제조사</option>
                      </Input>
                    </Col>
                    <Col md={7}>
                      <Input
                        className="form-control input-box"
                        type="text"
                        value={props.data.name}
                        name="name"
                        id="name"
                        onChange={onChangeSelection}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xl={6}>
                  {" "}
                  <Row className="mb-3">
                    <Col md={4}>
                      <div>
                        <Label
                          htmlFor="example-time-input"
                          className="col-md-3 col-form-label"
                        >
                          사용여부
                        </Label>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className="form-box col-form-label">
                        <Input
                          className="form-box form-check-input"
                          type="radio"
                          name="useYN"
                          id="useYN"
                          value="E"
                          defaultChecked
                          onChange={onChangeSelection}
                        />{" "}
                        <Label
                          className="form-check-label"
                          htmlFor="formRadios1"
                        >
                          전체
                        </Label>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className="form-box col-form-label">
                        <Input
                          className="form-box form-check-input"
                          type="radio"
                          name="useYN"
                          id="useYN"
                          value="Y"
                          onChange={onChangeSelection}
                        />{" "}
                        <Label
                          className="form-check-label"
                          htmlFor="formRadios1"
                        >
                          사용
                        </Label>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className="form-check col-form-label">
                        <Input
                          className="form-check-input"
                          type="radio"
                          name="useYN"
                          id="useYN"
                          value="N"
                          onChange={onChangeSelection}
                        />{" "}
                        <Label
                          className="form-check-label"
                          htmlFor="formRadios2"
                        >
                          미사용
                        </Label>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col xl={6}>
                  {" "}
                  <Row className="mb-3">
                    <Label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      등록날짜
                    </Label>
                    <Col md={2}>
                      <Input
                        type="select"
                        className="form-select form-box"
                        onChange={onChangeToggle}
                      >
                        <option value="1">전체</option>
                        <option value="0">지정</option>
                      </Input>
                    </Col>
                    <Col md={7}>
                      <div>
                        {toggle ? null : (
                          <div>
                            <Row>
                              <Col>
                                <Col>
                                  <input
                                    className="form-control"
                                    type="date"
                                    id="firstDate"
                                    name="firstDate"
                                    value={props.date.firstDate}
                                    onChange={onChangeDate}
                                  />
                                </Col>
                              </Col>

                              <Col className="arrange-layout">
                                <div>~</div>
                              </Col>

                              <Col>
                                <Col>
                                  <input
                                    className="form-control"
                                    type="date"
                                    id="secondDate"
                                    name="secondDate"
                                    value={props.date.secondDate}
                                    onChange={onChangeDate}
                                  />
                                </Col>
                              </Col>
                            </Row>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Row>
        </CardBody>
        <CardFooter>
          <div className="text-center">
            <Button
              className="btn btn-sm btn-primary"
              type="submit"
              color="blue"
              onClick={onclick}
            >
              검색하기 <i className="mdi mdi-arrow-right align-middle"></i>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

export default ProductSearchForm;
