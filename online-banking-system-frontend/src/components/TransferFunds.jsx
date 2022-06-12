import axios from "axios";
import { useFormik } from "formik";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import moneytransfer from "../images/moneytransfer.jpg";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function TransferFunds() {

    const userAccountDetails = useFormik({
        initialValues: {
            senderAccountNumber: "",
            receiverAccountNumber: "",
            dateOfTransaction: new Date().toISOString().split('T')[0],
            amountToTransfer: "",
        },
        validationSchema: Yup.object({
            receiverAccountNumber: Yup.string()
                .notOneOf([jwtDecode(sessionStorage.getItem("accountNo")).sub,null], "Cannot Transfer Money To Same Account!!!")
                .max(16, "Cannot exceed 16 digits")
                .required("Receiver account number is required"),
            amountToTransfer: Yup.number()
                .min(1, "Cannot be less than One")
                .max(40000, "Cannot be more than Forty-thousand")
                .required("Amount is required"),
        }),
        onSubmit: (values,{resetForm}) => {
            axios.post("http://localhost:8080/api/accounts/transferfunds", {
                senderAccountNumber: accountNumber,
                receiverAccountNumber: userAccountDetails.values.receiverAccountNumber,
                amountToTransfer: userAccountDetails.values.amountToTransfer,
                dateOfTransaction: userAccountDetails.values.dateOfTransaction

            },
                {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
                    },
                }
            ).then(res => {
                console.log(res.data);
                toast.success("Successfully Transferred");
                resetForm();
            }).catch(err => {
                console.log(err);
            });
        },
    });

    var accountNumber = jwtDecode(sessionStorage.getItem("accountNo")).sub;
    console.log(accountNumber);
    return (
        <>

            <div className="card mx-auto shadow" style={{ width: "45%", marginTop: "10%" }}>
                <div className="row g-0 d-flex flex-wrap align-items-center">
                    <div className="card-body">
                        <h1 className="card-title display-4 text-center fw-bolder">Transfer Funds</h1>
                        <hr />
                    </div>

                    <Form onSubmit={userAccountDetails.handleSubmit}>

                        <Form.Group className="mb-3" style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                            <Form.Control
                                name="senderAccountNumber"
                                type="text"
                                // placeholder="Enter Sender Account Number"
                                disabled
                                // value={userAccountDetails.values.senderAccountNumber}
                                value={accountNumber}
                                onChange={userAccountDetails.handleChange}
                                onBlur={userAccountDetails.handleBlur}
                            />
                            {/* {userAccountDetails.touched.senderAccountNumber && userAccountDetails.errors.senderAccountNumber && (
                                <span className="text-danger">
                                    <small>{userAccountDetails.errors.senderAccountNumber}</small>
                                </span>
                            )} */}
                        </Form.Group>

                        <Form.Group className="mb-3" style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                            <Form.Control
                                name="receiverAccountNumber"
                                type="text"
                                placeholder="Enter Receiver Account Number"
                                value={userAccountDetails.values.receiverAccountNumber}
                                onChange={userAccountDetails.handleChange}
                                onBlur={userAccountDetails.handleBlur}
                            />
                            {userAccountDetails.touched.receiverAccountNumber && userAccountDetails.errors.receiverAccountNumber && (
                                <span className="text-danger">
                                    <small>{userAccountDetails.errors.receiverAccountNumber}</small>
                                </span>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                            <Form.Control
                                name="dateOfTransaction"
                                type="date"
                                placeholder="Enter Date Of Transaction"
                                disabled
                                // value={userAccountDetails.values.dateOfTransaction}
                                value={new Date().toISOString().split('T')[0]}
                                onChange={userAccountDetails.handleChange}
                                onBlur={userAccountDetails.handleBlur}
                            />
                            {userAccountDetails.touched.dateOfTransaction && userAccountDetails.errors.dateOfTransaction && (
                                <span className="text-danger">
                                    <small>{userAccountDetails.errors.dateOfTransaction}</small>
                                </span>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                            <Form.Control
                                name="amountToTransfer"
                                type="text"
                                placeholder="Enter Transfer Amount"
                                value={userAccountDetails.values.amountToTransfer}
                                onChange={userAccountDetails.handleChange}
                                onBlur={userAccountDetails.handleBlur}
                            />
                            {userAccountDetails.touched.amountToTransfer && userAccountDetails.errors.amountToTransfer && (
                                <span className="text-danger">
                                    <small>{userAccountDetails.errors.amountToTransfer}</small>
                                </span>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" style={{ paddingLeft: "25%", paddingRight: "25%" }}>
                            <Button variant="primary" type="submit" className="w-100" size="lg">
                                Transfer Funds
                            </Button>
                        </Form.Group>
                    </Form>

                </div>
                <ToastContainer />

            </div>


        </>
    );

}
export default TransferFunds;