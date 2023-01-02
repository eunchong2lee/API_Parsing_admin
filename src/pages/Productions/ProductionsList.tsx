import React from "react";
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
  ListGroup,
  ListGroupItem,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import "./datatables.scss";

//Import Production Component
import Production_List from "../../components/ProductionLayout/List";
import Production_Search from "../../components/ProductionLayout/Search";
import Production_Total from "../../components/ProductionLayout/Total";

const ProductionsList = () => {
  // const { SearchBar } = Search;
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="상품" breadcrumbItem="상품 목록" />

          <Production_Total></Production_Total>
          <Production_Search></Production_Search>
          <Production_List></Production_List>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductionsList;
