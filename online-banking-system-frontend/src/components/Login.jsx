import axios from "axios";
import { useFormik } from "formik";
import jwtDecode from "jwt-decode";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


function Signin() {


  const navigate = useNavigate();
  const login = useFormik({
    initialValues: {
      customerId: "",
      password: "",
    },
    onSubmit: (values) => {

      axios
        .post("http://localhost:8080/api/signin", { ...values })
        .then((res) => {
          if (res.status === 200){ 
          sessionStorage.setItem("tokenId", res.data.tokenId);
          sessionStorage.setItem("customerId",values.customerId);
         
          navigate("/customer");}
        });
    },
  });

  return (
    <>
      <h1 className="fw-bolder">Sign in to your account</h1>
      <span className="text-muted">
        Don't have an account?{" "}
        <Link to="/signup" className="text-decoration-none">
          Sign up here
        </Link>
      </span>
      <hr />
      <Form onSubmit={login.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Customer ID</Form.Label>
          <Form.Control
            type="text"
            name="customerId"
            value={login.values.customerId}
            onChange={login.handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={login.values.password}
            onChange={login.handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 m-0">
          Sign in
        </Button>
      </Form>
    </>
  );
}

export default Signin;
