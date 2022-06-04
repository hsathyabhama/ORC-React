import React, { Component } from "react";
import { Col, Row } from "antd";
import { connect } from "react-redux";
import { dashboardDatas } from "../../Services/constant";
import CommandStateBlock from "./CommandStateBlock";
const { sensorLabel } = dashboardDatas;

class StatusBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
    };
  }

  render() {
    let persons;
    let persons1;
    let filteredRow1Data;
    let filteredRow2Data;
    let dashboardDataNumArr = [0, 1, 2, 3, 4];

    {
      this.props.app.chartData[0]
        ? (filteredRow1Data = Object.values(this.props.app.chartData[0]).filter(
            (_, index) => dashboardDataNumArr.includes(index)
          ))
        : (filteredRow1Data = []);
    }

    {
      this.props.app.chartData[1]
        ? (filteredRow2Data = Object.values(this.props.app.chartData[1]).filter(
            (_, index) => dashboardDataNumArr.includes(index) // we need this as a key value pair array for mapping
          ))
        : (filteredRow2Data = []);
    }

    {
      this.props.app.chartData[0]
        ? (persons = filteredRow1Data)
        : (persons = [0, 0, 0, 0, 0]);
    }

    {
      this.props.app.chartData[1]
        ? (persons1 = filteredRow2Data)
        : (persons1 = [0, 0, 0, 0, 0]);
    }
    return (
      <div>
        <CommandStateBlock />
        <Row>
          {persons.map((It, y) => (
            <Col span={4}>
              <div className="statistic-block">
                <Row>
                  {/* up and down arrow column */}
                  <Col>
                    {persons1[y] <= It ? (
                      <img
                        src="./images/up-arrow-1.gif"
                        alt="Arrow1"
                        style={{
                          width: "20px",
                          height: "30px",
                          marginTop: "8px",
                          marginLeft: "30px",
                        }}
                      />
                    ) : (
                      <img
                        src="./images/down-arrow-1.gif"
                        alt="Arrow2"
                        style={{
                          width: "20px",
                          height: "30px",
                          marginTop: "8px",
                          marginLeft: "30px",
                        }}
                      />
                    )}
                  </Col>
                  {/* value displaying column */}
                  <Col className="statistic-number">
                    {/* <span style={{ color: colors[y] }}>{It}</span> */}
                    <span>{It}</span>
                  </Col>
                </Row>

                <div className="progress progress-template">
                  <div
                    role="progressbar"
                    style={{
                      width: "100%",
                      ariavaluenow: "30",
                      ariavaluemin: "0",
                      ariavaluemax: "100",
                    }}
                    className="progress-bar progress-bar-template dashbg-1"
                  ></div>
                </div>
                {/*  Title column */}
                <div className="statistic-block-title">
                  <strong>{sensorLabel[y]}</strong>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {};

const ststusPage = connect(mapStateToProps, mapDispatchToProps)(StatusBlock);

export default ststusPage;
