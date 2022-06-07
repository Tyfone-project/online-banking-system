import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./components/Landing";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import TransferFunds from "./components/TransferFunds";
import TransactionReport from "./components/TransactionReport";
import DisplayAllAccounts from "./components/DisplayAllAccounts";
import Accounts from "./components/Accounts";
import Dashboard from "./components/Dashboard";
import CheckPassword from "./components/CheckPassword";
import ConfirmPin from "./components/ConfirmPin"
import DisplayAccounts from "./components/DisplayAccounts";

function App() {

  return (
    
    <Routes>

      <Route path="/" element={<Landing />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
<<<<<<< HEAD
      <Route path="/customer" element={<Dashboard />}>
        <Route path="accounts/transferfunds" element={<TransferFunds />} />
        <Route path="accounts/transactionslist" element={<TransactionReport />} />
=======
      <Route path="/customer" element={<DisplayAccounts />}>
        <Route path="account/transferfunds" element={<TransferFunds />} />
        <Route path="account/transactionslist" element={<TransactionReport />} />
>>>>>>> snehil
        <Route path="addAccount" element={<Accounts />} />
        <Route path="accounts" element={<DisplayAllAccounts />} />
      </Route>

      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/checkPassword" element={<CheckPassword/>}/>
      <Route path="/customer/confirmPin" element={<ConfirmPin/>}/>

    </Routes>
  );
}

export default App;