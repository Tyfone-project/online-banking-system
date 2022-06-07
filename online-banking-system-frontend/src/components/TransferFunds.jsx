import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import moneytransfer from "../images/moneytransfer.jpg";

function TransferFunds() {

    const userAccountDetails = useFormik({
        initialValues: {
            senderAccountNumber: "",
            receiverAccountNumber: "",
            dateOfTransaction: "",
            amountToTransfer: "",
        },
        validationSchema: Yup.object({
            senderAccountNumber: Yup.string()
                .max(16, "Cannot exceed 16 digits")
                .required("Sender account number is required"),
            receiverAccountNumber: Yup.string()
                .max(16, "Cannot exceed 16 digits")
                .required("Receiver account number is required"),
            dateOfTransaction: Yup.date()
                .required("DOB is required"),
            amountToTransfer: Yup.string()
                .max(40000, "Cannot be more than Forty-thousand")
                .required("Amount is required"),
        }),
        onSubmit: () => {
            axios.post("http://localhost:8080/api/accounts/transferfunds", {
                senderAccountNumber: userAccountDetails.values.senderAccountNumber,
                receiverAccountNumber: userAccountDetails.values.receiverAccountNumber,
                amountToTransfer: userAccountDetails.values.amountToTransfer,
                dateOfTransaction: userAccountDetails.values.dateOfTransaction

            },
                {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
                    },
                }
            ).then(res => console.log(res.data)).catch(err => console.log(err));
        },
    });

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
                                placeholder="Enter Sender Account Number"
                                value={userAccountDetails.values.senderAccountNumber}
                                onChange={userAccountDetails.handleChange}
                                onBlur={userAccountDetails.handleBlur}
                            />
                            {userAccountDetails.touched.senderAccountNumber && userAccountDetails.errors.senderAccountNumber && (
                                <span className="text-danger">
                                    <small>{userAccountDetails.errors.senderAccountNumber}</small>
                                </span>
                            )}
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
                                value={userAccountDetails.values.dateOfTransaction}
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

            </div>


        </>
    );

}
export default TransferFunds;