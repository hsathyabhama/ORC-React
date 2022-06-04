import React, { Component } from "react";
import { Layout, Row, Button } from "antd";
import { connect } from "react-redux";
const { Header } = Layout;

class HeaderComponent extends Component {
  //function for logout
  backToLoginEvent = () => {
    window.location.reload(false);
    // logoutEvent((data) => {});
  };

  render() {
    const user_Name = this.props.app.userName;
    return (
      <Header>
        <div class="header">
          <LogoValue />

          <div class="header-right">
            <p>Welcome {user_Name}</p>
            <Button onClick={this.backToLoginEvent}>logout</Button>
          </div>
        </div>
      </Header>
    );
  }
}
const LogoValue = () => (
  <div class="logo">
    <strong style={{ color: "#42dad6", fontSize: "20px" }}>ENERTEK</strong>
    <strong style={{ color: "#8a8d93", fontSize: "20px" }}>ORC</strong>
  </div>
);

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {};

const header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

export default header;
