import React, { useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Row, Col, Alert, Container } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { registerUser } from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// import images
// import logoDark from "../../assets/images/bodybuddy-original-logo.png";
// import logolight from "../../assets/images/bodybuddy-original-logo.png";

const ACCCOUNT_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegisterIndividual = () => {
  const dispatch = useDispatch();

  const { user, registrationError } = useSelector((state: any) => ({
    user: state.register.user,
    registrationError: state.register.registrationError,
    loading: state.register.loading,
  }));

  // handleValidSubmit
  const handleValidSubmit = (values: any) => {
    dispatch(registerUser(values));
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
                        name="username"
                        label="담당자 이름"
                        type="text"
                        required
                        placeholder="담당자 이름 입력"
                      />
                    </div>
                    <div className="form-display">
                      <div className="form-width form-floating form-floating-custom mb-3">
                        <AvField
                          id="businessStatus"
                          name="businessStatus"
                          label="부서"
                          className="form-control"
                          placeholder="부서를 입력해주세요"
                          type="email"
                          required
                        />
                      </div>

                      <div className="form-width form-floating form-floating-custom mb-3">
                        <AvField
                          id="businessType"
                          name="businessType"
                          label="직급"
                          className="form-control"
                          placeholder="직급을 입력해주세요"
                          type="email"
                          required
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
                        type="email"
                        required
                      />
                    </div>
                    <div className="form-floating form-floating-custom mb-3">
                      <AvField
                        name="phone"
                        label="휴대폰번호"
                        type="text"
                        required
                        placeholder="-없이 숫자만 입력"
                      />
                    </div>
                    <div className="form-floating form-floating-custom mb-3">
                      <AvField
                        name="phone"
                        label="아이디"
                        type="text"
                        required
                        placeholder="영어 소문자 및 숫자로만, 4~16자리"
                      />
                    </div>
                    <div className="form-floating form-floating-custom mb-3">
                      <AvField
                        name="password"
                        label="비밀번호"
                        type="password"
                        required
                        placeholder="영어, 숫자, 특수문자 조합 8~16자리"
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
                      <button className="btn btn-info w-100" type="submit">
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
