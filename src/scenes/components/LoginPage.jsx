import React, { Component } from "react";
import { connect } from 'react-redux';
import './styles/style.css';
import FooterElement from './FooterElement';
import { Form, Input, Button, Checkbox, Anchor } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";

import { updateUserParameter } from '../../redux/actions';

class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect : false
    }
  }
  onFinish = (values) => {
    axios.post('http://localhost/orc/login_validation.php', 
    values,
    )    
    .then(res => {
      console.log(res)
      if(res.statusText == "OK") {
        this.props.updateUserParameter(values)
        this.setState({redirect: true});        
      }
    })
    .catch(err => {
      console.log(err.res)
    })
  };
  render() {
    const { redirect } = this.state; 
    if(redirect) {      
      document.cookie = redirect
      return <Redirect to="/MainPage" />
      }
    return(
      <div class="background">
        <div class="login-page">
          <div class="container d-flex align-items-center">
            <div class="form-holder has-shadow">
              <div class="row">
                {/* <!-- Logo & Information Panel--> */}
                <div class="col-lg-6">
                  <div class="info d-flex align-items-center">
                    <div class="content">
                      <div class="logo">
                        <h1 style={{color:'white'}}>EnerTek ORC</h1>
                      </div>
                      <p>A product powerd by Vaigunth EnerTek (Pvt.) Ltd.</p>
                    </div>
                  </div>
                </div>
                {/* <!-- Form Panel    --> */}
                <div class="col-lg-6">
                  <div class="form d-flex align-items-center">
                    <div class="content" style={{marginLeft: '15%'}}>
                        <Form
                          name="normal_login"
                          className="login-form"
                          initialValues={{ remember: true }}
                          onFinish={this.onFinish}
                        >
                          <Form.Item
                            name="user_name"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                          >
                            
                            <Input 
                            // prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder= "Username" 
                            style={{backgroundColor: '#292929', width: '80%', height: '30px'}} />
                          </Form.Item>
                          <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                          >
                            <Input.Password
                              // prefix={<LockOutlined className="site-form-item-icon" />}
                              type="password"
                              placeholder="Password"
                              style={{backgroundColor: '#292929', width: '80%', height: '30px'}}
                            />
                          </Form.Item>
                          <Form.Item>
                            {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                              <Checkbox>Remember me</Checkbox>
                            </Form.Item> */}
                             <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                            </Button>
                          
                          </Form.Item>

                          <Form.Item> 
                           
                            <Link to="/ForgetPassword" className="login-form-forgot">
                              Forgot password?
                            </Link><br></br>
                            Do not have an account? <Link to="/RegisterPage">Signup</Link>
                          </Form.Item>
                          </Form>
                      {/* <a href="#" class="forgot-pass">Forgot Password?</a><br></br><small>Do not have an account? </small>
                      <a href="#" class="signup">Signup</a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterElement />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  app: state.app
})

const mapDispatchToProps = {
  updateUserParameter
}

const login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default login;