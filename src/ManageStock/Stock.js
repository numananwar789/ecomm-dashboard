import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "../Header";

function Stock() {
  useEffect(() => {
    document.title = "MDMS | Manage Stock";
  });
  return (
    <div>
      <Header />

      {/* <!-- Bread crumb Start --> */}
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title">Manage Stock</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Manage Stock
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
          <div className="col-md-6 col-lg-6 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-cyan text-center">
                <h1 className="font-light text-white">
                  <NavLink to="/stocklist" className="admin_navlink">
                    <i className="mdi mdi-table-large"></i>
                  </NavLink>
                </h1>
                <h6 className="text-white">
                  <NavLink to="/stocklist" className="admin_navlink">
                    Stock List
                  </NavLink>
                </h6>
              </div>
            </div>
          </div>
          {/* <!-- Column --> */}
          <div className="col-md-6 col-lg-6 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-success text-center">
                <h1 className="font-light text-white">
                  <NavLink to="/addstock" className="admin_navlink">
                    <i className="fas fa-plus"></i>
                  </NavLink>
                </h1>
                <h6 className="text-white">
                  <NavLink to="/addstock" className="admin_navlink">
                    Add Stock
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

export default Stock;
