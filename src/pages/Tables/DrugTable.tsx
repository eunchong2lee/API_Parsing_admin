import React from "react";
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "./datatables.scss";

const DatatableTables = () => {
  const columns = [
    {
      dataField: "prdlst_report_ledg_no",
      text: "신고번호",
      sort: true,
    },
    { dataField: "prdlst_nm", text: "제품명", sort: false },
    { dataField: "prms_dt", text: "등록일자", sort: true },
    { dataField: "prdlst_report_no", text: "품목보고번호", sort: true },
    { dataField: "bssh_nm", text: "업소명", sort: false },
    { dataField: "ingredient", text: "성분목록", sort: false },
  ];
  type PublicDataType = {
    prdlst_report_ledg_no: string;
    prdlst_nm: string;
    prms_dt: string;
    prdlst_report_no: string;
    bssh_nm: string;
    ingredient: string[];
  };

  // Table Data
  const productData: PublicDataType[] = require("./../../drug-with-ingredient.json");
  const refinedProductData = productData.map(x => ({
    ...x,
    ingredient: x?.ingredient?.join(", ") || "",
  }));
  const defaultSorted: any = [
    {
      dataField: "prdlst_report_ledg_no",
      order: "desc",
    },
  ];

  const pageOptions: any = {
    sizePerPage: 500,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
  };

  // Select All Button operation
  const selectRow: any = {
    mode: "checkbox",
  };

  // const { SearchBar } = Search;

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="건강기능식품" breadcrumbItem="기본 목록" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="justify-content-between d-flex align-items-center">
                  <h4 className="card-title">
                    건강기능식품 목록 기준 (22.10.12)
                    <br />
                    <br />
                    <span>total: {refinedProductData.length} 개</span>
                  </h4>
                  {/* <Link
                    to="//www.npmjs.com/package/react-super-responsive-table"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-soft-secondary"
                  >
                    Docs <i className="mdi mdi-arrow-right align-middle"></i>
                  </Link> */}
                </CardHeader>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    // columns={columns}
                    // data={productData}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="prdlst_report_ledg_no"
                        columns={columns}
                        data={refinedProductData}
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            {/* <Row className="mb-2">
                              <Col md="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                            </Row> */}

                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    // responsive
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    classes={"table align-middle table-nowrap"}
                                    headerWrapperClasses={"thead-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row className="align-items-md-center mt-30">
                              <Col className="inner-custom-pagination d-flex">
                                <div className="d-inline">
                                  <SizePerPageDropdownStandalone
                                    {...paginationProps}
                                  />
                                </div>
                                <div className="text-md-right ms-auto">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DatatableTables;
