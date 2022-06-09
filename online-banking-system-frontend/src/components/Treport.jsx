import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';





function Treport() {


    const [transactionList, setTransactionList] = useState([]);


    var accountNumber = window.sessionStorage.getItem("accountNumberInSession");
    const method1 = () => {
        axios.get("http://localhost:8080/api/accounts/transactionslist/" + accountNumber, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
            },
        }).then((response) => {
            setTransactionList(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        method1();
    }, []);


    const columns = [
        {
            name: 'Transaction ID',
            selector: (row) => row.transactionId,
        },
        {
            name: 'Amount',
            selector: (row) => row.amount,
        },
        {
            name: 'Transaction Date',
            selector: (row) => row.date,
        },
        {
            name: 'Receiver Account Number',
            selector: (row) => row.transactionTo,
        },
        {
            name: 'Transaction Status',
            selector: (row) => row.transactionStatus,
        },
    ];


    return (
        <>
            <div className="card mx-auto shadow" style={{ width: "85%", marginTop: "1%" }}>
                <div className="row g-0 d-flex flex-wrap align-items-center">
                    <div className="card-body">
                        <h1 className="card-title display-4 text-center fw-bolder">Transaction Report</h1>
                        <hr />
                    </div>
                    <DataTable
                        columns={columns}
                        data={transactionList}
                        direction="auto"
                        fixedHeaderScrollHeight="300px"
                        pagination
                        responsive
                        subHeaderAlign="right"
                        subHeaderWrap
                    />
                </div>
            </div>
        </>
    );
};

export default Treport;