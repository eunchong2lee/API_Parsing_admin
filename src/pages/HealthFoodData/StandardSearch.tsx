import { SetStateAction, useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  InputGroup,
  Form,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ListGroup,
  ListGroupItem,
  Pagination,
  PaginationLink,
  PaginationItem,
} from "reactstrap";
import axios from "axios";

const StandardSearch = (props: any) => {
  // 검색 값
  const [data, setData] = useState("");

  const onChangeValue = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setData(value);
  };

  // 성분 받아오기 get으로
  const [Standard, SetStandard] = useState<any[]>([]);

  // 검색 했을 때
  const [Search, SetSearch] = useState(false);
  const OnOffSearch = () => SetSearch(!Search);

  // 검색 모달
  const [SearchModal, SetSearchModal] = useState(false);
  const Searchtoggle = () => {
    SetSearchModal(!SearchModal);
  };

  // pageOptions
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number[]>([]);
  const [endPage, setEndPage] = useState<number>(0);

  const handlePageChange = (value: string) => {
    if (value === "first") {
      setPage(1);
      setPageList(1);
    } else if (value === "previous") {
      setPage(page - 1);
      setPageList(page - 1);
    } else if (value === "next") {
      setPage(page + 1);
      setPageList(page + 1);
    } else if (value === "last") {
      setPage(endPage);
      setPageList(endPage);
    } else {
      setPage(Number(value));
      setPageList(Number(value));
    }
  };

  const setPageList = (value: number) => {
    if (endPage < 5) {
      const new_pageCount = [];
      for (let i = 1; i <= endPage; i++) {
        new_pageCount.push(i);
      }
      setPageCount(new_pageCount);
    } else if (endPage === 5) {
      setPageCount([1, 2, 3, 4, 5]);
    } else if (3 < value && value < endPage - 2) {
      setPageCount([value - 2, value - 1, value, value + 1, value + 2]);
    } else if (value >= endPage - 2) {
      setPageCount([
        endPage - 4,
        endPage - 3,
        endPage - 2,
        endPage - 1,
        endPage,
      ]);
    } else if (value <= 3) {
      setPageCount([1, 2, 3, 4, 5]);
    }
  };

  // axios
  const GetStandard = async () => {
    const response: any = await axios.get(
      `http://localhost:3000/standard?name=${data}`
    );
    console.log(response.data);

    const responsedata = response.data;
    SetStandard(responsedata);
    const pageCounts = [];
    if (responsedata.length / 10 + 1 > 5) {
      for (let i = 1; i <= 5; i++) {
        pageCounts.push(i);
      }
    } else {
      for (let i = 1; i <= responsedata.length / 10 + 1; i++) {
        pageCounts.push(i);
      }
    }
    setEndPage(Math.floor(responsedata.length / 10 + 1));
    setPageCount(pageCounts);
  };

  /// 상위 컴포넌트로 전달

  const submitData = (low_data: any) => {
    const send_data = { low_data, index: props.index };
    setData("");
    SetStandard([]);
    props.propFunction(send_data);
  };

  return (
    <div>
      <Button color="primary" outline size="" onClick={Searchtoggle}>
        검색
      </Button>
      <Modal isOpen={SearchModal} toggle={Searchtoggle}>
        <ModalHeader toggle={Searchtoggle}>상품을 수정하겠습니까?</ModalHeader>
        <ModalBody>
          <Card>
            <CardHeader className="justify-content-between d-flex align-items-center">
              <h3 className="card-title">성분 검색</h3>
            </CardHeader>

            <CardBody>
              <Row>
                <div>
                  <Row>
                    <Col>
                      {" "}
                      <Row className="mb-3">
                        <Label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          성분명
                        </Label>

                        <Col md={10}>
                          <Input
                            className="form-control input-box"
                            type="text"
                            name="search"
                            id="search"
                            value={data}
                            onChange={onChangeValue}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Row>

              <Row>
                <>
                  <ListGroup>
                    {Search
                      ? Standard.map((item, index) => {
                          if ((page - 1) * 10 <= index && index < page * 10) {
                            return (
                              <ListGroupItem
                                type="select"
                                name={item.name}
                                id={item.name}
                                key={index}
                                value={item.name}
                                action
                                onClick={() => {
                                  submitData(item.name);
                                  Searchtoggle();
                                }}
                              >
                                {item.name}
                              </ListGroupItem>
                            );
                          }
                        })
                      : null}
                  </ListGroup>
                </>
              </Row>
            </CardBody>
            <CardFooter>
              <div>
                <Row>
                  <Col>
                    <Button
                      className="btn btn-sm btn-primary"
                      type="submit"
                      color="blue"
                      onClick={() => {
                        GetStandard();
                        if (!Search) {
                          OnOffSearch();
                        }
                      }}
                    >
                      검색하기{" "}
                      <i className="mdi mdi-arrow-right align-middle"></i>
                    </Button>
                  </Col>
                  <Col>
                    {Standard.length ? (
                      <Pagination>
                        {page === 1 ? null : (
                          <>
                            {" "}
                            <PaginationItem
                              onClick={() => {
                                handlePageChange("first");
                              }}
                            >
                              <PaginationLink first />
                            </PaginationItem>
                            <PaginationItem
                              onClick={() => {
                                handlePageChange("previous");
                              }}
                            >
                              <PaginationLink previous />
                            </PaginationItem>
                          </>
                        )}

                        {pageCount.map((item, index) => (
                          <PaginationItem
                            key={index}
                            active={item === page ? true : false}
                            onClick={() => {
                              handlePageChange(item.toString());
                            }}
                          >
                            <PaginationLink href="#">{item}</PaginationLink>
                          </PaginationItem>
                        ))}
                        {page === endPage ? null : (
                          <>
                            <PaginationItem
                              onClick={() => {
                                handlePageChange("next");
                              }}
                            >
                              <PaginationLink href="#" next />
                            </PaginationItem>
                            <PaginationItem
                              onClick={() => {
                                handlePageChange("last");
                              }}
                            >
                              <PaginationLink href="#" last />
                            </PaginationItem>
                          </>
                        )}
                      </Pagination>
                    ) : null}
                  </Col>
                </Row>
              </div>
            </CardFooter>
          </Card>
        </ModalBody>
        <ModalFooter>
          {/* <Button
            color="primary"
            type="button"
            onClick={() => {
              Searchtoggle();
            }}
          >
            등록
          </Button>{" "} */}
          <Button
            color="secondary"
            onClick={() => {
              Searchtoggle();
              setData("");
              SetStandard([]);
            }}
          >
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default StandardSearch;
