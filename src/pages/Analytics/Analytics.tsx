import React, { useEffect, useState } from "react";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Col, Container, Row } from "reactstrap";

import UserActivity from "./UserActivity";
import HealthFood from "./HealthFood";
import Summary from "./summary";
import axios from "axios";

const Analytics = () => {
  const [data, setData] = useState<any>();

  const getAnalytics = async () => {
    const response = await axios.get(`http://localhost:3000/analytics`);
    const response_data = response.data;
    setData(response_data);
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="통계" breadcrumbItem="건강식품" />

          <Row>
            <Col className="col-xxl-9" lg={8}>
              <HealthFood data={data} />
            </Col>
            <Col className="col-xxl-3" lg={4}>
              <Summary data={data} />
              <UserActivity />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Analytics;
