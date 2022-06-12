import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import jwtDecode from "jwt-decode";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function DepositMoney() {
  const [amount, setAmount] = useState(0);
  const [accountNo, setAccountNo] = useState(jwtDecode(sessionStorage.getItem("accountNo")).sub);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount === "" || amount <= 0) {
      alert("Please enter a valid amount.");
    } else {
      // alert(amount + account)
      var option = {
        key: "rzp_test_vuBLAkMU3brzNo",
        key_secret: "uDFVc1nk6ufdvG8ppVbog4nf",
        amount: amount * 100,
        name: "Account Number " + accountNo,
        currency: "INR",
        handler: function (res) {
          axios.post(
            "http://localhost:8080/api/accounts/depositmoney",
            {
              accountNo,
              balance: amount,
            },
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
              },
            }
          );
        },
      };
      var pay = new window.Razorpay(option);
      pay.open();
    }
  };

  return (
    // <div>
    //     <input type="text" placeholder="Enter the account number" value={account} onChange={(e)=> setAccountNumber(e.target.value) }/><br/>
    //     <input type="text" placeholder="Enter the amount" value={amount} onChange={(e)=> setAmount(e.target.value) }/><br/>
    //     <button onClick={handleSubmit}>Deposit Money</button>
    // </div>

    <div
      className="card mx-auto shadow"
      style={{ width: "45%", marginTop: "10%" }}
    >
      <div className="row g-0 d-flex flex-wrap align-items-center">
        <div className="card-body">
          <h1 className="card-title display-4 text-center fw-bolder">
            {" "}
            Deposit Money{" "}
          </h1>
          <hr />
        </div>

        <Form className="form-control col-sm-6 mx-auto border-0 h-100 border-none mb-4">
          <Form.Group
            className="mb-3"
            controlId="formBasicAccountNo"
            style={{ paddingLeft: "10%", paddingRight: "10%" }}
          >
            <Form.Label>Account No.</Form.Label>
            <Form.Control
              type="number"
              name="accountNo"
              value={accountNo}
              disabled
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicAmount"
            style={{ paddingLeft: "10%", paddingRight: "10%" }}
          >
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ paddingLeft: "10%", paddingRight: "10%" }}>
            <Button
              variant="primary"
              type="submit"
              className="w-100 m-0"
              style={{ lineHeight: "2" }}
              onClick={handleSubmit}
            >
              Deposit Money
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
export default DepositMoney;
