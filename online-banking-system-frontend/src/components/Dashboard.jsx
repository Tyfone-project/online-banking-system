import React from "react";
import { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./Dashboard.css";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {

  const navigate = useNavigate();

  const headerStyle = {
    padding: "8px",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "1px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "noWrap",
    margin: "auto"
  };

  useEffect(() => {
    const token = sessionStorage.getItem("tokenId");
    const account = sessionStorage.getItem("accountNo");
    if (token) {
      if (jwtDecode(token).exp < Date.now() / 1000) navigate("/login");
      if (account) {
        if (jwtDecode(account).exp < Date.now() / 1000) navigate("/customer");
      } else navigate("/customer");
    } else {
      navigate("/login");
    }
  });


  return (
    <>
      <div className="d-flex">
        <ProSidebar style={{ height: "100vh", position: "fixed" }}>
          <SidebarHeader style={headerStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-bank" viewBox="0 0 16 16">
              <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.501.501 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89L8 0ZM3.777 3h8.447L8 1 3.777 3ZM2 6v7h1V6H2Zm2 0v7h2.5V6H4Zm3.5 0v7h1V6h-1Zm2 0v7H12V6H9.5ZM13 6v7h1V6h-1Zm2-1V4H1v1h14Zm-.39 9H1.39l-.25 1h13.72l-.25-1Z" />
            </svg>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem>
                <Link to="/account">Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to="depositmoney">Deposit Money</Link>
              </MenuItem>
              <MenuItem>
                <Link to="transferfunds">Transfer Funds</Link>
              </MenuItem>
              <MenuItem>
                <Link to="transactionslist">Transaction History</Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
        <div className="w-100" style={{ marginLeft: "260px" }}>
          <Navbar
            variant="dark"
            className="sticky-top"
            style={{ backgroundColor: "#1d1d1d", height: "73px" }}
          >
            <Container>
              <Navbar.Brand>
                Account Number:{" "}
                {jwtDecode(sessionStorage.getItem("accountNo")).sub}
              </Navbar.Brand>
              <Nav className="gap-2">
                <Nav.Link
                  onClick={() => {
                    toast.error("Account LogOut Successful");
                    sessionStorage.removeItem("accountNo");
                    navigate("/customer");
                  }}
                >
                  Log Out
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
