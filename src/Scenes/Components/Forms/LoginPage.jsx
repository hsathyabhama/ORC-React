import React, { Component } from "react";
import { Col, Row, Input, Button, Form, Alert } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import axios from "axios";
import { connect } from "react-redux";
import { updateAppState, updateUserName } from "../../../redux/actions";
import { CompanyDetails, FormDetails } from "../../Services/constant";
import Cookies from "universal-cookie";
const { enter_email, enter_password, alert_msg_login } = FormDetails;
const { company_name, company_data } = CompanyDetails;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsLogin: false,
      loginState: false,
    };
  }

  //error alert close fn
  alertOnClose = () => {
    this.setState({
      IsLogin: "",
      loginState: "",
    });
  };

  //Form onfinish fn
  loginOnFinish = (values) => {
    let that = this;
    axios
      .post("http://localhost:5000/login_validation.php", values)
      .then((res) => {
        let data = res.data;

        if (data[0] == "success") {
          that.props.updateAppState("main");
          console.log(data[1]);
          that.props.updateUserName(data[1]);
        } else if (data == "failed") {
          this.state.IsLogin = true;
        }
      })
      .catch((err) => {
        console.log(err.res);
      });
  };

  //onclick signup event
  signupEvent = () => {
    this.props.updateAppState("signup");
  };

  //onclick forgot password event
  forgotPasswordEvent = () => {
    this.props.updateAppState("forgotPassword");
  };

  render() {
    const appData = this.props.app;
    console.log(appData);
    return (
      <div className="background">
        <div className="container">
          <div className="wrapper">
            <div className="form-holder">
              <Row>
                {/* <!-- Logo & Information Panel--> */}
                <Col span={12}>
                  <div className="info" style={{ paddingTop: "5rem" }}>
                    <h1 style={{ color: "white" }}>{company_name}</h1>
                    <p>{company_data}</p>
                  </div>
                </Col>
                {/* <!-- Form Panel    --> */}
                <Col span={12}>
                  <div className="content" style={{ paddingTop: "5rem" }}>
                    <Form
                      name="normal_login"
                      className="login-form"
                      initialValues={{ remember: true }}
                      onFinish={this.loginOnFinish}
                    >
                      <Form.Item
                        name="user_name"
                        rules={[{ required: true, message: enter_email }]}
                      >
                        <Input
                          style={{ backgroundColor: "transparent" }}
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="Email_ID"
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: enter_password }]}
                      >
                        <Input.Password
                          style={{ backgroundColor: "transparent" }}
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          type="password"
                          placeholder="Password"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </Form.Item>
                      {this.state.IsLogin ? (
                        <Alert
                          className="alert_error"
                          closable
                          onClose={this.alertOnClose}
                          message={alert_msg_login}
                          type="error"
                        />
                      ) : (
                        ""
                      )}
                      <Form.Item
                        style={{
                          paddingTop: "35px",
                          paddingBottom: "30px",
                          paddingLeft: "40%",
                        }}
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                        >
                          <span>Log in</span>
                        </Button>
                      </Form.Item>

                      <div>
                        <a
                          onClick={this.forgotPasswordEvent}
                          className="forgot-pass"
                        >
                          Forgot Password?
                        </a>
                        <br></br>
                      </div>
                      <div className="signup">
                        <p style={{ color: "rgb(151, 150, 151)" }}>
                          Do not have an account?
                          <a onClick={this.signupEvent} className="forgot-pass">
                            Signup
                          </a>
                        </p>
                      </div>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = { updateAppState, updateUserName };

const login = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default login;
