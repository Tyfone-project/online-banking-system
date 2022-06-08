import { Card, Form, Container, Button } from 'react-bootstrap'
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
function ConfirmPin() {

    const [pin, setPin] = useState("");
    const [message, setMessage] = useState("");
    const [accountNo, setAccountNo]=useState(sessionStorage.getItem("accountNo"));

    console.log(pin);
    console.log(accountNo);
    const confirmPin = useFormik({
        initialValues: { pin: "" },
        validationSchema: Yup.object({
            password: Yup.string().required("Please enter the pin")
        }),
        onSubmit: (values) => {
            axios.post("http://localhost:8080/api/accounts/confirmPin", {
                password: confirmPin.values.pin,
                accountNo:confirmPin.values.accountNo
            }).then((res) => {
                console.log(res.data);
                setMessage(res.data);
                console.log("password",password);
                console.log("accountNo",accountNo);
            }).catch(err => console.log(err));
        }
    });
    return (
        <>
            <div className="card mx-auto shadow" style={{ width: "45%", marginTop: "10%" }}>
                <div className="row g-0 d-flex flex-wrap align-items-center">
                    <div className="card-body">
                        <h3 className="card-title text-center fw-bolder">Please Confirm Your account Pin</h3>
                        <hr />
                    </div>
                    <Form onSubmit={confirmPin.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicPassword" style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                            <Form.Label>Account Pin</Form.Label>
                            <Form.Control type="password"
                                name="pin"
                                onChange={confirmPin.handleChange}
                                onBlur={confirmPin.handleBlur}
                                value={confirmPin.values.pin}
                            />
                            {confirmPin.touched.pin && confirmPin.errors.pin && (
                                <span className="text-danger">
                                    <small>{confirmPin.errors.pin}</small>
                                </span>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" style={{ paddingLeft: "25%", paddingRight: "25%" }}>
                            <Button variant="primary" type="submit" className="w-100" size="lg">
                                Confirm
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
                <div style={{ textAlign: 'center' }}>
                    {message.valueOf() == "Invalid Pin" ? <h3 className="text-danger">Invalid Pin</h3> : <h3 className="text-success">{message}</h3>}
                </div>
            </div>
        </>
    );
}
export default ConfirmPin