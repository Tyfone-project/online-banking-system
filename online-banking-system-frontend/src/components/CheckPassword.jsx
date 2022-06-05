import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom'
import { Form, Button } from "react-bootstrap"
import { useState } from "react";
function CheckPassword() {
    const [message, setMessage] = useState("");
    const checkPassword = useFormik({
        initialValues: {
            userId: "",
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Password is required"),
        }),
        onSubmit: (values) => {
            axios.post("http://localhost:8080/checkPassword", {
                userId: checkPassword.values.userId,
                password: checkPassword.values.password,
            }).then((res) => {
                console.log(res)
                setMessage(res.data);
            }).catch(res => console.log(res))
        },
    });
    return (
        <div className="card mx-auto shadow" style={{ width: "45%", marginTop: "5%" }}>
            <div className="row g-0 d-flex flex-wrap align-items-center">
                <div className="card-body">
                    <h1 className="card-title display-4 text-center fw-bolder">Please Confirm Your Identity</h1>
                    <hr />
                    <Form onSubmit={checkPassword.handleSubmit} >
                        <Form.Group className="mb-3" style={{ paddingLeft: "25%", paddingRight: "25%" }}>
                            <Form.Label>Customer ID</Form.Label>
                            <Form.Control name="userId"
                                type="text"
                                placeholder="Enter Customer Id"
                                value={checkPassword.values.userId}
                                onChange={checkPassword.handleChange}
                                onBlur={checkPassword.handleBlur}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" style={{ paddingLeft: "25%", paddingRight: "25%" }}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password"
                                type="password"
                                placeholder="Enter Password"
                                value={checkPassword.values.password}
                                onChange={checkPassword.handleChange}
                                onBlur={checkPassword.handleBlur}
                            />
                            {checkPassword.touched.password && checkPassword.errors.password && (
                                <span className="text-danger">
                                    <small>{checkPassword.errors.password}</small>
                                </span>
                            )}
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mb-3" style={{marginLeft:"38%"}} size="lg">
                            Check Balance
                        </Button>
                    </Form>
                    {message.includes("Invalid Password") ? <h3 className="text-danger" style={{ textAlign: 'center' }}>{message}</h3> : <h3 className="text-success" style={{ textAlign: 'center' }}>{message}</h3>}
                </div>
            </div>
        </div>
    );
}
export default CheckPassword;
