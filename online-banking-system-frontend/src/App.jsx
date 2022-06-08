import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Landing from "./components/Landing";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import TransferFunds from "./components/TransferFunds";
import TransactionReport from "./components/TransactionReport";
import Accounts from "./components/Accounts";
import DisplayAllAccounts from "./components/DisplayAllAccounts";
import Dashboard from './components/Dashboard';
import AccountHome from "./components/AccountHome";
import ConfirmPin from "./components/ConfirmPin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="customer/addAccount" element={<Accounts />} />
      </Route>
      <Route path="/customer/accounts" element={<DisplayAllAccounts />} />
      <Route path="/customer/confirmPin" element={<ConfirmPin />} />

      <Route path="/account" element={<Dashboard />}>
        <Route index element={<AccountHome />} />
        <Route path="transferfunds" element={<TransferFunds />} />
        <Route path="transactionslist" element={<TransactionReport />} />
      </Route>

      <Route path="/dashboard" element={<Dashboard />} />



    </Routes>
  );
}

export default App;
