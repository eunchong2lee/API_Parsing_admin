import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Row,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import UserChart from "../AllCharts/apex/UserChart";
import HealthFoodChart from "./HealthFoodChart";

const HealthFood = (props: any) => {
  const [menu1, setMenu1] = useState<boolean>(false);
  const [menu, setMenu] = useState<string>("연도별");

  const MenuClick = (value: React.SetStateAction<string>) => {
    setMenu(value);
  };

  if (!props.data) {
    return null;
  }

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="bg-transparent">
          <div className="d-flex align-items-start">
            <div className="flex-grow-1">
              <h5 className="card-title mb-0">건강식품 정보 통계</h5>
            </div>
            <div className="flex-shrink-0">
              <Dropdown isOpen={menu1} toggle={() => setMenu1(!menu1)}>
                <DropdownToggle tag="a" className="text-reset">
                  <span className="fw-semibold">정렬:</span>{" "}
                  <span className="text-muted">
                    {menu}
                    <i className="mdi mdi-chevron-down ms-1"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <div
                    onClick={() => {
                      MenuClick("연도별");
                    }}
                  >
                    <DropdownItem>연도별</DropdownItem>
                  </div>
                  <div
                    onClick={() => {
                      MenuClick("월별");
                    }}
                  >
                    <DropdownItem>월별</DropdownItem>
                  </div>

                  <div
                    onClick={() => {
                      MenuClick("요일별");
                    }}
                  >
                    <DropdownItem>요일별</DropdownItem>
                  </div>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardHeader>
        <CardBody className="border-bottom py-3">
          <Row className="gx-lg-5">
            <div className="col-md-auto">
              <div>
                <p className="text-muted mb-2">총 등록 건강식품</p>
                <h4 className="mb-0">{props.data.total}</h4>
              </div>
            </div>
            <div className="col-md align-self-end">
              <div className="text-md-end mt-4 mt-md-0">
                <ul className="list-inline main-chart mb-0">
                  <li className="list-inline-item chart-border-left me-0">
                    <h4 className="my-1">
                      {props.data.user}
                      <span className="text-muted d-inline-block fw-normal font-size-13 ms-2">
                        유저 수
                      </span>
                    </h4>
                  </li>{" "}
                </ul>
              </div>
            </div>
          </Row>
        </CardBody>
        <div>
          <div id="chart-area" className="apex-charts" dir="ltr">
            <HealthFoodChart data={props.data} date={menu} />
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default HealthFood;
