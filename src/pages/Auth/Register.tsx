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

//
const emailRegex =
  /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

const RegisterIndividual = () => {
  // password , account 유효성 검사

  //// data 검사
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //// 에러시 메세지
  const [accountMessage, setAccountMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");

  //// 유효성 검사
  const [isAccount, setIsAccount] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  //// modal 창
  const [modalMessage, setModalMessage] = useState<string[]>(["", ""]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const Istoggle = () => setIsModal(!isModal);

  // Register Modal
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const IsRegisterToggle = () => setRegisterModal(!registerModal);

  //// onChange 함수
  const onChangeAccount = (e: { target: { value: any; name: any } }) => {
    const { name, value } = e.target;
    const accountRegex = /^[a-z0-9]{4,16}$/;
    const accountCurrent = e.target.value;
    setAccount(accountCurrent);
    setData({
      ...data, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });

    if (!accountRegex.test(accountCurrent)) {
      setAccountMessage("아이디 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ");
      setIsAccount(false);
    } else {
      setAccountMessage(
        "올바른 아이디 형식이에요 : ) 중복 아이디를 확인해주세요!"
      );
      setIsAccount(true);
    }
  };

  const onChangePassword = (e: { target: { value: any; name: any } }) => {
    const { name, value } = e.target;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
    setData({
      ...data, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  };

  const dispatch = useDispatch();

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
  };

  const checkAccount = async () => {
    await axios
      .post(`http://localhost:3000/auth/checkaccount`, data)
      .then(response => {
        if (response.data == 200) {
          setAccountMessage("사용 가능한 아이디 형식이에요 : )");
        } else {
          setAccountMessage("이미 사용중인 아이디입니다.");
        }
      });
  };

  const singUP = async () => {
    if (isAccount && isPassword) {
      await axios
        .post(`http://localhost:3000/auth/signup`, data)
        .then(response => {
          setModalMessage(["성공", "회원가입에 성공했습니다."]);
          Istoggle();
          // if (response.status === 200) {
          //   window.location.href = `/login`;
          // }
        });
    } else {
      setModalMessage(["실패", "아이디 또는 비밀번호를 확인하세요"]);
      Istoggle();
    }
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
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-floating form-floating-custom mb-3">
                      <AvField
                        name="phone"
                        label="휴대폰번호"
                        type="text"
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
                            placeholder="영어 소문자 및 숫자로만, 4~16자리"
                            onChange={onChangeAccount}
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
                        </Col>
                      </Row>
                      <div>
                        {isAccount ? (
                          <div>{accountMessage}</div>
                        ) : (
                          <div>{accountMessage}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-floating form-floating-custom mb-3">
                      <AvField
                        name="password"
                        label="비밀번호"
                        type="password"
                        placeholder="영어, 숫자, 특수문자 조합 8~16자리"
                        onChange={onChangePassword}
                      />
                      <div>
                        {isPassword ? (
                          <div>{passwordMessage}</div>
                        ) : (
                          <div>{passwordMessage}</div>
                        )}
                      </div>
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
                          IsRegisterToggle();
                        }}
                      >
                        Register
                      </button>
                    </div>
                    {isModal ? (
                      <Modal isOpen={isModal} toggle={Istoggle}>
                        {/* <Modal isOpen={modal} toggle={toggle} {...args}> */}
                        <ModalHeader toggle={Istoggle}>
                          {modalMessage[0]}
                        </ModalHeader>
                        <ModalBody>{modalMessage[1]}</ModalBody>
                        <ModalFooter>
                          <Button
                            color="primary"
                            type="button"
                            onClick={() => {
                              Istoggle();
                              if (isAccount && isPassword) {
                                window.location.href = `/login`;
                              }
                            }}
                          >
                            확인
                          </Button>{" "}
                        </ModalFooter>
                      </Modal>
                    ) : null}
                    {registerModal ? (
                      <Modal isOpen={registerModal} toggle={IsRegisterToggle}>
                        {/* <Modal isOpen={modal} toggle={toggle} {...args}> */}
                        <ModalHeader toggle={IsRegisterToggle}>
                          회원가입
                        </ModalHeader>
                        <ModalBody>회원가입하겠습니까?</ModalBody>
                        <ModalFooter>
                          <Button
                            color="primary"
                            type="button"
                            onClick={() => {
                              IsRegisterToggle();
                              singUP();
                            }}
                          >
                            네
                          </Button>{" "}
                          <Button
                            color="danger"
                            type="button"
                            onClick={() => {
                              IsRegisterToggle();
                            }}
                          >
                            아니오
                          </Button>
                        </ModalFooter>
                      </Modal>
                    ) : null}
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
