import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./components/Landing";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";

import Dashboard from "./components/Dashboard";
import CheckPassword from "./components/CheckPassword";
import DisplayAllAccounts from "./components/DisplayAllAccounts";
import Accounts from "./components/Accounts";

function App() {

  return (
    
    <Routes>
      <Route path="/" element={<Landing/>}>
        <Route index element={<Login/>} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<Signup/>} />
        <Route path="/customer/addAccount" element={<Accounts/>}/>
      </Route>
      <Route path="/customer/accounts" element={<DisplayAllAccounts/>}/>
      
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/checkPassword" element={<CheckPassword/>}/>
      

    </Routes>
  );
}

export default App;