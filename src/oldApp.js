import React from "react";
import './App.css';
import { Avatar, Breadcrumb, Col, Layout, Menu, Row } from 'antd';
import { UserOutlined, DashboardOutlined, BarChartOutlined } from '@ant-design/icons';
import Title from "antd/lib/typography/Title";
import SubMenu from "antd/lib/menu/SubMenu";

const { Header, Footer, Sider, Content } = Layout;
const style = { background: '#001529', padding: '40px 0', color: '#fff'};

function App() { 
  return (
    <div className="App">
      <Layout>
        <Header>
          <Title level={4}>VAIGUNTH</Title>
          <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
        </Header>
        <Layout>
        <Sider>
            <Menu
              defaultSelectedKeys={['Dashboard']}
              mode="inline"
            >
              <Menu.Item key='Dashboard'>
                Dashboard
              </Menu.Item>
                <SubMenu
                  title={
                    <span>
                      <DashboardOutlined />
                      <span>Main View</span>
                    </span>
                  }
                >
                  <Menu.ItemGroup key='MainViewItems' title='Main View Items'>
                    <Menu.Item key='AddNew1'>Add New 1</Menu.Item>
                    <Menu.Item key='AddNew2'>Add New 2</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
                <SubMenu
                  title={
                    <span>
                      <BarChartOutlined />
                      <span>Chart View</span>
                    </span>
                  }
                >
                  <Menu.ItemGroup key='ChartViewItems' title='Chart View Items'>
                    <Menu.Item key='Chart1'>Chart 1</Menu.Item>
                    <Menu.Item key='Chart2'>Chart 2</Menu.Item>
                    <Menu.Item key='Chart3'>Chart 3</Menu.Item>
                    <Menu.Item key='Chart4'>Chart 4</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
              </Menu>
            </Sider>
          <Layout>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-content">Content
              <div className="Online">Offline</div>
                <div>
                <Row gutter={16}>
                  <Col className="gutter-row" span={6}>
                    <div style={style}>Temp-sensor-1<br></br>value</div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                  </Col>
                </Row>
                </div>                
              </div>
            </Content>
            <Footer>© 2020 VAIGUNTH ENER TEK (P) LTD. ALL RIGHTS RESERVED</Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}
export default App;

