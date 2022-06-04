import React from 'react';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import 'regenerator-runtime/runtime'
import { Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
} 
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}
function Table({ columns, data }) {
    const defaultColumn = React.useMemo(
        () => ({
           
            Filter: DefaultColumnFilter,
        }),
        []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter
    )
    return (
        <div>
            {<GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />}
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
            
        </div>
    )
}

function DisplayAllAccounts() {

    const [data, setData] = useState([]);
    const dataRef = useRef();
    dataRef.current = data;
    var custId=sessionStorage.getItem("customerId");

    useEffect(() => {

        axios.get('http://localhost:8080/accounts/'+custId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenId")
            },

        })
            .then((res) => {
                console.log('res ', res.data);
                setData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    console.log('data', data);

    var data1 = data.map(x => ({
        accountNo: x["accountNo"],
        accountType: x["accountType"],
        balance: x["balance"],
    }))
    console.log('data1', data1);

    const GetDetails = (rowIndex) => {
        const id = dataRef.current[rowIndex];
        console.log(id.id)

       navigate("/accounts/confirmPin" + id.id)
    };

    const columns = React.useMemo(
        () => [

            {
                Header: 'Account Details',
                columns: [
                    {
                        Header: 'Account No',
                        accessor: 'accountNo',

                    },
                    {
                        Header: 'Account Type',
                        accessor: 'accountType'
                    },

                    {
                        Header: 'Account Balance',
                        accessor: 'balance'
                    },
                    {
                        Header: 'Action',
                        accessor: 'action',
                        Cell: (props) => {
                            const rowIdx = props.row.id;
                            return (
                                <div >
                                    <span >
                                        <button className="btn btn-info" onClick={() => GetDetails(rowIdx)}>
                                            Click here to proceed
                                        </button>
                                    </span>
                                    &nbsp;
                                    
                                </div>
                            );
                        },

                    },
                ],
            },
        ],
        []
    )
    const navigate = useNavigate();
    const createAccount=(e)=>{
        e.preventDefault();
        navigate('/addAccount');
    }

    return (
        <div>

        <Table columns={columns} data={data1} />
        <Button variant="primary" type="submit" className="w-100" onClick={(e)=> createAccount(e)}>
        Add New Account
      </Button>
     
      </div>
    )
}
export default DisplayAllAccounts;