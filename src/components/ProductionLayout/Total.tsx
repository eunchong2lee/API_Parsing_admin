import React, { useState } from "react";
import { Button, CardHeader, Col, Container, Row } from "reactstrap";

const Production_Total = () => {
  return (
    <div>
      <Row>
        <Col>
          <CardHeader className="Production-Total">
            <div className="Production-TotalList">
              전체 2건 판매함 2건 판매안함 0건 진열함 2건 진열안함 0건
            </div>
            <div>
              <Button color="primary" className="Production-TotalButton">
                상품 등록
              </Button>
            </div>
          </CardHeader>
        </Col>
      </Row>
    </div>
  );
};

export default Production_Total;
