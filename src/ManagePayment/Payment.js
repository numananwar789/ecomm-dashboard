import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "../Header";

function Payment() {
  useEffect(() => {
    document.title = "MDMS | Manage Payment";
  });
  return (
    <div>
      <Header />

      {/* <!-- Bread crumb Start --> */}
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title">Manage Payment</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Manage Payment
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Bread crumb End --> */}

      <div className="container">
        {/* <!--  Cards  --> */}
        <div className="row mt-3">
          {/* <!-- Column --> */}
          <div className="col-md-6 col-lg-4 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-cyan text-center">
                <h1 className="font-light text-white">
                  <NavLink to="/paymentlist" className="admin_navlink">
                    <i className="fas fa-calendar-check"></i>
                  </NavLink>
                </h1>
                <h6 className="text-white">
                  <NavLink to="/paymentlist" className="admin_navlink">
                    Payment Record
                  </NavLink>
                </h6>
              </div>
            </div>
          </div>
          {/* <!-- Column --> */}
          <div className="col-md-6 col-lg-4 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-success text-center">
                <h1 className="font-light text-white">
                  <NavLink to="/addpayment" className="admin_navlink">
                    <i className="fas fa-plus"></i>
                  </NavLink>
                </h1>
                <h6 className="text-white">
                  <NavLink to="/addpayment" className="admin_navlink">
                    Add Payment
                  </NavLink>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
