import { render } from "@testing-library/react";
import React, { useState } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Container,
  Button,
  Collapse,
  ListGroupItem,
  ListGroup,
} from "reactstrap";

const Production_Display = () => {
  return (
    <div>
      <ListGroup>
        <ListGroupItem>Cras justo odio</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Morbi leo risus</ListGroupItem>
        <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default Production_Display;
