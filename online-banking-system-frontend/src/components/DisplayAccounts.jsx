import axios from "axios";
import { Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function DisplayAccounts() {

  const [accounts, setAccounts] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [pin, setPin] = useState("");
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);


  const [userAccountNumber, setUserAccountNumber] = useState("");
  const handleShow = (accountNumber) => {
    setUserAccountNumber(accountNumber);
    setShow(true);
  };

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
    let accountLoginObject = {
      accountNumber,
      pin,
    };

    if (validation()) {
      setAccountPinErr("");
      axios
        .post(
          "http://localhost:8080/api/user/logintoaccount",
          accountLoginObject,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
            },
          }
        )
        .then((response) => {
          sessionStorage.setItem("accountNo", response.data.tokenId);
          navigate("/account");
        })
        .catch((error) => {
          toast.error("Account Login Denied");
          console.log(error);
          setAccountPinErr(error.response.data);
        });
    };
  }

  useEffect(() => {
    const token = sessionStorage.getItem("tokenId");
    if (token) {
      if (jwtDecode(token).exp < Date.now() / 1000) navigate("/login");
    } else navigate("/login");
  });

  const fetchAccounts = () => {
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
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleCreateAccount = (e) => {
    e.preventDefault();
    axios.post(
      "http://localhost:8080/api/accounts/addAccount",
      { accountType, pin },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
        },
      }
    );
    { notify6() }
    window.location.reload();
    handleClose2();
  };

  const Greeting = () => {
    var welcomeText = "";
    var welcomeType = ["Good morning", "Good afternoon", "Good evening"];
    var hour = new Date().getHours();
    if (hour < 12)
      welcomeText = welcomeType[0];
    else if (hour < 18)
      welcomeText = welcomeType[1];
    else
      welcomeText = welcomeType[2];

    return welcomeText;
  }


  return (
    <>
      <div
        className="card mx-auto shadow my-4"
        style={{ width: "85%", marginTop: "1%" }}
      >
        <div className="d-flex justify-content-between">
          <div className="pl-5 display-5 mx-5 my-3">
            <img
              src={`data:image/jpeg;base64,${image}`}
              alt=""
              height={"100px"}
              width={"100px"}
              className="rounded-circle"
            />
            &nbsp;&nbsp; Hello {name}, {<Greeting />}!
          </div>
          <Button
            className="my-auto"
            variant="danger"
            size="lg"
            onClick={() => {
              
              sessionStorage.clear();
              navigate("/login");
              toast.error("Customer LogOut Successful");
            }}
          >
            Log Out
          </Button>
        </div>
      </div>
      <Table className="table align-middle mb-0 bg-white table-striped w-50 mx-auto shadow">
        <thead className="thead-dark">
          <tr style={{ height: "75px" }}>
            <th scope="col" className="align-middle">
              Account No
            </th>
            <th scope="col" className="align-middle">
              Account Type
            </th>
            <th
              scope="col"
              className="text-end align-middle"
              style={{ paddingRight: "8%" }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {accounts.length > 0 &&
            accounts.map((acc) => (
              <tr>
                <td className="align-middle fs-4">{acc.accountNo}</td>
                <td className="align-middle fs-4">{acc.accountType}</td>
                <td className="text-end">
                  <Button onClick={() => handleShow(acc.accountNo)}>
                    Click here to continue
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Account Login Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Account Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className=" d-flex justify-content-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
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
              <Form.Control
                type="password"
                name="accountPin"
                placeholder="Enter 4 digit PIN"
                onChange={handleAccountPin}
                value={accountPin}
                maxLength="4"
              />
            </Form.Group>

          </Form>

          <div className=" d-flex justify-content-center">
            <span className="text-danger">{accountPinErr}</span>
          </div>

          <div className=" d-flex justify-content-center">
            <div>
              <div>
                <button onClick={() => setAccountPin((accountPin) => `${accountPin}1`)} style={{ width: "120px" }}>1</button>
                <button onClick={() => setAccountPin((accountPin) => `${accountPin}2`)} style={{ width: "120px" }}>2</button>
                <button onClick={() => setAccountPin((accountPin) => `${accountPin}3`)} style={{ width: "120px" }}>3</button>
              </div>
              <div>
                <button onClick={() => setAccountPin((accountPin) => `${accountPin}4`)} style={{ width: "120px" }}>4</button>
                <button onClick={() => setAccountPin((accountPin) => `${accountPin}5`)} style={{ width: "120px" }}>5</button>
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
          <Button
            variant="success"
            onClick={() => onAccountLogin(userAccountNumber, accountPin)}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={() => setShow2(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateAccount}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Account Type</Form.Label>
              <Form.Select
                required
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option disabled value="">
                  Select a account type
                </option>
                <option value="SAVINGS">SAVINGS</option>
                <option value="CURRENT">CURRENT</option>
                <option value="SALARY">SALARY</option>
                <option value="LOAN">LOAN</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Pin</Form.Label>
              <Form.Control
                type="password"
                name="pin"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex">
              <Button variant="danger" onClick={() => setShow2(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="">
                Create Account
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="d-flex justify-content-center">
        <Button onClick={() => setShow2(true)}>Add Account</Button>
      </div>

      <ToastContainer/>
    </>
  );
}

export default DisplayAccounts;
