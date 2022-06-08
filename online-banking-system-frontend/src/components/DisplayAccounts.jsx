import axios from "axios";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DisplayAccounts() {
  
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

  let handleAccountPin = (event) => {
    setAccountPin(event.target.value);
  }

  const onAccountLogin = (accountNumber, pin) => {

    let accountLoginObject = {
      accountNumber,
      pin
    }
    window.sessionStorage.setItem("accountNumberInSession", accountNumber);
    console.log(accountLoginObject);

    // let accno = window.sessionStorage.getItem("accountNumberInSession");
    // console.log(accno);
    axios.post("http://localhost:8080/api/user/logintoaccount", (accountLoginObject),
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
        },
      }).then(response => console.log(response)).catch(error => console.log(error));
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

  const navigate = useNavigate();
  const createAccount = (e) => {
    e.preventDefault();
    navigate("/customer/addAccount");
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

  const DisplayMessage = () => {
    return <h3 className="text-center">You have no accounts to display, click on below button to add account!!</h3>
  }
  const Validate = () => {
    if (accounts.length > 0) {
      return <Table className="table align-middle text-center mb-0 bg-white table-striped w-50 mx-auto">
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
    }
    else {
      return <DisplayMessage />
    }
  }

  return (
    <>

      <div className="pl-5 display-6 font-weight-bold font-italic mx-5 my-3">
        <img src={`data:image/jpeg;base64,${image}`} alt="" height={"100px"} width={"100px"} />
        &nbsp;&nbsp; Hello {name},{<Greeting />}!
      </div>

      <Validate />

      {/* <div className="card mx-auto shadow" style={{ width: "45%", marginTop: "10%" }}>
        <div className="row g-0 d-flex flex-wrap align-items-center"> */}

      <div className="text-center">
        <Button
          variant="primary"
          type="submit"
          className="w-25"
          onClick={(e) => createAccount(e)}
        >
          Add New Account
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Account Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <input
            type="text"
            name="userAccountNumber"
            disabled
            value={userAccountNumber}
          />
          <br />
          <br />
          <input
            type="text"
            name="accountPin"
            placeholder="Enter 4 digit PIN"
            onChange={handleAccountPin}
            value={accountPin}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => onAccountLogin(userAccountNumber, accountPin)}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      {/* </div>
      </div> */}
    </>
  );
}

export default DisplayAccounts;
