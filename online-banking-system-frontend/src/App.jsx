import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Landing from "./components/Landing";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import TransferFunds from "./components/TransferFunds";
// import TransactionReport from "./components/TransactionReport";
import Dashboard from "./components/Dashboard";
import ConfirmPin from "./components/ConfirmPin";
import DisplayAllAccounts from "./components/DisplayAllAccounts";
import DisplayAccounts from "./components/DisplayAccounts";
import AccountHome from "./components/AccountHome";
import Treport from "./components/Treport";
import DisplayAccounts from "./components/DisplayAccounts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/customer" element={<DisplayAccounts />}>
        <Route path="confirmPin" element={<ConfirmPin />} />
      </Route>
      <Route path="/account" element={<Dashboard/>}>
      <Route index element={<AccountHome />} />
        <Route path="transferfunds" element={<TransferFunds />} />
        {/* <Route path="transactionslist" element={<TransactionReport />} /> */}
        <Route path="transactionslist" element={<Treport/>} />
      </Route>
      {/* <Route path="/treport" element={<Treport/>}></Route> */}
    </Routes>
  );
}

export default App;
