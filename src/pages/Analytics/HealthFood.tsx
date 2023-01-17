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

const HealthFood = () => {
  const [menu1, setMenu1] = useState<boolean>(false);
  const [menu, setMenu] = useState<string>("연도별");

  const MenuClick = (value: React.SetStateAction<string>) => {
    setMenu(value);
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="bg-transparent">
          <div className="d-flex align-items-start">
            <div className="flex-grow-1">
              <h5 className="card-title mb-0">Daily Active Users</h5>
            </div>
            <div className="flex-shrink-0">
              <Dropdown isOpen={menu1} toggle={() => setMenu1(!menu1)}>
                <DropdownToggle tag="a" className="text-reset">
                  <span className="fw-semibold">Sort By:</span>{" "}
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
                      MenuClick("주별");
                    }}
                  >
                    <DropdownItem>주별</DropdownItem>
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
                <h4 className="mb-0">
                  18.2 k{" "}
                  <span className="text-muted font-size-12 fw-normal ms-2">
                    1.4 %{" "}
                    <i className="uil uil-arrow-up-right text-success ms-1"></i>
                  </span>
                </h4>
              </div>
            </div>
            <div className="col-md align-self-end">
              <div className="text-md-end mt-4 mt-md-0">
                <ul className="list-inline main-chart mb-0">
                  <li className="list-inline-item chart-border-left me-0 border-0">
                    <h4 className="text-primary my-1">
                      3.85 k
                      <span className="text-muted d-inline-block fw-normal font-size-13 ms-2">
                        Sessions
                      </span>
                    </h4>
                  </li>{" "}
                  <li className="list-inline-item chart-border-left me-0">
                    <h4 className="my-1">
                      24.03 %
                      <span className="text-muted d-inline-block fw-normal font-size-13 ms-2">
                        Bounce Rate
                      </span>
                    </h4>
                  </li>{" "}
                  <li className="list-inline-item chart-border-left me-0">
                    <h4 className="my-1">
                      52 k
                      <span className="text-muted d-inline-block fw-normal font-size-13 ms-2">
                        Users
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
            <HealthFoodChart date={menu} />
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default HealthFood;
