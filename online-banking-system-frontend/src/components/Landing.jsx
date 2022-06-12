import React from "react";
import landing from "../images/landing.jpg";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import bank from "../images/bank.png";

import 'react-toastify/dist/ReactToastify.css';

function Landing() {
  return (
    <>
      <div className="d-flex" style={{ height: "100vh" }}>

        <div className="col-lg-4 col-md-6 col-12 bg-light">

          <div className="d-flex align-items-center h-100">

            <div className="w-100 p-4">


              <div className="card shadow mb-4" >
                <div className="row g-0 d-flex flex-wrap align-items-center">
                  <div className="card-body d-flex align-items-center justify-content-around">
                    <img src={bank} />
                    <h4 className="card-title text-center fw-bolder text-muted" style={{fontFamily:"fantasy",fontSize:"32px"}}>
                      ONLINE BANKING SYSTEM
                    </h4>
                  </div>
                </div>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
        <div className="d-none d-md-block">
          <img src={landing} className="w-100 h-100" />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Landing;
