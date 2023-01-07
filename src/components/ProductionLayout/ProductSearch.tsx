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
  const [data, setData] = useState({
    tab: "제품명",
    name: "",
    useYN: "E",
    date: "",
  });

  const SetDate = () => {
    const curr = new Date();

    // UTC 시간 계산
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

    // 3. UTC to KST (UTC + 9시간)
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);
    const year = kr_curr.getFullYear();

    const month = kr_curr.getMonth() + 1;
    let current_month: string = `${month}`;
    if (month < 10) {
      current_month = `0` + month;
    }
    const date = kr_curr.getDate();
    let current_date: string = `${date}`;
    if (date < 10) {
      current_date = `0` + date;
    }

    const str = year + "-" + current_month + "-" + current_date;

    return { firstDate: str, secondDate: str };
  };

  const [date, setDate] = useState(SetDate());
  const [toggle, setToggle] = useState(1);

  const onclick = () => {
    if (toggle == 0) {
      data.date = `${date.firstDate}~${date.secondDate}`;
    } else {
      data.date = "";
    }
    submitText(data);
  };

  const submitText = (low_data: any) => {
    props.propFunction(low_data);
  };

  const onChangeToggle = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const num = parseInt(value);
    setToggle(num);
  };

  const onChangeSelection = (e: { target: { value: string; name: any } }) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onChangeDate = (e: { target: { value: string; name: any } }) => {
    const { value, name } = e.target;
    setDate({
      ...date,
      [name]: value,
    });
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
                        value={data.name}
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
                                    value={date.firstDate}
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
                                    value={date.secondDate}
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
