import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import FooterElement from './FooterElement';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect : false
    }
  }

  onFinish = (values) => {
    axios.post('http://localhost/orc/forget.php', 
    values,
    )
    
    .then(res => {
      if(res.data == "success") {
        this.setState({redirect: true});
      }else {
        alert('Please enter a valid Username')
        this.setState({redirect: false});
      }
      console.log(res)
    })
    .catch(err => {
      console.log(err.res)
    })
  };
  render() {
    if(this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <div>
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
                        <h1 style={{ color: 'white' }}>EnerTek ORC</h1>
                      </div>
                      <p>A product powerd by Vaigunth EnerTek (Pvt.) Ltd.</p>
                    </div>
                  </div>
                </div>
                {/* <!-- Form Panel    --> */}
                <div class="col-lg-6 bg-white">
                  <div class="form d-flex align-items-center">
                    <div class="content" style={{marginLeft: '20%'}}>
                      <Form
                        {...formItemLayout}
                        name="register"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                      >
                        <Form.Item
                          name="user_name"
                          // label="Username"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your username!',
                            },
                          ]}
                        >
                          <Input 
                          placeholder="Username"
                          style={{height: '30px', width: '100%'}} 
                          />
                        </Form.Item>
                        {/* <Form.Item
                          name="user_email"
                          // label="E-mail"
                          rules={[
                            {
                              type: 'email',
                              message: 'The input is not valid E-mail!',
                            },
                            {
                              required: true,
                              message: 'Please input your E-mail!',
                            },
                          ]}
                        >
                          <Input 
                          placeholder="E-mail"
                          style={{height: '30px', width: '100%'}} 
                          />
                        </Form.Item> */}

                        <Form.Item
                          name="password"
                          // label="Password"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your password!',
                            },
                          ]}
                          hasFeedback
                        >
                          <Input.Password 
                          placeholder="Password"
                          style={{height: '30px'}}  
                          />
                        </Form.Item>

                        <Form.Item
                          name="confirm"
                          // label="Confirm Password"
                          dependencies={['password']}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve();
                                }

                                return Promise.reject('The two passwords that you entered do not match!');
                              },
                            }),
                          ]}
                        >
                          <Input.Password 
                          placeholder="Confirm Password"
                          style={{height: '30px'}} 
                          />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                          <Button type="primary" htmlType="submit" style={{marginLeft: '-15%'}}>
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                      <div>
                      <small>Go back to Login: </small>
                      <Link to="/">Login</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          <FooterElement />
        </div>
      </div>
      </div>
    )
  }
}

export default ForgetPassword;
