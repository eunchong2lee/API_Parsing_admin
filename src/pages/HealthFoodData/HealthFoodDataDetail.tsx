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
  Pagination,
  PaginationLink,
  PaginationItem,
  InputGroup,
  ButtonDropdown,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Input,
  UncontrolledDropdown,
  FormGroup,
  Label,
  FormText,
  Form,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { render } from "@testing-library/react";
// import "./datatables.scss";

//Import HealthFoodData Component
// import Production_List from "../../components/ProductionLayout/List";
// import Production_Search from "../../components/ProductionLayout/Search";
// import Production_Total from "../../components/ProductionLayout/Total";

const HealthFoodDataDetail = () => {
  // const { SearchBar } = Search;
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="건강식품 관리" breadcrumbItem="건강식품" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <CardHeader>
                      <Row>
                        <Col>부품이름</Col>
                        <Col>
                          <div>
                            <Button color="primary">수정</Button>{" "}
                          </div>
                        </Col>
                      </Row>
                    </CardHeader>
                  </Row>
                  <Row>
                    <Col>
                      <br />
                      <CardTitle>사진</CardTitle>
                      <br />
                      <div> PRMS_IMG</div>
                      <div>
                        <img alt="Card" src="https://picsum.photos/300/200" />
                      </div>
                    </Col>
                    <Col>
                      <br />
                      <div>수정시</div>
                      <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <br />
                        <Input type="file" name="file" id="exampleFile" />
                        {/* <FormText color="muted">123</FormText> */}
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <div>내용</div>
                  <Row>
                    <ListGroup>
                      <ListGroupItem>
                        <CardTitle>STTEMNT_NO</CardTitle>
                        <CardBody>등록번호 : 201600065981</CardBody>
                      </ListGroupItem>
                      <ListGroupItem>
                        <CardTitle> ENTRPS</CardTitle>
                        <CardBody>제조회사 : 토음바이오 주식회사</CardBody>
                      </ListGroupItem>
                      <ListGroupItem>
                        <CardTitle> PRDUCT</CardTitle>
                        <CardBody>제품명 : 6년근고려홍삼황제정스틱</CardBody>
                      </ListGroupItem>
                      <ListGroupItem>
                        <CardTitle> REGIST_DT</CardTitle>
                        <CardBody>등록 날짜 : 20160704</CardBody>
                      </ListGroupItem>
                      <ListGroupItem>
                        <CardTitle> DISTB_PD</CardTitle>
                        <CardBody>기간 : 제조일로부터 24개월</CardBody>
                      </ListGroupItem>
                      <ListGroupItem>
                        <CardTitle> SUNGSANG</CardTitle>
                        <CardBody>
                          성상 : 이미, 이취가 없고 고유의 향미가 있는 흑갈색의
                          액상
                        </CardBody>
                      </ListGroupItem>
                      <ListGroupItem>
                        <CardTitle> SRV_USE</CardTitle>
                        <CardBody>
                          복용시 : 1일 1회, 1회 1포(15ml)를 섭취하십시오.{" "}
                        </CardBody>
                      </ListGroupItem>
                      <ListGroupItem>
                        <CardTitle> PRSRV_PD</CardTitle>
                        <CardBody>
                          보관시 : 직사광선을 피하고 서늘한 곳 보관
                        </CardBody>
                      </ListGroupItem>
                      <ListGroupItem>
                        <CardTitle> INTAKE_HINT1</CardTitle>
                        <CardBody>
                          주의사항 : 의약품(당뇨치료제, 혈액항응고제) 복용 시
                          섭취에 주의
                        </CardBody>
                      </ListGroupItem>
                      <ListGroupItem>
                        <CardTitle> MAIN_FNCTN</CardTitle>
                        <CardBody>
                          성능 : ①면역력 증진에 도움을 줄 수 있음②피로개선에
                          도움을 줄 수 있음③혈소판 응집 억제를 통한 혈액흐름에
                          도움을 줄 수 있음④기억력 개선에 도움을 줄 수
                          있음⑤항산화에 도움을 줄 수 있음
                        </CardBody>
                      </ListGroupItem>
                      <ListGroupItem>
                        <CardTitle> PRMS_STANDARD</CardTitle>
                        <CardBody>
                          <Table>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>성분 이름</th>
                                <th>성분량</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">1</th>
                                <td>아연</td>
                                <td>10mg</td>
                              </tr>
                              <tr>
                                <th scope="row">2</th>
                                <td>철</td>
                                <td>20mg</td>
                              </tr>
                              <tr>
                                <th scope="row">3</th>
                                <td>진세노사이드</td>
                                <td>30mg</td>
                              </tr>
                            </tbody>
                          </Table>
                        </CardBody>
                      </ListGroupItem>
                    </ListGroup>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HealthFoodDataDetail;
