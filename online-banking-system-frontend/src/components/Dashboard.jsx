import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Account Number</Navbar.Brand>
          <Nav className="gap-2">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link> */}
            <Nav.Link href="#pricing">Log Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <section className="p-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="bg-dark bg-gradient p-5 rounded-3 bg-light">
            <div>
              <button className="btn-primary">Check Balance</button>
              <button className="btn-primary">Transfer Money</button>
            </div>
            <div>
              <button className="btn-primary">Add Money</button>
              <button className="btn-primary">Transaction History</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;