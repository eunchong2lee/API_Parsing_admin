import React, { useState } from "react";

import {
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import ApexBar from "../AllCharts/apex/apexbar";

const UserActivity = () => {
  const [menu, setMenu] = useState<boolean>(false);
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="d-flex align-items-start">
            <div className="flex-grow-1 overflow-hidden">
              <h5 className="card-title text-truncate mb-4">유저 활동</h5>
            </div>
          </div>

          <div>
            <div id="chart-column" className="apex-charts" dir="ltr">
              <ApexBar />
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default UserActivity;
