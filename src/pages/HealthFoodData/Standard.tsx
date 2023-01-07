import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { Row, Col, Card, CardBody, CardHeader, Button } from "reactstrap";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

const StandardComponent = () => {
  ////////////////////////////////////////////////////////////////////////
  // ========== test
  interface InputItem {
    standard: string;
    quantity: string;
  }
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

  ////////////////////////////////////////////////////////////////////////
  return (
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
            <label htmlFor="workexperience-designation-input">성분명</label>
          </Col>
          <Col lg={3}>
            <label htmlFor="workexperience-designation-input">성분량</label>
          </Col>
        </Row>
        {inputItems.map((item, index) => (
          <div key={index}>
            <Row>
              <Col lg={2}>
                <div className="mb-3" key={index}>
                  <input
                    type="text"
                    className="form-control"
                    id="workexperience-designation-input"
                    placeholder="예시) 비타민A,비타민B,비타민C (태그로 구분)"
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3" key={index}>
                  <input
                    type="text"
                    className="form-control"
                    id="workexperience-designation-input"
                    placeholder="예시) 10mg, 20mg, 10ug"
                  />
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </CardBody>
    </div>
  );
};

export default StandardComponent;
