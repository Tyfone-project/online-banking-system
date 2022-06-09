import axios from "axios";
import { Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DisplayAllAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [userAccountNumber, setUserAccountNumber] = useState("");
  const handleShow = (accountNumber) => {
    setUserAccountNumber(accountNumber);
    setShow(true);
  }

  const [accountPin, setAccountPin] = useState("");
  const [accountPinErr, setAccountPinErr] = useState("");
  let navigate = useNavigate();

  let handleAccountPin = (event) => {
    setAccountPin(event.target.value);
    if (accountPinErr !== null || accountPinErr !== "") {
      setAccountPinErr("");
    }
  }

  let validation = () => {
    let flag = true;

    if (accountPin === null || accountPin === "") {
      setAccountPinErr("This Field is Mandatory");
      flag = false;
    }

    if (flag) {
      return true;
    }
  };


  const onAccountLogin = (accountNumber, pin) => {

    event.preventDefault();
    let accountLoginObject = {
      accountNumber,
      pin
    }
    window.sessionStorage.setItem("accountNumberInSession", accountNumber);
    console.log(accountLoginObject);

    if (validation()) {
      setAccountPinErr("");
      // let accno = window.sessionStorage.getItem("accountNumberInSession");
      // console.log(accno);
      axios.post("http://localhost:8080/api/user/logintoaccount", (accountLoginObject),
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
          },
        }).then(response => {
          console.log(response);
          navigate("/account");
        }).catch(error => {
          console.log(error);
          setAccountPinErr(error.response.data);
        });

    }
  }

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
          <tr style={{ height: "75px" }}>
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
                  <Button onClick={() => handleShow(acc.accountNo)}>Click here to continue</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div className="card mx-auto shadow" style={{ width: "45%", marginTop: "10%" }}>
        <div className="row g-0 d-flex flex-wrap align-items-center">

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center">Account Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <div className=" d-flex justify-content-center">
                <input
                  type="text"
                  name="userAccountNumber"
                  disabled
                  value={userAccountNumber}
                />
              </div>
              <br />
              <div className=" d-flex justify-content-center">
                <input
                  type="password"
                  name="accountPin"
                  placeholder="Enter 4 digit PIN"
                  onChange={handleAccountPin}
                  value={accountPin}
                  maxLength="4"
                />

              </div> */}


              <Form className=" d-flex justify-content-center">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  {/* <Form.Label>Account Number</Form.Label> */}
                  <Form.Control
                    type="text"
                    name="userAccountNumber"
                    disabled
                    value={userAccountNumber}
                  />
                </Form.Group>
                &nbsp;
                &nbsp;
                &nbsp;
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  {/* <Form.Label>PIN</Form.Label> */}
                  <Form.Control
                    type="password"
                    name="accountPin"
                    placeholder="Enter 4 digit PIN"
                    onChange={handleAccountPin}
                    value={accountPin}
                    maxLength="4"
                  />
                </Form.Group>
                {/* <Button variant="primary" type="submit" className="w-100 m-0">
                  Sign in
                </Button> */}
                
              </Form>

              <div className=" d-flex justify-content-center">
                  <span className="text-danger">{accountPinErr}</span>
                </div>

              <div className=" d-flex justify-content-center">
                {/* <div>{accountPin}</div> */}
                <div>
                  <div>
                    <button onClick={() => setAccountPin((accountPin) => `${accountPin}1`)} style={{ width: "120px" }}>1</button>
                    <button onClick={() => setAccountPin((accountPin) => `${accountPin}2`)} style={{ width: "120px" }}>2</button>
                    <button onClick={() => setAccountPin((accountPin) => `${accountPin}3`)} style={{ width: "120px" }}>3</button>
                  </div>
                  <div>
                    <button onClick={() => setAccountPin((accountPin) => `${accountPin}4`)} style={{ width: "120px" }}>4</button>
                    <button onClick={() => setAccountPin((piaccountPinn) => `${accountPin}5`)} style={{ width: "120px" }}>5</button>
                    <button onClick={() => setAccountPin((accountPin) => `${accountPin}6`)} style={{ width: "120px" }}>6</button>
                  </div>
                  <div>
                    <button onClick={() => setAccountPin((accountPin) => `${accountPin}7`)} style={{ width: "120px" }}>7</button>
                    <button onClick={() => setAccountPin((accountPin) => `${accountPin}8`)} style={{ width: "120px" }}>8</button>
                    <button onClick={() => setAccountPin((accountPin) => `${accountPin}9`)} style={{ width: "120px" }}>9</button>
                  </div>
                  <div>
                    <button onClick={() => setAccountPin((accountPin) => accountPin.slice(0, accountPin.length - 1))} style={{ width: "120px" }}>
                      &lt;
                    </button>
                    <button onClick={() => setAccountPin((accountPin) => `${accountPin}0`)} style={{ width: "120px" }}>0</button>
                    <button onClick={() => setAccountPin("")} style={{ width: "120px" }}>C</button>
                  </div>
                </div>
              </div>

            </Modal.Body>
            <Modal.Footer className=" d-flex justify-content-center">
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="success" onClick={() => onAccountLogin(userAccountNumber, accountPin)}>
                Login
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default DisplayAllAccounts;
