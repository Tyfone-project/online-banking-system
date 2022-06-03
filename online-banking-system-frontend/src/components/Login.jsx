import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <>
    <h1 className="fw-bolder">Log in to your account</h1>
    <span className="text-muted">
        Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up here</Link>
    </span>
    <hr />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Customer ID</Form.Label>
          <Form.Control type="text" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Log in
        </Button>
      </Form>
    </>
  );
}

export default Signup;
