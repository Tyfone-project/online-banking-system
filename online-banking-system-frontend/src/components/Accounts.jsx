import { useState } from "react"
import axios from 'axios';
import { Button, Form } from "react-bootstrap";

function Accounts() {

    const custId = sessionStorage.getItem('customerId');

    const [type, setType] = useState('');
    const [pin, setPin] = useState('');
    const [customerId, setCustomerId] = useState(custId);

    const account = {
        accountType: type,
        pin: pin,
        customerId: customerId
    }

    const handleTypeChange = (e) => {
        let aType = e.target.value;
        setType(aType);
    }

    const handlePinChange = (e) => {
        let aPin = e.target.value;
        setPin(aPin);
    }

    const handleSubmit = (e) => {
        axios.post(`http://localhost:8080/accounts/addAccount`, account, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("tokenId")}`
            }
        })
            .then(response => {
                alert("Account created successfully!!");
                console.log(response.data);
                // navigate("/")
            })
            .catch(err => console.log(err));

    }

    return (
        <div>
            <div class="d-flex justify-content-center">
                <h1 className="fw-bolder">Create New Account</h1>
            </div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Account Type</Form.Label>
                    <Form.Select className="form-control" name="type" id="type" required onChange={(e) => { handleTypeChange(e) }}>
                        <option value="acctype" disabled selected>Select Account type</option>
                        <option value="SAVINGS">SAVINGS</option>
                        <option value="CURRENT">CURRENT</option>
                        <option value="LOAN">LOAN</option>
                        <option value="SALARY">SALARY</option>
                    </Form.Select>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" required onChange={(e) => { handlePinChange(e) }}>
                    <Form.Label>Pin</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" onClick={(e) => { handleSubmit(e) }}>
                    Create Account
                </Button>
            </Form>
        </div >
    )
}
export default Accounts