import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import DisplayAllAccounts from "./DisplayAllAccounts";
import { useNavigate } from 'react-router-dom'

function Accounts() {
  const navigate = useNavigate();
  const accountDetails = useFormik({
    initialValues: {
      accountType: "",
      pin: "",
    },
    onSubmit: (values) => {
      axios
        .post(
          `http://localhost:8080/api/accounts/addAccount`,
          values,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("tokenId")}`,
            },
          }
        )
        .then((response) => {
          alert("Account created successfully!!");
          console.log(response.data);
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1 className="fw-bolder">Create New Account</h1>
      </div>
      <Form onSubmit={accountDetails.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Account Type</Form.Label>
          <Form.Select
            className="form-control"
            name="accountType"
            required
            onChange={accountDetails.handleChange}
            defaultValue="acctype"
          >
            <option value="acctype" disabled>
              Select Account type
            </option>
            <option value="SAVINGS">SAVINGS</option>
            <option value="CURRENT">CURRENT</option>
            <option value="LOAN">LOAN</option>
            <option value="SALARY">SALARY</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" required>
          <Form.Label>Pin</Form.Label>
          <Form.Control
            type="password"
            onChange={accountDetails.handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-25" onClick={() => navigate("/customer/accounts")}>
          Back
        </Button> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <Button variant="primary" type="submit" className="w-50">
          Create Account
        </Button>
      </Form>
    </div>
  );
}
export default Accounts;
