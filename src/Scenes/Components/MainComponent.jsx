import React, { Component, useState } from "react";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import {
  navigateMainPage,
  updateChartData,
  updateParamConfig,
  updategraphLimit,
} from "../../redux/actions";
import FooterElement from "../Components/subComponents/FooterElement";
import HeaderComponent from "../Components/subComponents/HeaderComponent";
import CommandStateBlock from "./subComponents/CommandStateBlock";
import DashboardPage from "./Pages/DashboardPage";
import ExportData from "./Pages/ExportData";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  TableOutlined,
  FundOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
const { Sider, Content } = Layout;
const { SubMenu } = Menu;

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testDataInsert: false,
    };
  }
  componentDidMount() {
    if (this.state.testDataInsert === false) {
      axios
        .post("http://localhost:5001/testDataInsert.php")
        .then(function (response) {
          this.setState({
            testDataInsert: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    axios
      .get("http://localhost:5000/paramConfig.php")
      .then((res) => {
        let graphData = res.data;
        console.log(graphData);
        this.props.updateParamConfig(graphData);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/configuration.php")
      .then((res) => {
        let data = res.data;
        this.props.updategraphLimit(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //onclick function for toggle collapse
  siderHandleClick = (e) => {
    this.props.navigateMainPage(e.key);
  };

  render() {
    const appData = this.props.app;
    const { mainPage } = appData;
    console.log(this.props.app);
    return (
      <Layout className="fill-window">
        <HeaderComponent />
        <Layout className="content-layout">
          <Sider trigger={null} collapsible>
            <Menu mode="inline" theme="dark" onClick={this.siderHandleClick}>
              <Menu.Item
                key="dashboardPage"
                icon={<DashboardOutlined style={{ color: "#42dbdc" }} />}
              >
                {" "}
                Dashboard Page
              </Menu.Item>
              <SubMenu
                key="sub1"
                icon={<FundOutlined />}
                title="Report"
                style={{ fontSize: "15px" }}
              >
                <Menu.Item
                  key="exportData"
                  icon={<TableOutlined style={{ color: "#42dbdc" }} />}
                >
                  Export Data
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>

          <Content
            className="content"
            style={{
              padding: 24,
            }}
          >
            {mainPage === "dashboardPage" ? <DashboardPage /> : []}
            {mainPage === "exportData" ? <ExportData /> : []}
          </Content>
        </Layout>
        {/* <FooterElement /> */}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {
  navigateMainPage,
  updateChartData,
  updateParamConfig,
  updategraphLimit,
};

const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default MainPage;
