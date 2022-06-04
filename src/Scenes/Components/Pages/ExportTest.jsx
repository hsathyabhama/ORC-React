import { useState, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function ExportTest() {
  const [result, setResult] = useState([]);

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((res) => setResult(res));
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className="container">
      <h3 className="mt-3 text-success">
        <center>Export React Table Data into EXCEL Sheet</center>
      </h3>
      <div className="row mt-4">
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button btn btn-success mb-3"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Export Data to Excel Sheet"
        />
        <table className="table" id="table-to-xls">
          <div className="flex-content">
            {" "}
            <div>
              {" "}
              <h1 style={{ color: "skyblue" }}> ENERTEK ORC</h1>
            </div>
            <div>
              {" "}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROkQnZ6A9cXv3obIsAJYeTsdTsCoPw9I3qJg&usqp=CAU"
                style={{ width: "40%", marginBottom: "30px" }}
              />
            </div>
          </div>{" "}
          <table id="report-constants">
            <tr>
              <th>ATR REF. NO </th>
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
              <td>5555</td>
            </tr>
          </table>
          <table>
            <thead className="thead-dark">
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {result.map((res) => (
                <tr>
                  <td>{res.name}</td>
                  <td>{res.username}</td>
                  <td>{res.email}</td>
                  <td>{res.website}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </table>
      </div>
    </div>
  );
}

export default ExportTest;
