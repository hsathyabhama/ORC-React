import "antd/dist/antd.css";
import "./Scenes/Styles/style.css"
import React, { Component } from "react";
import { connect } from "react-redux";
import MainComponent from "./Scenes/Components/MainComponent"
import LoginPage from './Scenes/Components/Forms/LoginPage'
import RegisterPage from './Scenes/Components/Forms/RegisterPage'
import ForgotPassword from './Scenes/Components/Forms/ForgotPassword'


class App extends Component {
  
  render() {
    const appState = this.props.appState;
  return (
    <div className="site-layout-background">
      {appState === "main" ? <MainComponent /> : []}
      {appState === "login" ? <LoginPage /> : []}
      {appState === "signup" ? <RegisterPage /> : []}
      {appState === "forgotPassword" ? <ForgotPassword /> : []}
      {appState === "logout" ? <LoginPage /> : []}
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  appState: state.app.appState,
});

const mapDispatchToProps = {  };

const appPage = connect(mapStateToProps, mapDispatchToProps)(App);
export default appPage;

