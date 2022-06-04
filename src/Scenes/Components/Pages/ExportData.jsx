import React, { Component } from "react";
import { connect } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import axios from "axios";
import moment from "moment";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Row,
  Spin,
  Layout,
  Table,
} from "antd";

const { RangePicker } = DatePicker;
const columns = [
  // {
  //   title: "Sl No",
  //   dataIndex: "Sl No",
  //   width: 150,
  // },
  {
    title: "Date Time",
    dataIndex: "testdatadatetime",
    width: 200,
  },
  {
    title: "Turbine RPM",
    dataIndex: "rpm",
  },
  {
    title: "Temparature 1",
    dataIndex: "T1",
  },
  {
    title: "Temparature 2",
    dataIndex: "T2",
  },
  {
    title: "Temparature 9",
    dataIndex: "T3",
  },
  {
    title: "Pressure",
    dataIndex: "P1",
  },
];

class RunningReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: "",
      end_date: "",
      report: "",
      date: new Date().toLocaleString(),
      // currentPage: 0,
      // recordsPerPage: 10,
      totalRecords: 0,
      loading: false,
    };
  }

  onChangeDate = (values) => {
    let startDate = new Date(values[0]._d).toLocaleString();
    let endDate = new Date(values[1]._d).toLocaleString();
    this.setState({
      start_date: startDate,
      end_date: endDate,
      // report: undefined,
    });
  };

  viewReport = () => {
    if (this.state.start_date !== "" && this.state.end_date !== "") {
      axios
        .post("http://localhost:5000/runningReport.php", {
          startDate: moment(this.state.start_date).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          endDate: moment(this.state.end_date).format("YYYY-MM-DD HH:mm:ss"),
        })
        .then((res) => {
          let data = res.data;
          console.log(data);
          this.setState({
            report: data,
            // totalRecords: parseInt(res.data.totalCount),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please select start and end date");
    }
  };

  // exportReport = (type) => {
  //   if (this.state.start_date !== "" && this.state.end_date !== "") {
  //     var url =
  //       "http://localhost:5000/ReportExport.php?start_date=" +
  //       this.state.start_date +
  //       "&end_date=" +
  //       this.state.end_date +
  //       "&type=" +
  //       type +
  //       "&print_by=" +
  //       this.props.app.userName;
  //     fileSaver.saveAs(
  //       url,
  //       type === "pdf" ? "Report_Pdf.pdf" : "Report_Excel.xls"
  //     );
  //   } else {
  //     alert("Please select start and end date");
  //   }
  // };

  //exporting csv
  exportToCSV = (csvData, fileName) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  render() {
    const result = this.state.report;
    return (
      <div>
        <Layout className="report-input">
          <Form
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 24,
            }}
          >
            <Form.Item
              name="Duration"
              label="Duration"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Group compact style={{ marginTop: "10px" }}>
                <RangePicker
                  size={12}
                  ranges={{
                    Today: [moment(), moment()],
                    "This Month": [
                      moment().startOf("month"),
                      moment().endOf("month"),
                    ],
                  }}
                  showTime
                  format="YYYY/MM/DD HH:mm:ss"
                  onChange={this.onChangeDate}
                  defaultValue={[this.state.start_date, this.state.end_date]}
                  style={{
                    width: "35%",
                    background: "#292929",
                    borderBlockColor: "gray",
                    marginLeft: "2%",
                  }}
                />
                <br />
              </Input.Group>
            </Form.Item>
            <Row
              style={{ marginTop: "2%", marginLeft: "20%", marginBottom: "2%" }}
            >
              <Button
                onClick={this.viewReport}
                type="primary"
                style={{ marginRight: "5%" }}
              >
                Submit
              </Button>

              <Button
                // onClick={this.clear}
                type="primary"
              >
                Clear
              </Button>
            </Row>
          </Form>
        </Layout>

        <Layout className="report-element">
          <div className="report-content">
            <div>
              <div>
                <img
                  src="./images/Logo-Vaigunth.png"
                  alt="Logo"
                  style={{
                    width: "50px",
                    height: "40px",
                    marginLeft: "15px",
                    float: "left",
                  }}
                />
              </div>
              <div style={{ float: "right" }}>
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button btn btn-success mb-3"
                  table="table-to-xls"
                  filename="ExportData"
                  sheet="ExportData"
                  buttonText="Export Data to Excel Sheet"
                />
              </div>
            </div>

            {/* <TableElement report={this.state.report} /> */}

            <div>
              <table className="table" id="table-to-xls">
                {" "}
                <div
                  style={{
                    marginTop: "-23px",
                    textAlign: "center",
                  }}
                >
                  <h3>Export Data </h3>
                </div>
                <div
                  className="report-content-data"
                  style={{ marginTop: "10px" }}
                >
                  <div style={{ float: "left" }}>
                    <div>
                      {" "}
                      <label>From :</label> &nbsp;
                      {this.state.start_date}
                    </div>
                    <div>
                      {" "}
                      <label>To :</label> &nbsp;
                      {this.state.end_date}
                    </div>
                  </div>
                  <div style={{ float: "right" }}>
                    <div>
                      {" "}
                      <label>Print By :</label>&nbsp;
                      {this.props.app.userName}
                    </div>
                    <div>
                      {" "}
                      <label>Print Date :</label> &nbsp;
                      {this.state.date}
                    </div>
                  </div>
                </div>
                <Spin
                  tip="Loading..."
                  size="large"
                  spinning={this.state.loading}
                >
                  <Table
                    columns={columns}
                    dataSource={this.state.report}
                    pagination={{ pageSize: 50 }}
                    scroll={{ y: 240 }}
                  />
                </Spin>
              </table>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = {};

const report = connect(mapStateToProps, mapDispatchToProps)(RunningReport);

export default report;
