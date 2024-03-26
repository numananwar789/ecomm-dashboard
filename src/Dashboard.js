import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import InventoryIcon from "@mui/icons-material/Inventory";

function Dashboard() {
  useEffect(() => {
    document.title = "MDMS | Dashboard";
  });
  return (
    <div>
      <Header />

      {/* <!-- Bread crumb Start --> */}
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title">Dashboard</h4>
          </div>
        </div>
      </div>
      {/* <!-- Bread crumb End --> */}

      <div className="container">
        <div className="row mt-3">
          {/* <!-- Column --> */}

          <div className="col-md-6 col-lg-6 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-cyan text-center">
                <h1 className="font-light text-white">
                  <NavLink to="/products" className="admin_navlink">
                    <i className="mdi mdi-medical-bag"></i>
                  </NavLink>
                </h1>
                <h6 className="text-white">
                  <NavLink to="/products" className="admin_navlink">
                    Manage Products
                  </NavLink>
                </h6>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-success text-center">
                <h1 className="font-light text-white">
                  <NavLink to="/stock" className="admin_navlink">
                    {/* <i className="fab fa-stack-overflow"></i> */}
                    <InventoryIcon fontSize="large" />
                  </NavLink>
                </h1>
                <h6 className="text-white">
                  <NavLink to="/stock" className="admin_navlink">
                    Manage Stock
                  </NavLink>
                </h6>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-warning text-center">
                <h1 className="font-light text-white">
                  <NavLink to="/clist" className="admin_navlink">
                    <i className="fas fa-user"></i>
                  </NavLink>
                </h1>
                <h6 className="text-white">
                  <NavLink to="/clist" className="admin_navlink">
                    Manage Customers
                  </NavLink>
                </h6>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-6 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-danger text-center">
                <h1 className="font-light text-white">
                  <NavLink to="/payment" className="admin_navlink">
                    <i className="fas fa-credit-card"></i>
                  </NavLink>
                </h1>
                <h6 className="text-white">
                  <NavLink to="/payment" className="admin_navlink">
                    Manage Payment
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

export default Dashboard;
