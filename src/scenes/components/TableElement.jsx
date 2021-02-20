import React, { Component } from "react";
import { Table } from 'react-bootstrap';
import './styles/style.css';

// const datas = [
//     {product: 'Temp Sensor', value: '250', range: '0 to 300', unit: 'Degree'},
//     {product: 'Rpm Sensor', value: '12500', range: '0 to 55000', unit: 'rpm'},
//     {product: 'Pressure Sensor', value: '0.102', range: '0 to 5', unit: 'Bar'},
//     {product: 'DPT Sensor1', value: '14', range: '0 to 5', unit: 'PSI'},
//     {product: 'DPT Sensor2', value: '14', range: '0 to 5', unit: 'PSI'},
//     {product: 'DPT Sensor3', value: '14', range: '0 to 5', unit: 'PSI'},
// ];

class TableElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report : this.props.report
    }
  }


    render() {
        return(
            <div className="tableElement">
            {/* <h6>Table Element</h6><br></br> */}
            <Table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Turbine RPM</th>
                        <th>Temparature 1</th>
                        <th>Temperature 2</th>
                        <th>Temperature 9</th>
                        <th>Pressure 2</th>
                        <th>Date Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      (this.props.report !== undefined) ? (
                        this.props.report.map((item,i)=>
                        <tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.RPM}</td>
                        <td>{item.T1}</td>
                        <td>{item.T2}</td>
                        <td>{item.T9}</td>
                        <td>{item.P2}</td>
                        <td>{new Date(item.date_Time).toLocaleString()}</td>
                    </tr>)): <td colspan='5'>No Data Available</td>
                    }
                </tbody>
            </Table>
            </div>
        )
    }
}
export default TableElement;