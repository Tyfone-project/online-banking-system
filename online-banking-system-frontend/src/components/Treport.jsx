import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';

var formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

function Treport() {


    const [transactionList, setTransactionList] = useState([]);


    // var accountNumber = window.sessionStorage.getItem("accountNumberInSession");
    const method1 = () => {
        const accountNumber = jwtDecode(sessionStorage.getItem("accountNo")).sub;

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
            sortable: true,
        },
        {
            name: 'Amount',
            selector: (row) => row.amount,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.transactionFrom==jwtDecode(sessionStorage.getItem("accountNo")).sub,
                    style: {
                        color: 'red',
                    }
                },
                {
                    when: row => row.transactionTo==jwtDecode(sessionStorage.getItem("accountNo")).sub,
                    style: {
                        color: 'green',
                    }
                },
            ]
        },
        {
            name: 'Transaction Date',
            selector: (row) => row.date,
            sortable: true,
        },
        {
            name: 'Receiver Account Number',
            selector: (row) => row.transactionTo,
            sortable: true,
        },
        {
            name: 'Sender Account Number',
            selector: (row) => row.transactionFrom,
            sortable: true,
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
                        selectableRows
                    />
                </div>
            </div>
        </>
    );
};

export default Treport;