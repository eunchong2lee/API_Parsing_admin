import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Row,
  Col,
  Alert,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { registerUser } from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import axios from "axios";

import "../../components/ProductionLayout/_healthItem.scss";

const ACCCOUNT_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const checkaccount = /^[a-z0-9]{4,16}$/;

const regexaccount = (value: string) => {
  return checkaccount.test(value);
};

const RegisterIndividual = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  const [checkmodal, setCheckmodal] = useState(false);
  const Checkmodal = () => setCheckmodal(!checkmodal);

  const { user, registrationError } = useSelector((state: any) => ({
    user: state.register.user,
    registrationError: state.register.registrationError,
    loading: state.register.loading,
  }));

  const [data, setData] = useState<any>({});

  // handleValidSubmit
  const handleValidSubmit = (values: any) => {
    // dispatch(registerUser(values));
  };

  const onChange = (e: { target: { value: any; name: any } }) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setData({
      ...data, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
    console.log(data);
  };

  const checkAccount = async () => {
    console.log("check요청");
    const checkresponse = regexaccount(data.account);
    if (checkresponse == false) {
      setMessage("영소문자 숫자만 사용가능하고 4글자이상 16글자 이하입니다.");
      Checkmodal();
      return;
    }
    await axios
      .post(`http://localhost:3000/auth/checkaccount`, data)
      .then(response => {
        console.log(response.data);
        if (response.data == 200) {
          console.log("사용 가능합니다.");
        } else {
          setMessage("사용 불가능한 아이디입니다.");
          Checkmodal();
        }
      });
  };

  const singUP = async () => {
    console.log("가입요청");
    console.log(data);
    await axios
      .post(`http://localhost:3000/auth/signup`, data)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          window.location.href = `/login`;
        }
      });
  };

  useEffect(() => {
    // dispatch(apiError(""));
  }, [dispatch]);

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | Dashonic - React Admin & Dashboard Template</title>
      </MetaTags>
      <div className="authentication-bg min-vh-100">
        <div className="bg-overlay bg-white"></div>
        <Container>
          <div className="d-flex flex-column min-vh-100 px-3 pt-4">
            <Row className="justify-content-center my-auto">
              <Col md={8} lg={6} xl={4}>
                <div className="py-5">
                  <div className="mb-4 mb-md-5">
                    <Link to="/sales" className="d-block auth-logo text-center">
                      <img
                        // src={logoDark}
                        alt=""
                        height="22"
                        className="auth-logo-dark"
                      />
                      <img
                        // src={logolight}
                        alt=""
                        height="22"
                        className="auth-logo-light"
                      />
                    </Link>
                  </div>
                  <AvForm
                    className="needs-validation custom-form mt-4 pt-2"
                    onValidSubmit={(e: any, v: any) => {
                      handleValidSubmit(v);
                    }}
                  >
                    {user && user ? (
                      <Alert color="success">Register User Successfully</Alert>
                    ) : null}

                    {registrationError && registrationError ? (
                      <Alert color="danger">{registrationError}</Alert>
                    ) : null}

                    <div className="form-floating form-floating-custom mb-3">
                      <AvField
                        name="managerName"
                        label="담당자 이름"
                        type="text"
                        required
                        placeholder="담당자 이름 입력"
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-display">
                      <div className="form-width form-floating form-floating-custom mb-3">
                        <AvField
                          id="dept"
                          name="dept"
                          label="부서"
                          className="form-control"
                          placeholder="부서를 입력해주세요"
                          type="text"
                          required
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-width form-floating form-floating-custom mb-3">
                        <AvField
                          id="position"
                          name="position"
                          label="직급"
                          className="form-control"
                          placeholder="직급을 입력해주세요"
                          type="text"
                          required
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="form-floating form-floating-custom mb-3">
                      <AvField
                        id="email"
                        name="email"
                        label="이메일"
                        className="form-control"
                        placeholder="이메일 주소를 입력해주세요"
                        type="text"
                        required
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-floating form-floating-custom mb-3">
                      <AvField
                        name="phone"
                        label="휴대폰번호"
                        type="text"
                        required
                        placeholder="-없이 숫자만 입력"
                        onChange={onChange}
                      />
                    </div>

                    <div className="form-floating form-floating-custom mb-3">
                      <Row>
                        <Col lg={9}>
                          <AvField
                            name="account"
                            label="아이디"
                            type="text"
                            required
                            placeholder="영어 소문자 및 숫자로만, 4~16자리"
                            onChange={onChange}
                          />
                        </Col>
                        <Col>
                          <div className="check-account">
                            <button
                              className="register-btn-info btn btn-info w-40"
                              type="submit"
                              onClick={() => {
                                checkAccount();
                              }}
                            >
                              체크
                            </button>
                          </div>
                          <Modal isOpen={checkmodal} toggle={Checkmodal}>
                            {/* <Modal isOpen={modal} toggle={toggle} {...args}> */}
                            <ModalHeader toggle={Checkmodal}>에러</ModalHeader>
                            <ModalBody>{message}</ModalBody>
                            <ModalFooter>
                              <Button color="primary" onClick={Checkmodal}>
                                확인
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </Col>
                      </Row>
                    </div>
                    <div className="form-floating form-floating-custom mb-3">
                      <AvField
                        name="password"
                        label="비밀번호"
                        type="password"
                        required
                        placeholder="영어, 숫자, 특수문자 조합 8~16자리"
                        onChange={onChange}
                      />
                    </div>

                    <div className="text-start">
                      <p>
                        By registering you agree to the Dashonic{" "}
                        <Link to="#" className="text-decoration-underline">
                          Terms of Use
                        </Link>
                      </p>
                    </div>

                    <div className="mt-3">
                      <button
                        className="btn btn-info w-100"
                        type="submit"
                        onClick={() => {
                          singUP();
                        }}
                      >
                        Register
                      </button>
                    </div>
                  </AvForm>

                  <div className="mt-5 text-center">
                    <p>
                      이미 바디버디 계정이 있으신가요 ?{" "}
                      <Link
                        to="/login"
                        className="fw-medium text-decoration-underline"
                      >
                        {" "}
                        관리자 로그인하기{" "}
                      </Link>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg="12">
                <div className="text-center text-muted p-4">
                  <p className="mb-0">
                    &copy;{new Date().getFullYear()} Copyright@Bodybuddy
                    Corp.All Rights Reserved.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RegisterIndividual;
