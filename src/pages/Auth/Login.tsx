import MetaTags from "react-meta-tags";
import React, { useState } from "react";

import { Row, Col, Alert, Container } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

//Social Media Imports
import { GoogleLogin } from "react-google-login";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

// actions
import { loginUser, socialLogin } from "../../slices/thunks";
import axios from "axios";

//import images
// import logoDark from "../../assets/images/bodybuddy-original-logo.png";
// import logoLight from "../../assets/images/bodybuddy-original-logo.png";

interface LoginProps {
  history: any;
}

const LoginPage = ({ history }: LoginProps) => {
  const [data, setData] = useState<any>({});

  const onChange = (e: { target: { value: any; name: any } }) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setData({
      ...data, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
    console.log(data);
  };

  const SignIn = async () => {
    console.log(data);
    await axios
      .post(`http://localhost:3000/auth/login`, data)
      .then(response => {
        console.log(response);
      });
  };

  const dispatch = useDispatch();

  const { error } = useSelector((state: any) => ({
    error: state.login.error,
  }));

  // handleValidSubmit
  const handleValidSubmit = (event: any, values: any) => {
    // dispatch(loginUser(values, history));
  };

  const signIn = (res: any, type: any) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, history, type));
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        token: res.accessToken,
      };
      dispatch(socialLogin(postData, history, type));
    }
  };

  //handleGoogleLoginResponse
  const googleResponse = (response: Object) => {
    signIn(response, "google");
  };

  //handleFacebookLoginResponse
  const facebookResponse = (response: Object) => {
    signIn(response, "facebook");
  };

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Bodybuddy - React Admin</title>
      </MetaTags>
      <div className="authentication-bg min-vh-100">
        <div className="bg-overlay bg-white"></div>
        <Container>
          <div className="d-flex flex-column min-vh-100 px-3 pt-4">
            <Row className="justify-content-center my-auto">
              <Col md={8} lg={6} xl={4}>
                <div className="py-5">
                  <div className="mb-4 mb-md-5 text-center">
                    <Link to="/" className="d-block auth-logo">
                      <img
                        // src={logoDark}
                        alt=""
                        height="25"
                        className="auth-logo-dark"
                      />
                      <img
                        // src={logoLight}
                        alt=""
                        height="25"
                        className="auth-logo-light"
                      />
                    </Link>
                  </div>
                  <div className="text-center mb-4"></div>
                  <AvForm
                    onValidSubmit={(e: any, v: any) => {
                      handleValidSubmit(e, v);
                    }}
                  >
                    {error ? <Alert color="danger">{error}</Alert> : null}
                    <div className="form-floating form-floating-custom mb-3">
                      <AvField
                        name="account"
                        label="아이디"
                        className="form-control"
                        placeholder="Enter account"
                        type="text"
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-floating form-floating-custom mb-3">
                      <AvField
                        name="password"
                        label="패스워드"
                        type="password"
                        className="form-control"
                        onChange={onChange}
                        required
                        placeholder="Enter Password"
                      />
                    </div>
                    <div className="form-check form-check-info font-size-16"></div>

                    <div className="mt-3">
                      <button
                        className="btn btn-info w-100"
                        type="submit"
                        onClick={() => {
                          SignIn();
                        }}
                      >
                        Log In
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      {/* <h5 className="font-size-14 mb-3">Sign in with</h5>

                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <FacebookLogin
                            appId="" // Enter Your Facebook AppID
                            autoLoad={false}
                            callback={facebookResponse}
                            render={(renderProps: any) => (
                              <Link
                                to="#"
                                className="social-list-item bg-primary text-white border-primary"
                                onClick={renderProps.onClick}
                              >
                                <i className="mdi mdi-facebook" />
                              </Link>
                            )}
                          />
                        </li>

                        <li className="list-inline-item">
                          <GoogleLogin
                            clientId="" // Enter Your Client ID
                            render={renderProps => (
                              <Link
                                to="#"
                                className="social-list-item bg-danger text-white border-danger"
                                onClick={renderProps.onClick}
                              >
                                <i className="mdi mdi-google" />
                              </Link>
                            )}
                            onSuccess={googleResponse}
                            onFailure={() => {}}
                          />
                        </li>
                      </ul> */}
                    </div>

                    <div className="mt-4 text-right">
                      <Link className="text-muted" to="/forgot-password">
                        <i className="mdi mdi-lock me-1"></i> 아이디 / 비밀번호
                        찾기
                      </Link>
                    </div>
                  </AvForm>

                  <div className="mt-5 text-center text-muted">
                    <p>
                      Don&apos;t have an account ?{" "}
                      <Link
                        to="/register"
                        className="fw-medium text-decoration-underline"
                      >
                        {" "}
                        회원가입{" "}
                      </Link>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xl="12">
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

export default withRouter(LoginPage);
