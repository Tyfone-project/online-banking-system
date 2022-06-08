import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Landing from "./components/Landing";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import TransferFunds from "./components/TransferFunds";
import TransactionReport from "./components/TransactionReport";
import Accounts from "./components/Accounts";
import Dashboard from "./components/Dashboard";
import ConfirmPin from "./components/ConfirmPin";
import DisplayAccounts from "./components/DisplayAccounts";
import AccountHome from "./components/AccountHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/customer" element={<DisplayAccounts />}/>
        <Route path="addAccount" element={<Accounts />} />  
        <Route path="confirmPin" element={<ConfirmPin />} />

      

      <Route path="/account" element={<Dashboard />}>
        <Route index element={<AccountHome />} />
        <Route path="transferfunds" element={<TransferFunds />} />
        <Route path="transactionslist" element={<TransactionReport />} />
      </Route>
    </Routes>
  );
}

export default App;
