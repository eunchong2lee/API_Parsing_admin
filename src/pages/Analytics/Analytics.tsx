import React from "react";
import MetaTags from "react-meta-tags";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Col, Container, Row } from "reactstrap";

import UserActivity from "./UserActivity";
import HealthFood from "./HealthFood";
import Summary from "./summary";

const Analytics = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Analytics | Dashonic - React Admin & Dashboard Template</title>
        </MetaTags>

        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="통계" breadcrumbItem="건강식품" />

          <Row>
            <Col className="col-xxl-9" lg={8}>
              <HealthFood />
            </Col>
            <Col className="col-xxl-3" lg={4}>
              <Summary />
              <UserActivity />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Analytics;
