import { Card, Form, Container, Button } from 'react-bootstrap'
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
function CheckPassword() {
    // const [checkBalance, setCheckBalance] = useState(false);
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    // const [invalidPassword, setInvalidPassword] = useState("");
    const [message, setMessage] = useState("");
    let balance;
    console.log(userId + password);
    const checkPassword = useFormik({
        initialValues: { userId: "", password: "" },
        validationSchema: Yup.object({
            password: Yup.string().required("Please Enter the Password")
        }),
        onSubmit: () => {
            axios.post("http://localhost:8080/checkPassword",{
                userId: checkPassword.values.userId,
                password: checkPassword.values.password
            }).then((res)=>{
                console.log(res.data);
                setMessage(res.data);
            }).catch(err=>console.log(err));
        }
    });
    return (
        <>
            <div className="card mx-auto shadow" style={{ width: "45%", marginTop: "10%" }}>
                <div className="row g-0 d-flex flex-wrap align-items-center">
                    <div className="card-body">
                        <h3 className="card-title text-center fw-bolder">Please Confirm Your identity</h3>
                        <hr />
                    </div>
                    <Form onSubmit={checkPassword.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail" style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                            <Form.Label>Customer ID</Form.Label>
                            <Form.Control type="text" 
                            name = "userId" 
                            onChange ={checkPassword.handleChange}
                            onBlur={checkPassword.handleBlur}
                            value = {checkPassword.values.userId}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword" style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" 
                            name = "password" 
                            onChange ={checkPassword.handleChange}
                            onBlur={checkPassword.handleBlur}
                            value = {checkPassword.values.password}
                            />
                            {checkPassword.touched.password && checkPassword.errors.password &&(
                                <span className="text-danger">
                                    <small>{checkPassword.errors.password}</small>
                                </span>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" style={{ paddingLeft: "25%", paddingRight: "25%" }}>
                            <Button variant="primary" type="submit" className="w-100" size="lg">
                                Check Balance
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
                <div style={{textAlign:'center'}}>
                    {message.valueOf() == "Invalid Password"? <h3 className="text-danger">Invalid Password</h3> : <h3 className="text-success">{message}</h3>}
                </div>
            </div>
        </> 
    );
}
export default CheckPassword