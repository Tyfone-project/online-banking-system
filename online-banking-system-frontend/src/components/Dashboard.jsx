import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./Dashboard.css";
import jwtDecode from "jwt-decode";

function Dashboard() {
  const [resp, setResp] = useState({
    balance: 0.0,
    recentTransactions: [],
    moneySpentThisMonth: 0.0,
  });

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
    axios.get("http://localhost:8080/api/accounts/"+jwtDecode(sessionStorage.getItem("accountNo")).sub).then((res) => {});
  }, []);
  return (
    <>
      <div className="d-flex">
        <ProSidebar style={{ height: "100vh", position: "fixed"}}>
          <SidebarHeader style={headerStyle}>Sidebar Example</SidebarHeader>
          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem><Link to="/account">Home</Link></MenuItem>
              <MenuItem><Link to="transferfunds">Deposit Money</Link></MenuItem>
              <MenuItem><Link to="transferfunds">Transfer Funds</Link></MenuItem>
              <MenuItem><Link to="transactionslist">Transaction History</Link></MenuItem>
            </Menu>
            {/* <Menu iconShape="circle">
              <SubMenu
                suffix={<span className="badge yellow">3</span>}
                title="With Suffix"
              >
                <MenuItem> 1 </MenuItem>
                <MenuItem> 2 </MenuItem>
                <MenuItem> 3 </MenuItem>
              </SubMenu>
            </Menu> */}
          </SidebarContent>

        </ProSidebar>
        <div className="w-100" style={{marginLeft: "260px"}}>
          <Navbar variant="dark" className="sticky-top" style={{backgroundColor:"#1d1d1d", height:"73px"}}>
            <Container>
              <Navbar.Brand href="#home">Account Number</Navbar.Brand>
              <Nav className="gap-2">
                {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link> */}
                <Nav.Link href="#pricing">Log Out</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Outlet/>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
