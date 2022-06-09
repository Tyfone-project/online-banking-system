import axios from "axios";
import { useFormik } from "formik";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";

function TransactionReport() {

    const [transactionList, setTransactionList] = useState([]);

    // let method1 = () => {
    //     AdminService.getAllUserList().then((response) => {
    //         setUserList(response.data);
    //     }).catch((error) => {
    //         console.log("found error", error);
    //     })
    // }

    
<<<<<<< HEAD
    // let method1 = () => {
    //     axios.get("http://localhost:8080/api/accounts/transactionslist/120000000001",{
    //         headers: {
    //           Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
    //         },
    //       }).then((response) => {
    //         setTransactionList(response.data);
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // }

    // useEffect(() => {
    //     method1();
    // }, []);

    let generateReport=()=>{
        axios.get("http://localhost:8080/api/accounts/report/120000000001",{
=======
    let method1 = () => {
        const accountNumber = jwtDecode(sessionStorage.getItem("accountNo")).sub;
        axios.get("http://localhost:8080/api/accounts/transactionslist/"+accountNumber,{
>>>>>>> shivam
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
              },
        }).then((response) => {
            setTransactionList(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <>

            <div className="card mx-auto shadow" style={{ width: "85%", marginTop: "1%" }}>
                <div className="row g-0 d-flex flex-wrap align-items-center">
                    <div className="card-body">
                        <h1 className="card-title display-4 text-center fw-bolder">Transaction Report</h1>
                        <hr />
                    </div>
                    <Table className="table align-middle mb-0 bg-white table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Transaction ID</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Transaction Date</th>
                                <th scope="col">Receiver Account Number</th>
                                <th scope="col">Sender Account Number</th>
                                <th scope="col">Transaction Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionList.map((value, key) => {
                                return (
                                    <tr>
                                        <td>{value.transactionId}</td>
                                        <td>{value.amount}</td>
                                        <td>{value.date}</td>
                                        <td>{value.transactionTo}</td>
                                        <td>{value.transactionFrom}</td>
                                        <td style={{ color: "green", fontWeight: "bold" }}>{value.transactionStatus}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <div>
                        <input type="button" value="Download Report" onClick={()=>generateReport()}/>
                    </div>
                </div>
            </div>
        </>
    );
}
export default TransactionReport;