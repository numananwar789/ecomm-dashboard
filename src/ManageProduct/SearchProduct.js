import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Table } from "react-bootstrap";
import Header from "../Header";

function SearchProduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = "MDMS | Search Product";
  });
  async function search(key) {
    let result = await fetch("http://127.0.0.1:8000/api/search/" + key);
    result = await result.json();
    console.warn(result);
    setData(result);
  }

  return (
    <div>
      <Header />
      {/* <!-- Bread crumb Start --> */}
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title">Search Product</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to="/products">Manage Product</NavLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Search Product
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Bread crumb End --> */}

      <div className="container mt-4">
        <div className="d-flex justify-content-center and align-items-center">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Search Product..."
              onChange={(e) => search(e.target.value)}
            />
            <span class="input-group-text">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="table-responsive">
          <Table className="table-bordered table-hover text-center">
            <thead>
              <tr>
                <th style={{ fontWeight: "bold" }}>Name</th>
                <th style={{ fontWeight: "bold" }}>Type</th>
                <th style={{ fontWeight: "bold" }}>Quantity</th>
                <th style={{ fontWeight: "bold" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.quantity}</td>
                  <td>Rs/- {item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default SearchProduct;
