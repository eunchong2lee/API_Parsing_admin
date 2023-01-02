import React, { useState } from "react";
import { render } from "react-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
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
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CardProject from "../Projects/ProjectGrid/card-project";

//Import Production Component
import Production_Display from "src/components/ProductionLayout/Display";
import Production_BasicInformation from "src/components/ProductionLayout/BasicInformation";
import Production_SellInformation from "src/components/ProductionLayout/SellInformation";

const ProductionsRegist = () => {
  // const { SearchBar } = Search;
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="상품" breadcrumbItem="상품 등록" />
        </div>
      </div>
      <div className="Production-Display">
        <Production_Display></Production_Display>
      </div>
      <div className="Production-BasicInformation">
        <Production_BasicInformation></Production_BasicInformation>
      </div>
      <div className="Production-SellInformation">
        <Production_SellInformation></Production_SellInformation>
      </div>
    </React.Fragment>
  );
};

export default ProductionsRegist;
