import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from 'react-data-table-component';


function Treport() {

    var formatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    });


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

    const handleReport = () => {
        const accountNumber = jwtDecode(sessionStorage.getItem("accountNo")).sub;
        axios({
            url: "http://localhost:8080/api/accounts/report/" + accountNumber, //your url
            method: 'GET',
            responseType: 'blob',
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("tokenId")
            } // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'TransactionReport.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }


    const columns = [
        {
            name: 'Transaction ID',
            selector: (row) => row.transactionId,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: (row) => formatter.format(row.amount),
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => (row.transactionFrom == jwtDecode(sessionStorage.getItem("accountNo")).sub),
                    style: {
                        color: 'red'
                    }
                },
                {
                    when: row => (row.transactionTo == jwtDecode(sessionStorage.getItem("accountNo")).sub),
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
            conditionalCellStyles: [                
                {
                    when: row => (row.transactionStatus == "SUCCESS"),
                    style: {
                        color: 'green',
                        fontWeight: 'bold'
                    }
                },
            ]
         
        },
    ];



    return (
        <>
            <div className="card mx-auto shadow" style={{ width: "85%", marginTop: "3%", marginBottom: "3%" }}>
                <div className="row g-0 d-flex flex-wrap align-items-center">
                    <div className="card-body">
                        <h1 className="card-title display-4 text-center fw-bolder">Transaction Report
                        </h1>
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
                <div className="d-flex justify-content-end">
                    <Button onClick={() => handleReport()} size="sm">
                        Download Report
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Treport;