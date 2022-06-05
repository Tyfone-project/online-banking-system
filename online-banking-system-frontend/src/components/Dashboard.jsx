import React from "react";
import { Navbar, Container, Nav, Button, Row, Col, Card } from "react-bootstrap";
import {
    Link
} from "react-router-dom"
function Dashboard() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>#CompanyName</Navbar.Brand>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link><Button variant="secondary">Accounts</Button></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link><Button variant="primary">Profile</Button></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link><Button variant="danger">Logout</Button></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar><br /><br />

            <Card border = "danger" style={{ marginTop: "5%", marginLeft: "24%", width: "50%", height:"250px",}}>
                <Container style={{paddingLeft : "20%", paddingTop:"10%"}}>
                    <Row className="justify-content-center">
                        <Col><Link to="/checkPassword"><Button>Check Balance</Button></Link></Col>
                        <Col><Button>Transfer Money</Button></Col>
                    </Row><br /><br />
                    <Row>
                        <Col><Button>Generate Report</Button></Col>
                        <Col><Button>User Profile</Button></Col>
                    </Row>
                </Container>
            </Card>

        </>
    )
}
export default Dashboard;
