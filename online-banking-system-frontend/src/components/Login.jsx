import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Signup() {
  const login = useFormik({
    initialValues: {
      customerId: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post("http://localhost:8080/api/signin", { ...values },{
          params
        })
        .then((res) => console.log(res));
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
        <Button variant="primary" type="submit" className="w-100">
          Sign in
        </Button>
      </Form>
    </>
  );
}

export default Signup;
