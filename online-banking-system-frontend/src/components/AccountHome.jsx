import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import MoneySpentByMonth from "./MoneySpentByMonth";

var formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function AccountHome() {
  const [resp, setResp] = useState({
    balance: 0,
    recentTransactions: [],
    moneySpentThisMonth: 0,
  });

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/accounts/${jwtDecode(sessionStorage.getItem("accountNo")).sub
        }`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
          },
        }
      )
      .then((res) => setResp(res.data));
  }, []);

  return (
    <>
      <div className="d-flex gap-5 justify-content-center">
        <div className="card shadow" style={{ width: "25%", marginTop: "3%" }}>
          <div className="row g-0 d-flex flex-wrap align-items-center">
            <div className="card-body">
              <h3 className="card-title text-center fw-normal">
                Balance: {formatter.format(resp.balance)}
              </h3>
            </div>
          </div>
        </div>
        <div className="card shadow" style={{ width: "40%", marginTop: "3%" }}>
          <div className="row g-0 d-flex flex-wrap align-items-center">
            <div className="card-body">
              <h3 className="card-title text-center fw-normal">
                Money Spent this month:{" "}
                {formatter.format(resp.moneySpentThisMonth)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div
        className="card mx-auto shadow p-2"
        style={{ width: "85%", marginTop: "1%" }}
      >
        <div className="row g-0 d-flex flex-wrap align-items-center">
          <div className="card-body">
            <h3 className="card-title">
              Recent Transactions
            </h3>
            <hr />
          </div>
          <Table className="table align-middle bg-white table-striped">
            <thead className="thead-dark">
              <tr style={{ height: "75px" }}>
                <th scope="col" className="align-middle">
                  Transaction ID
                </th>
                <th scope="col" className="align-middle">
                  Transaction From
                </th>
                <th scope="col" className="align-middle">
                  Transaction To
                </th>
                <th scope="col" className="align-middle">
                  Amount
                </th>
                <th scope="col" className="align-middle">
                  Transaction Date
                </th>
                <th scope="col" className="align-middle">
                  Transaction Status
                </th>
              </tr>
            </thead>
            <tbody>
              {resp.recentTransactions.length > 0 &&
                resp.recentTransactions.map((tx) => (
                  <tr>
                    <td>{tx.transactionId}</td>
                    <td>{tx.transactionFrom}</td>
                    <td>{tx.transactionTo}</td>
                    <td className={tx.transactionFrom == jwtDecode(sessionStorage.getItem("accountNo")).sub ? "text-danger" : "text-success"}>{formatter.format(tx.amount)}</td>
                    <td>{tx.date}</td>
                    <td style={{ color: "green", fontWeight: "bold" }}>
                      {tx.transactionStatus}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
      <MoneySpentByMonth />
    </>
  );
}

export default AccountHome;
