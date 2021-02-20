import React, { Component } from "react";
import { connect } from 'react-redux';
import { Card, Input, DatePicker, Button } from 'antd';
import TableElement from './TableElement';
import moment from 'moment';
import axios from "axios";
// import { Pagination } from 'antd';
import fileSaver from 'file-saver'
import Pagination from './Pagination';
import Cookies from 'universal-cookie';
import {updateReportData} from '../../redux/actions';

const cookies = new Cookies();

const { RangePicker } = DatePicker;

class InputElementPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      start_date: '',
      end_date: '',
      // report: undefined,
      date: new Date().toLocaleString(),
      // currentPage: 0,
      // recordsPerPage: 10,
      totalRecords: 0,
    }
  }

  currentPage = 0;
  recordsPerPage = 10;
  onChangeDate = (values) => {
    // console.log("start date : "+ (new Date(values[0]._d).toLocaleString()));
    // console.log("end date : "+ (new Date(values[1]._d).toLocaleString()));
    let startDate = (new Date(values[0]._d).toLocaleString());
    let endDate = (new Date(values[1]._d).toLocaleString());
    this.setState({
      start_date: startDate,
      end_date: endDate,
      // report: undefined,
    });
  }

  viewReport = () => {
    if(this.state.start_date !== '' && this.state.end_date !== '') {

    axios.post('http://localhost/orc/graph_data.php?currentPage='+this.currentPage+'&recordsPerPage='+this.recordsPerPage, this.state).then(res=>{
      this.setState({ report: res.data.records, totalRecords: parseInt(res.data.totalCount)
      });
      const data = res.data[0]
      console.log(data)
      this.props.updateReportData(data)
      console.log(data)
      this.props.updateReportData(data)
    });
  } else {
    alert('Please select start and end date');
  }
  }

  exportReport = (type) => {
    if(this.state.start_date !== '' && this.state.end_date !== '') {
      var url = "http://localhost/orc/ReportExport.php?start_date="+this.state.start_date+"&end_date="+this.state.end_date+"&type="+type+"&print_by="+this.props.user.user_name;
    fileSaver.saveAs(url, (type === 'pdf'?'Report_Pdf.pdf':'Report_Excel.xls'));
  } else {
    alert('Please select start and end date');
  }
  }

  paginate = (page) => {
    // this.setState({currentPage: (page-1)});
    this.currentPage = (page-1);
    this.viewReport();
  }

  changeRecordSize = (recordSize) => {
    // this.setState({recordsPerPage: recordSize});
    this.recordsPerPage = recordSize;
    this.viewReport();
  }

  clear = () => {
    this.setState({
      start_date: '',
      end_date: '',
      report: undefined
    });
  }

  render() {
    const user = document.cookie;
    console.log(this.props.reportData)
    console.log(this.props.user)
    return (
      <div>
        <div className="input-content">
          <Card title="Export Data">
            <div className="input-element">
              <Input.Group compact>
                <label>Date Time<i style={{ color: 'red', fontSize: '10px' }}>&nbsp;*</i></label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <RangePicker
                  ranges={{
                    Today: [moment(), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                  }}
                  showTime
                  format="YYYY/MM/DD HH:mm:ss" 
                  onChange={this.onChangeDate}
                  defaultValue={[this.state.start_date, this.state.end_date]}
                  style={{ width: '35%', background: '#292929', borderBlockColor: 'rgba(255, 255, 255, 0.5)' }} 
                  />
                  <Button onClick={this.viewReport} type="primary" style={{ marginLeft: '2.5%' }}>Submit</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button onClick={this.clear} type="primary">Clear</Button>
              </Input.Group>
              
            </div>
            </Card>
        </div>
        <div className="report-element">
          <Card>
          <img src="./images/Logo-Vaigunth.png" alt="Logo"  style={{width: '50px', height: '40px', marginLeft: '15px'}} />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button onClick={() => this.exportReport('excel')} type="primary" style={{ marginLeft: '70%', marginTop: '1%' }}>Excel</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button onClick={() => this.exportReport('pdf')} type="primary">Pdf</Button>
            <h4>ENERTEK ORC</h4>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <h5>Export Data Report</h5>
            {/* <table class="report-constants">
              <tr>
                <th style={{ width: '217px' }}>ATR REF. NO </th>
                <th>TC/0/01</th>
              </tr>
              <tr>
                <td>ATP REF. NO </td>
                <td>2002 TRS/86</td>
              </tr>
              <tr>
                <td>PART NUMBER</td>
                <td>sb3336-00-011/sb337-100SB</td>
              </tr>
              <tr>
                <td>PART NAME</td>
                <td>Turbocharger</td>
              </tr>
              <tr>
                <td>SERIAL NUMBER</td>
                <td>Name</td>
              </tr>
            </table> */}
              <div class="row" style={{ marginTop: '20px' }}>
              <div class="col-lg-1">
              </div>
              <div class="col-lg-4">
                <label style={{marginLeft:'-15px'}}>From:&nbsp;{this.state.start_date}</label>
                <br />
                <label style={{marginLeft:'-15px'}}>To:&nbsp;{this.state.end_date}</label>
              </div>
              <div class="col-lg-3">
              </div>
              <div class="col-lg-3">
                <label>Print By: {this.props.user.user_name}</label>
                <br />
                <label>Print Date: {this.state.date}</label>
              </div>
            </div>
            <TableElement report={this.state.report}/>
            <div style={{float: 'right'}}>
            {/* <Pagination defaultCurrent={1} total={20} /> */}
            <Pagination paginateRecordSize={this.changeRecordSize} paginate={this.paginate} totalRecords={this.state.totalRecords} recordsPerPage={this.recordsPerPage}/>
            </div>
            {/* <div class="row" style={{ marginTop: '20px' }}>
              <div class="col-lg-2">
              </div>
              <div class="col-lg-4">
                <label><b><u>Tested By:</u></b></label>
                <br />
                <table>
                  <tr ng-repeat="tb in TestedBy">
                    <td>tb.TesterName</td>
                  </tr>
                </table>
              </div>
              <div class="col-lg-3">
              </div>
              <div class="col-lg-3">
                <label><b><u>Witnessed By:</u></b></label>
                <br />
                <table>
                  <tr ng-repeat="wn in WitnessName">
                    <td>wn.Witness</td>
                  </tr>
                </table>
              </div>
              <div class="col-lg-1">
              </div>
            </div> */}
          </Card>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  reportData: state.app.reportData, 
  user: state.app.userParams
})

const mapDispatchToProps = {
  updateReportData
}

const InputElement = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputElementPage)

export default InputElement;