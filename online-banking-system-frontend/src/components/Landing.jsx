import React from "react";
import landing from "../images/landing.jpg";
import { Outlet } from "react-router-dom";

function Landing() {
  return (
    <>
      <div className="d-flex" style={{ height: "100vh" }}>
        <div className="col-lg-4 col-md-6 col-12 bg-light">
          <div className="d-flex align-items-center h-100">
            <div className="w-100 p-4">
              <Outlet />
            </div>
          </div>
        </div>
        <div className="d-none d-md-block">
          <img src={landing} className="w-100 h-100" />
        </div>
      </div>
    </>
  );
}

export default Landing;
