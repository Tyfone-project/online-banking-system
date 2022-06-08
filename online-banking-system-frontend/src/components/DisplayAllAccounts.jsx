import React from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar"

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <div className=" d-flex container w-50">
      <input
        className="form-control"
        value={filterValue || ""}

        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} records...`}

      />
    </div>
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
    prepareRow

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

      <table className="table table-bordered text-center" {...getTableProps()}>
        <thead >
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
        <tbody className="font-weight-bold" {...getTableBodyProps()}>
          {rows.map((row) => {
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
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState("");

  const dataRef = useRef();
  dataRef.current = accounts;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/accounts", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
        },
      })
      .then((res) => {
        setData(res.data);
        setAccounts(res.data.accounts);
        setUser(res.data.user);
        console.log("res ", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (accounts.length > 0) {
    var data1 = accounts.map((x) => ({
      accountNo: x["accountNo"],
      accountType: x["accountType"],

    }));
  }
  const GetDetails = (rowIndex) => {
    const id = dataRef.current[rowIndex];
    console.log("id", id.accountNo);
    sessionStorage.setItem("accountNo",id.accountNo);
    navigate("/customer/confirmPin");
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ACCOUNT DETAILS",
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
                      type="button"
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
    if (hour < 12)
      welcomeText = welcomeType[0];
    else if (hour < 18)
      welcomeText = welcomeType[1];
    else
      welcomeText = welcomeType[2];

    return welcomeText;
  }

  const DisplayMessage = () => {
    return <h3 className="text-center">You have no accounts to display, click on below button to add account!!</h3>
  }
  const Validate = () => {
    if (accounts.length > 0) {
      return <Table columns={columns} data={data1} />
    }
    else {
      return <DisplayMessage />
    }
  }
  return (
    <div>
      <NavigationBar />
      <div className="p-3 display-6 font-weight-bold font-italic mx-5 my-5">
        <img src={`data:image/jpeg;base64,${user.profilePicture}`} alt="" height={"100px"} width={"100px"} />
        &nbsp;&nbsp;&nbsp;&nbsp; Hello {user.firstName},{<Greeting />}!
      </div>

      <div className="p-2 container justify-content-center" >
        <Validate />
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