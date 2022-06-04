import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./components/Landing";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import DisplayAllAccounts from "./components/DisplayAllAccounts";
import Accounts from "./components/Accounts";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing/>}>
        <Route index element={<Login/>} />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<Signup/>} />
        
        <Route path="addAccount" element={<Accounts/>}/>

      </Route>
      <Route path="accounts/:customerId" element={<DisplayAllAccounts/>}/>
    </Routes>
  );
}

export default App;
