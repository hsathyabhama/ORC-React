import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import ChartContainer from './ChartContainer';
import axios from 'axios';

class CardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            cardList: []
        }
      }

     interval = setInterval(() => {
      this.requestChartData();
      }, 1000);

      requestChartData() {

        axios.get('http://192.168.0.157/orc/graph.php').then(res => {
            this.state.cardList = [];
            // console.log(res.data);

            let chartdata = res.data;
            let t1 = [];
            let t2 = [];
            let t9 = [];
            let rpm = [];
            let p2 = [];
            let date_Time = [];
            for(let i=0; i<chartdata.length; i++){
              t1.push(chartdata[i].T1);
              t2.push(chartdata[i].T2);
              t9.push(chartdata[i].T9);
              rpm.push(chartdata[i].RPM);
              p2.push(chartdata[i].P2);
              date_Time.push(new Date(chartdata[i].date_Time).toLocaleTimeString([], {hour12: false}));
            }
            let chartLabel =["Temp1","Temp2","Temp9","RPM","Pressure"];
            for(let i=0; i<chartdata.chartLabel; i++){
              chartLabel = chartLabel[i];
            }
            let chartArray = [];
            chartArray.push(t1);
            chartArray.push(t2);
            chartArray.push(t9);
            chartArray.push(rpm);
            chartArray.push(p2);
            for(let i=0; i<chartArray.length; i++){
            let chart = 
            {
                // title: "chart-"+(i+1),
                size: 8,
                labels: date_Time,
                dataSet: {
                    chartData: chartArray[i],
                    chartLabel: chartLabel[i],
                    chartBackgroundColor: [
                      'rgba(24,144,255,0.2)'
                        // 'rgba(54, 162, 235, 0.1)',
                        // 'rgba(255, 206, 86, 0.1)',
                        // 'rgba(75, 192, 192, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 99, 132, 0.2)'
                    ],
                    chartBorderColor: [
                        'rgba(24, 144, 255, 0.5)',
                        'rgba(24, 144, 255, 0.5)',
                        'rgba(24, 144, 255, 0.5)',
                        'rgba(24, 144, 255, 0.5)',
                        'rgba(24, 144, 255, 0.5)',
                        'rgba(24, 144, 255, 0.5)'
                    ]
                }
            }
            this.forceUpdate();
            this.state.cardList.push(chart);
            // console.log(this.state.cardList)
            this.forceUpdate();
          }
          })
          .catch(err => {
            console.log(err);
          })
      }

    toggleBorder = () => {
        this.setState({loading : !this.state.loading})
    }
    render() {
      const {loading} = this.state;
      if(this.state.cardList !== undefined && this.state.cardList.length >= 5) {
        return(
          <div>
            <div className="site-card-wrapper">
              <Row gutter={16}>
                  <Col span={this.state.cardList[0].size}>
                    <Card>{this.state.cardList[0].title}
                      <ChartContainer 
                        data={this.state.cardList[0].dataSet.chartData ? this.state.cardList[0].dataSet.chartData : []}
                        labels={this.state.cardList[0].labels ? this.state.cardList[0].labels : []}
                        label={this.state.cardList[0].dataSet.chartLabel ? this.state.cardList[0].dataSet.chartLabel : "No Lebel"}
                        backgroundColor={this.state.cardList[0].dataSet.chartBackgroundColor ? this.state.cardList[0].dataSet.chartBackgroundColor : []}
                        borderColor={this.state.cardList[0].dataSet.chartBorderColor ? this.state.cardList[0].dataSet.chartBorderColor: []}
                      />
                    </Card>
                  </Col>
                  
                  <Col span={this.state.cardList[1].size}>
                    <Card>{this.state.cardList[1].title}
                      <ChartContainer 
                        data={this.state.cardList[1].dataSet.chartData ? this.state.cardList[1].dataSet.chartData : []}
                        labels={this.state.cardList[1].labels ? this.state.cardList[1].labels : []}
                        label={this.state.cardList[1].dataSet.chartLabel ? this.state.cardList[1].dataSet.chartLabel : "No Lebel"}
                        backgroundColor={this.state.cardList[1].dataSet.chartBackgroundColor ? this.state.cardList[1].dataSet.chartBackgroundColor : []}
                        borderColor={this.state.cardList[1].dataSet.chartBorderColor ? this.state.cardList[1].dataSet.chartBorderColor: []}
                      />
                    </Card>
                  </Col>

                  <Col span={this.state.cardList[2].size}>
                    <Card>{this.state.cardList[2].title}
                      <ChartContainer 
                        data={this.state.cardList[2].dataSet.chartData ? this.state.cardList[2].dataSet.chartData : []}
                        labels={this.state.cardList[2].labels ? this.state.cardList[2].labels : []}
                        label={this.state.cardList[2].dataSet.chartLabel ? this.state.cardList[2].dataSet.chartLabel : "No Lebel"}
                        backgroundColor={this.state.cardList[2].dataSet.chartBackgroundColor ? this.state.cardList[2].dataSet.chartBackgroundColor : []}
                        borderColor={this.state.cardList[2].dataSet.chartBorderColor ? this.state.cardList[2].dataSet.chartBorderColor: []}
                      />
                    </Card>
                  </Col>

                  <Col span={this.state.cardList[3].size} style={{marginLeft: '16%'}}>
                    <Card>{this.state.cardList[3].title}
                      <ChartContainer 
                        data={this.state.cardList[3].dataSet.chartData ? this.state.cardList[3].dataSet.chartData : []}
                        labels={this.state.cardList[3].labels ? this.state.cardList[3].labels : []}
                        label={this.state.cardList[3].dataSet.chartLabel ? this.state.cardList[3].dataSet.chartLabel : "No Lebel"}
                        backgroundColor={this.state.cardList[3].dataSet.chartBackgroundColor ? this.state.cardList[3].dataSet.chartBackgroundColor : []}
                        borderColor={this.state.cardList[3].dataSet.chartBorderColor ? this.state.cardList[3].dataSet.chartBorderColor: []}
                      />
                    </Card>
                  </Col>

                  <Col span={this.state.cardList[4].size}>
                    <Card>{this.state.cardList[4].title}
                      <ChartContainer 
                        data={this.state.cardList[4].dataSet.chartData ? this.state.cardList[4].dataSet.chartData : []}
                        labels={this.state.cardList[4].labels ? this.state.cardList[4].labels : []}
                        label={this.state.cardList[4].dataSet.chartLabel ? this.state.cardList[4].dataSet.chartLabel : "No Lebel"}
                        backgroundColor={this.state.cardList[4].dataSet.chartBackgroundColor ? this.state.cardList[4].dataSet.chartBackgroundColor : []}
                        borderColor={this.state.cardList[4].dataSet.chartBorderColor ? this.state.cardList[4].dataSet.chartBorderColor: []}
                      />
                    </Card>
                  </Col>
                </Row>
              </div>
          </div>
        );
        } else {
          return( <div className="site-card-wrapper"></div>);
        }
    }
}
export default CardContainer;