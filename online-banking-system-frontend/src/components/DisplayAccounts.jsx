import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

function DisplayAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/accounts", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
        },
      })
      .then((res) => {
        console.log(res);
        setAccounts(res.data.accounts);
        setImage(res.data.profilePicture);
        setName(res.data.name);
      });
  }, []);

  return (
    <>
      <div
        className="card mx-auto shadow my-4"
        style={{ width: "85%", marginTop: "1%" }}
      >
        <div className="row g-0 d-flex flex-wrap align-items-center">
          <div className="card-body d-flex justify-content-center">
            <h2 className="card-title display-4 text-center fw-semibold">
              Welcome, {name}
            </h2>
            <img
          src={"data:image/png;base64," + image}
          height={80}
          width={80}
          className="rounded-circle mx-3"
        />
            <hr />
          </div>
        </div>
      </div>
      <Table className="table align-middle mb-0 bg-white table-striped w-50 mx-auto">
        <thead className="thead-dark">
          <tr style={{height:"75px"}}>
            <th scope="col" className="align-middle">Account No</th>
            <th scope="col" className="align-middle">Account Type</th>
            <th scope="col" className="text-end align-middle" style={{ paddingRight: "8%" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {accounts.length > 0 &&
            accounts.map((acc) => (
              <tr>
                <td>{acc.accountNo}</td>
                <td>{acc.accountType}</td>
                <td className="text-end">
                  <Button>Click here to continue</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default DisplayAccounts;
