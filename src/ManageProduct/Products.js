import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "../Header";

function Products() {
  useEffect(() => {
    document.title = "MDMS | Manage Product";
  });
  return (
    <div>
      <Header />

      {/* <!-- Bread crumb Start --> */}
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title">Manage Product</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Manage Product
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
                  <NavLink to="/productlist" className="admin_navlink">
                    <i className="mdi mdi-table-large"></i>
                  </NavLink>
                </h1>
                <h6 className="text-white">
                  <NavLink to="/productlist" className="admin_navlink">
                    Product List
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
                  <NavLink to="/add" className="admin_navlink">
                    <i className="fas fa-plus"></i>
                  </NavLink>
                </h1>
                <h6 className="text-white">
                  <NavLink to="/addproduct" className="admin_navlink">
                    Add Product
                  </NavLink>
                </h6>
              </div>
            </div>
          </div>

          {/* <!-- Column --> */}
          <div className="col-md-6 col-lg-4 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-info text-center">
                <h1 className="font-light text-white">
                  <NavLink to="/addproduct" className="admin_navlink">
                    <i className="fas fa-plus"></i>
                  </NavLink>
                </h1>
                <h6 className="text-white">
                  <NavLink to="/productdescription" className="admin_navlink">
                    Add Description
                  </NavLink>
                </h6>
              </div>
            </div>
          </div>

          {/* <!-- Column --> */}
          <div className="col-md-6 col-lg-4 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-warning text-center">
                <h1 className="font-light text-white">
                  <NavLink to="/search" className="admin_navlink">
                    <i className="fas fa-search"></i>
                  </NavLink>
                </h1>
                <h6 className="text-white">
                  <NavLink to="/search" className="admin_navlink">
                    Search Product
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

export default Products;
