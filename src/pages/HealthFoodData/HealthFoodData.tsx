import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Container,
  Button,
} from "reactstrap";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
// add component

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import ProductSearchForm from "src/components/ProductionLayout/ProductSearch";
import { useMediaQuery } from "react-responsive";
import Pagination from "@mui/material/Pagination";

axios.defaults.withCredentials = true;

const HealthFoodData = () => {
  // 반응형
  const Desktop = ({
    children,
  }: {
    children: JSX.Element;
  }): JSX.Element | null => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    return isDesktop ? children : null;
  };

  const Tablet = ({
    children,
  }: {
    children: JSX.Element;
  }): JSX.Element | null => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    return isTablet ? children : null;
  };

  const Mobile = ({
    children,
  }: {
    children: JSX.Element;
  }): JSX.Element | null => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };
  const Default = ({
    children,
  }: {
    children: JSX.Element;
  }): JSX.Element | null => {
    const isNotMobile = useMediaQuery({ minWidth: 768 });
    return isNotMobile ? children : null;
  };

  const [data, setData] = useState<any>([]);
  const [searchData, setSearchData] = useState({
    tab: "제품명",
    name: "",
    useYN: "E",
    date: "",
  });
  const [date, setDate] = useState<any>();
  const [pageState, goToPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [searchToggle, setSearchToggle] = useState<boolean>(false);

  // useEffect memory
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    GetLimitData();
    SetDate();

    setLoading(false);
  }, []);

  // base
  const GetLimitData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/item/limit/10/1`);
      const responsedata = response.data.data;
      const responseLength = response.data.dataLength;
      for (let i = 0; i < responsedata.length; i++) {
        responsedata[i].index = i + 1;
      }

      setCount(responseLength);
      setData(responsedata);
    } catch (err) {
      console.log(err);
    }
  };

  //// search function
  const GetLimitSearch = async (lowData: any) => {
    try {
      setLoading(true);
      const tab = lowData.tab;
      let searchTab;
      if (tab === "제품명") {
        searchTab = "PRDUCT";
      } else if (tab === "제품번호") {
        searchTab = "STTEMNT_NO";
      } else if (tab === "제조사") {
        searchTab = "ENTRPS";
      }
      const name = lowData.name;

      const useYN = lowData.useYN;
      const date = lowData.date;

      console.log(searchTab, name, date, useYN);

      const response = await axios.get(
        `http://localhost:3000/search?tab=${searchTab}&name=${name}&date=${date}&useYN=${useYN}&page=1&limit=10`
      );
      const responsedata = response.data.data;
      for (let i = 0; i < responsedata.length; i++) {
        responsedata[i].index = i + 1;
      }

      setData(responsedata);
      setCount(response.data.dataLength);
      goToPage(1);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // on Change page
  const pageChange = async (event: any, page: number) => {
    try {
      setLoading(true);

      const response = await axios
        .get(`http://localhost:3000/item/limit/10/${page}`)
        .then(response => {
          const responseData = response.data.data;
          for (let i = 0; i < responseData.length; i++) {
            responseData[i].index = i + 1 + (page - 1) * 10;
          }

          setData(responseData);
          goToPage(page);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // on Change Search page
  const searchPageChange = async (event: any, page: number) => {
    try {
      setLoading(true);

      const tab = searchData.tab;
      let searchTab;
      if (tab === "제품명") {
        searchTab = "PRDUCT";
      } else if (tab === "제품번호") {
        searchTab = "STTEMNT_NO";
      } else if (tab === "제조사") {
        searchTab = "ENTRPS";
      }

      const response = await axios.get(
        `http://localhost:3000/search?tab=${searchTab}&name=${searchData.name}&date=${searchData.date}&useYN=${searchData.useYN}&page=${page}&limit=10`
      );
      const responseData = response.data.data;
      for (let i = 0; i < responseData.length; i++) {
        responseData[i].index = i + 1 + (page - 1) * 10;
      }

      setData(responseData);
      setCount(response.data.dataLength);
      goToPage(page);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // 시간 적용
  const SetDate = async () => {
    const curr = new Date();

    // UTC 시간 계산
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

    // 3. UTC to KST (UTC + 9시간)
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);
    const year = kr_curr.getFullYear();

    const month = kr_curr.getMonth() + 1;
    let current_month: string = `${month}`;
    if (month < 10) {
      current_month = `0` + month;
    }
    const date = kr_curr.getDate();
    let current_date: string = `${date}`;
    if (date < 10) {
      current_date = `0` + date;
    }

    const str = year + "-" + current_month + "-" + current_date;

    setDate({ firstDate: str, secondDate: str });
  };

  // Search Components
  const HighSearch = async (low_data: any) => {
    try {
      setLoading(true);
      GetLimitSearch(low_data);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const HighSetSearch = async () => {
    try {
      setLoading(true);
      setSearchToggle(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const HighSetSearchData = async (value: any, name: any) => {
    try {
      setSearchData({
        ...searchData,
        [name]: value,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const HighSetDate = async (value: any, name: any) => {
    setDate({
      ...date,
      [name]: value,
    });
  };

  const GetFile = async () => {
    try {
      const tab = searchData.tab;
      let searchTab;
      if (tab === "제품명") {
        searchTab = "PRDUCT";
      } else if (tab === "제품번호") {
        searchTab = "STTEMNT_NO";
      } else if (tab === "제조사") {
        searchTab = "ENTRPS";
      }
      window.open(
        `http://localhost:3000/item/file?tab=${searchTab}&name=${searchData.name}&date=${searchData.date}&useYN=${searchData.useYN}`,
        "_blank"
      );
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      text: "id",
      dataField: "_id",
      sort: true,
      formatter: (cellContent: any, data: any, index: any) => (
        <React.Fragment>
          <Link
            to={`HealthFoodDataRevise/${data._id}`}
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
    totalSize: count, // replace later with size(customers),
    custom: true,
  };

  const { SearchBar } = Search;

  if (loading || !data.length) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="건강식품" breadcrumbItem="건강식품 목록" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardHeader className="justify-content-between d-flex align-items-center">
                  <h4 className="card-title">건강식품 목록</h4>
                </CardHeader>
                <CardBody>
                  <Container fluid>
                    {/* Render Breadcrumbs */}

                    <Row>
                      <Col xs={12}>
                        {/* import TextualInputs */}
                        <ProductSearchForm
                          propFunction={HighSearch}
                          setSearch={HighSetSearch}
                          setData={HighSetSearchData}
                          ChangeDate={HighSetDate}
                          date={date}
                          data={searchData}
                        />
                      </Col>
                    </Row>
                  </Container>
                </CardBody>

                <CardBody>
                  <Row>
                    <Col xs={11}></Col>
                    <Col>
                      <Button
                        color="primary"
                        onClick={() => {
                          GetFile();
                        }}
                      >
                        file
                      </Button>
                    </Col>
                  </Row>

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
                            <Row>
                              <Col className="inner-custom-pagination d-flex">
                                <div className="text-md-right ms-auto">
                                  <Pagination
                                    count={Math.ceil(count / 10)}
                                    color="primary"
                                    page={pageState}
                                    onChange={
                                      searchToggle
                                        ? searchPageChange
                                        : pageChange
                                    }
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
