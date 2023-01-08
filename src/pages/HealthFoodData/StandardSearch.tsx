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
  const [Standard, SetStandard] = useState([]);

  // 검색 했을 때
  const [Search, SetSearch] = useState(false);
  const OnOffSearch = () => SetSearch(!Search);

  // 검색 모달
  const [SearchModal, SetSearchModal] = useState(false);
  const Searchtoggle = () => {
    SetSearchModal(!SearchModal);
  };

  // axios
  const GetStandard = async () => {
    console.log("data", data);
    // 실제로 할 때
    // const response: any = await axios.get(
    //   `http://localhost:3000/item/standard?name=${data}`
    // );
    // 예시
    const response: any = await axios.get(
      `http://localhost:3000/item/standard`
    );

    const responsedata = response.data;
    SetStandard(responsedata);
    console.log("standard", Standard);
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
                      ? Standard.map((item, index) => (
                          <ListGroupItem
                            type="select"
                            name={item}
                            id={item}
                            key={index}
                            value={item}
                            action
                            onClick={() => {
                              submitData(item);
                              Searchtoggle();
                            }}
                          >
                            {item}
                          </ListGroupItem>
                        ))
                      : null}
                  </ListGroup>
                </>
              </Row>
            </CardBody>
            <CardFooter>
              <div className="text-center">
                <Button
                  className="btn btn-sm btn-primary"
                  type="submit"
                  color="blue"
                  onClick={() => {
                    GetStandard();
                    OnOffSearch();
                  }}
                >
                  검색하기 <i className="mdi mdi-arrow-right align-middle"></i>
                </Button>
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
          <Button color="secondary" onClick={Searchtoggle}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default StandardSearch;
