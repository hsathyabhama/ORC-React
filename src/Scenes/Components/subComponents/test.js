import React, { Component } from "react";
import { Card, Col, Row } from "antd";
import GraphComponent from "./ChartComponent";
import { connect } from "react-redux";
import { dashboardDatas } from "../../../Services/constant";

const { dummyData, sensorLabel } = dashboardDatas;

class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartValue: [],
      textColor: "",
      cardList: [],
      dummygraphData: [
        {
          RPM: dummyData,
          Temp1: dummyData,
          Temp2: dummyData,
          Temp3: dummyData,
          Pressure: dummyData,
          testdatadate: dummyData,
        },
        {
          RPM: dummyData,
          Temp1: dummyData,
          Temp2: dummyData,
          Temp3: dummyData,
          Pressure: dummyData,
          testdatadate: dummyData,
        },
        {
          RPM: dummyData,
          Temp1: dummyData,
          Temp2: dummyData,
          Temp3: dummyData,
          Pressure: dummyData,
          testdatadate: dummyData,
        },
        {
          RPM: dummyData,
          Temp1: dummyData,
          Temp2: dummyData,
          Temp3: dummyData,
          Pressure: dummyData,
          testdatadate: dummyData,
        },
        {
          RPM: dummyData,
          Temp1: dummyData,
          Temp2: dummyData,
          Temp3: dummyData,
          Pressure: dummyData,
          testdatadate: dummyData,
        },
      ],
    };
  }

  //Initially to render graph with 0 value
  interval = setInterval(() => {
    {
      this.props.app.chartData.length !== 0
        ? this.prepareChartParams(this.props.app.chartData)
        : this.prepareChartParams(this.state.dummygraphData);
    }
  });

  prepareChartParams = (chartdata) => {
    let rpm = [];
    let t1 = [];
    let t2 = [];
    let t3 = [];
    let p1 = [];
    let date_Time = [];

    for (let i = 0; i < 5; i++) {
      rpm.push(chartdata[i].RPM);
      t1.push(chartdata[i].Temp1);
      t2.push(chartdata[i].Temp2);
      t3.push(chartdata[i].Temp3);
      p1.push(chartdata[i].Pressure);

      date_Time.push(
        new Date(chartdata[i].date_Time).toLocaleTimeString([], {
          hour12: false,
        })
      );
    }

    let dashboardDataNumArr = [0, 1, 2, 3, 4];

    let filteredDataLabel = sensorLabel.filter((_, index) =>
      dashboardDataNumArr.includes(index)
    ); //chartlabel

    let chartArray = [];
    chartArray.push(rpm);
    chartArray.push(t1);
    chartArray.push(t2);
    chartArray.push(t3);
    chartArray.push(p1);

    let filteredData = chartArray.filter((_, index) =>
      dashboardDataNumArr.includes(index)
    );
    let filteredDataText;
    {
      this.props.app.chartData[0]
        ? (filteredDataText = Object.values(this.props.app.chartData[0]).filter(
            (_, index) => dashboardDataNumArr.includes(index)
          ))
        : (filteredDataText = []);
    }

    let textColor;
    const chartValue = [];
    for (let i = 0; i < filteredData.length; i++) {
      if (this.props.app.paramConfig) {
        let chart = {
          size: 8,
          labels: date_Time,
          dataSet: {
            title: filteredDataText,
            chartData: filteredData[i],
            filteredDataLabel: filteredDataLabel[i],
            chartBackgroundColor: ["rgba(24,144,255,0.2)"],
            chartBorderColor: [
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
              "rgba(24, 144, 255, 0.5)",
            ],
            chartTextColor: textColor,

            upperLimitVal: this.props.app.paramConfig[i].graph_upper,

            lowerLimitVal: this.props.app.paramConfig[i].graph_lower,
          },
        };
        chartValue.push(chart);
        this.setState({
          cardList: chartValue,
        });
      }
    }
  };

  render() {
    console.log(this.state.cardList);
    // if (this.state.cardList !== undefined && this.state.cardList.length >= 5) {
    return (
      <div className="site-card-wrapper">
        fdgdfty
        {/* <Row gutter={16}>
          {this.state.cardList
            ? this.state.cardList.map((it, y) => {
                return (
                  <Col span={8}>
                    <Row style={{ paddingTop: "20px" }}>
                      <Card className="graph-card">
                        {it.title}
                        <GraphComponent
                          data={
                            it.dataSet.chartData ? it.dataSet.chartData : []
                          }
                          labels={
                            it.dataSet.filteredDataLabel
                              ? it.dataSet.filteredDataLabel
                              : []
                          }
                          label={
                            it.dataSet.filteredDataLabel
                              ? it.dataSet.filteredDataLabel
                              : "No Label"
                          }
                          title={
                            it.dataSet.title[y]
                              ? it.dataSet.title[y]
                              : "No Data"
                          }
                          backgroundColor={
                            it.dataSet.chartBackgroundColor
                              ? it.dataSet.chartBackgroundColor
                              : []
                          }
                          borderColor={
                            it.dataSet.chartBorderColor
                              ? it.dataSet.chartBorderColor
                              : []
                          }
                          textColor={
                            it.dataSet.chartTextColor
                              ? it.dataSet.chartTextColor
                              : []
                          }
                          upperLimit={
                            it.dataSet.upperLimitVal
                              ? it.dataSet.upperLimitVal
                              : []
                          }
                          lowerLimit={
                            it.dataSet.lowerLimitVal
                              ? it.dataSet.lowerLimitVal
                              : []
                          }
                        />
                      </Card>
                    </Row>
                  </Col>
                );
              })
            : []}
        </Row> */}
      </div>
    );
    // } else {
    //   return <div className="site-card-wrapper"></div>;
    // }
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {};
const card = connect(mapStateToProps, mapDispatchToProps)(CardComponent);
export default card;
