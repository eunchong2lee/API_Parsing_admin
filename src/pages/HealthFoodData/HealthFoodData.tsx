import React, { useEffect, useState } from "react";
import axios from "axios";

import { Row, Col, Card, CardBody, CardHeader, Container } from "reactstrap";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";

// add component

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import ProductSearchForm from "src/components/ProductionLayout/ProductSearch";

axios.defaults.withCredentials = true;

const HealthFoodData = () => {
  const [data, setData] = useState([]);

  // useEffect memory
  const [loading, setLoading] = useState(false);

  //// search function
  const GetLimitSearch = async (low_data: any) => {
    try {
      const tab = low_data.tab;
      let searchTab;
      if (tab === "제품명") {
        searchTab = "PRDUCT";
      } else if (tab === "제품번호") {
        searchTab = "STTEMNT_NO";
      } else if (tab === "제조사") {
        searchTab = "ENTRPS";
      }
      const name = low_data.name;

      const useYN = low_data.useYN;
      const date = low_data.date;

      const response = await axios.get(
        `http://localhost:3000/search?tab=${searchTab}&name=${name}&date=${date}&useYN=${useYN}&limit=10`
      );
      const responsedata = response.data;
      for (let i = 0; i < responsedata.length; i++) {
        responsedata[i].index = i + 1;
      }
      setData(responsedata);
    } catch (err) {
      console.log(err);
    }
  };

  const GetAllSearch = async (low_data: any) => {
    const tab = low_data.tab;
    let searchTab;
    if (tab === "제품명") {
      searchTab = "PRDUCT";
    } else if (tab === "제품번호") {
      searchTab = "STTEMNT_NO";
    } else if (tab === "제조사") {
      searchTab = "ENTRPS";
    }
    const name = low_data.name;

    const useYN = low_data.useYN;
    const date = low_data.date;

    const response = await axios.get(
      `http://localhost:3000/search?tab=${searchTab}&name=${name}&date=${date}&useYN=${useYN}`
    );
    const responsedata = response.data;
    for (let i = 0; i < responsedata.length; i++) {
      responsedata[i].index = i + 1;
    }
    setData(responsedata);
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const HighSearch = async (low_data: any) => {
    try {
      setLoading(true);
      console.log(low_data);
      GetLimitSearch(low_data);
      GetAllSearch(low_data);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // get data
  const GetAllData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/item`);
      const responsedata = response.data;
      for (let i = 0; i < responsedata.length; i++) {
        responsedata[i].index = i + 1;
      }
      setData(responsedata);
    } catch (err) {
      console.log(err);
    }
  };
  const GetLimitData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/item/limit/10/1`);
      const responsedata = response.data;
      for (let i = 0; i < responsedata.length; i++) {
        responsedata[i].index = i + 1;
      }
      setData(responsedata);
      console.log("limitdata", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);

    GetLimitData();
    GetAllData();

    return () => {
      setLoading(false);
    };
  }, []);

  const columns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      formatter: (cellContent: any, data: any, index: any) => (
        <React.Fragment>
          <Link
            to={`HealthFoodDataRevise/${data.id}`}
            className="text-body fw-medium"
          >
            {data.index}
          </Link>
        </React.Fragment>
      ),
    },
    {
      text: "제품명",
      dataField: "PRDUCT",
      sort: true,
      formatter: (cellContent: any, data: any) => (
        <React.Fragment>
          <Link
            to={`HealthFoodDataRevise/${data._id}`}
            className="text-body fw-medium"
          >
            {data.PRDUCT}
          </Link>
        </React.Fragment>
      ),
    },
    {
      text: "제품번호",
      dataField: "STTENMNT_NO",
      sort: true,
      formatter: (cellContent: any, data: any) => (
        <React.Fragment>
          <Link
            to={`HealthFoodDataRevise/${data._id}`}
            className="text-body fw-medium"
          >
            {data.STTEMNT_NO}
          </Link>
        </React.Fragment>
      ),
    },
    {
      text: "제조회사명",
      dataField: "ENTRPS",
      sort: true,
      formatter: (cellContent: any, data: any) => (
        <React.Fragment>
          <Link
            to={`HealthFoodDataRevise/${data._id}`}
            className="text-body fw-medium"
          >
            {data.ENTRPS}
          </Link>
        </React.Fragment>
      ),
    },
    {
      text: "등록번호",
      dataField: "REGIST_DT",
      sort: true,
      formatter: (cellContent: any, data: any) => (
        <React.Fragment>
          <Link
            to={`HealthFoodDataRevise/${data._id}`}
            className="text-body fw-medium"
          >
            {data.REGIST_DT}
          </Link>
        </React.Fragment>
      ),
    },
  ];

  const defaultSorted: any = [
    {
      dataField: "_id",
      order: "asc",
    },
  ];

  const pageOptions: any = {
    sizePerPage: 10,
    totalSize: data.length, // replace later with size(customers),
    custom: true,
  };

  const { SearchBar } = Search;

  if (!data) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Advance Tables | Dashonic - React Admin & Dashboard Template
          </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="Tables" breadcrumbItem="Advance Tables" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="justify-content-between d-flex align-items-center">
                  <h4 className="card-title">건강식품 목록</h4>
                  <Link
                    to="//www.npmjs.com/package/react-super-responsive-table"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-soft-secondary"
                  >
                    Docs <i className="mdi mdi-arrow-right align-middle"></i>
                  </Link>
                </CardHeader>
                <CardBody>
                  <Container fluid>
                    {/* Render Breadcrumbs */}

                    <Row>
                      <Col xs={12}>
                        {/* import TextualInputs */}
                        <ProductSearchForm propFunction={HighSearch} />
                      </Col>
                    </Row>
                  </Container>
                </CardBody>

                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    // columns={columns}
                    // data={productData}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="_id"
                        columns={columns}
                        data={data}
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

export default HealthFoodData;

{
  /* <div className="container-fluid">
<Breadcrumbs title="건강식품" breadcrumbItem="건강식품 관리" />
</div> */
}
