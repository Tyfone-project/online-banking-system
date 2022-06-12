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

function Dashboard() {
  const navigate = useNavigate();

  const headerStyle = {
    padding: "24px",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "1px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "noWrap",
  };

  useEffect(() => {
    const token = sessionStorage.getItem("tokenId");
    const account = sessionStorage.getItem("accountNo");
    if(token){
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
          <SidebarHeader style={headerStyle}>Sidebar Example</SidebarHeader>
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
