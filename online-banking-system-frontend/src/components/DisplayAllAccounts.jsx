import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "regenerator-runtime/runtime";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      className="form-control"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}
function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter
  );
  return (
    <div>
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </div>
  );
}

function DisplayAllAccounts() {
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const dataRef = useRef();
  dataRef.current = data;
  const custId = sessionStorage.getItem("customerId");

  console.log("custId", custId);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/accounts", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
        },
      })
      .then((res) => {
          res.data.accounts.map(x=>console.log(x));
        setData(res.data);
        console.log("res ", res.data);
        //console.log(dataRef.current[0].user.firstName);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log("data", data);
  let acc = new Array();

  acc = data.accounts;

  var u = data.user;
  console.log("accounts", data.accounts);
  console.log("user", u);
  console.log("acc", acc);

  var data1 = data.accounts.map((x) => ({
    accountNo: x["accountNo"],
    accountType: x["accountType"],
  }));
  console.log("data1", data1);

  const GetDetails = (rowIndex) => {
    const id = dataRef.current[rowIndex];
    console.log(id.id);

    navigate("/customer/confirmPin");
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Account Details",
        columns: [
          {
            Header: "Account No",
            accessor: "accountNo",
          },
          {
            Header: "Account Type",
            accessor: "accountType",
          },

          {
            Header: "Action",
            accessor: "action",
            Cell: (props) => {
              const rowIdx = props.row.id;
              return (
                <div>
                  <span>
                    <button
                      className="btn btn-info"
                      onClick={() => GetDetails(rowIdx)}
                    >
                      Click here to proceed
                    </button>
                  </span>
                  &nbsp;
                </div>
              );
            },
          },
        ],
      },
    ],
    []
  );
  const navigate = useNavigate();
  const createAccount = (e) => {
    e.preventDefault();
    navigate("/customer/addAccount");
  };

  const Greeting = () => {
    var welcomeText = "";
    var welcomeType = ["Good morning", "Good afternoon", "Good evening"];
    var hour = new Date().getHours();
    if (hour < 12) welcomeText = welcomeType[0];
    else if (hour < 18) welcomeText = welcomeType[1];
    else welcomeText = welcomeType[2];

    return welcomeText;
  };
  return (
    <div>
      <div className="p-3 display-6 font-weight-bold font-italic mx-5">
        {/* <img src={`data:image/jpeg;base64,${data.user.profilePicture}`} alt="" height={"100px"} width={"100px"} />  */}
        {/* &nbsp;&nbsp;&nbsp;&nbsp; Hello {data.user},{<Greeting />}! */}
      </div>

      <div className="p-3 mx-5 my-4">
        <Table columns={columns} data={data1} />
      </div>
      <div className="text-center">
        <Button
          variant="primary"
          type="submit"
          className="w-25"
          onClick={(e) => createAccount(e)}
        >
          Add New Account
        </Button>
      </div>
    </div>
  );
}
export default DisplayAllAccounts;
