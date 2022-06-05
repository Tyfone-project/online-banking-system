import { Container, Navbar, Nav, Button, Card, Row, Col } from "react-bootstrap"
import {Link} from 'react-router-dom'
function Dashboard() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">#CompanyName</Navbar.Brand>
                    <Nav>
                        <Nav.Link><Button variant="secondary">Accounts</Button></Nav.Link>
                        <Nav.Link><Button variant="primary">User Profile</Button></Nav.Link>
                        <Nav.Link><Button variant="danger">Logout</Button></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Card style={{width:"50%", marginLeft:"22.3%", marginTop:"5%", height:"250px"}} border="danger">
                <Container style={{paddingLeft:"20%", paddingTop:"5%"}}>
                    <Row>
                        <Col><Link to="/checkPassword"><Button>Check Balance</Button></Link></Col>
                        <Col><Button>Transfer Money</Button></Col>
                    </Row><br/><br/><br/><br/><br/>
                    <Row>
                        <Col><Button>Generate Report</Button></Col>
                        <Col><Button>User Profile</Button></Col>
                    </Row>
                </Container>
            </Card>
        </div>

    )
}
export default Dashboard;
