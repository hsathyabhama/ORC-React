import React, { Component } from "react";
import { Switch, Row } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import {
  navigateMainPage,
  updateChartData,
  updateParamConfig,
} from "../../../redux/actions";

class CommandStateBlock extends Component {
  testClick = () => {
    setInterval(() => {
      axios
        .get("http://localhost:5000/getLiveData.php")
        .then((res) => {
          let liveData = res.data;
          console.log(liveData);
          this.props.updateChartData(liveData);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  };

  onChange = () => {
    this.testClick();
  };

  render() {
    return (
      <div className="flex-container">
        <div>
          <span style={{ color: "yellowgreen" }}>
            Connect ORC : &nbsp;&nbsp;
          </span>
          <Switch onChange={this.onChange} />
        </div>

        <div style={{ color: "yellowgreen" }}>
          <div>LIVE</div>
        </div>
      </div>
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
};

const commandPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandStateBlock);

export default commandPage;
