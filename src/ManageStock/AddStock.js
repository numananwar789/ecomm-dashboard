import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import swal from "sweetalert";

function AddStock() {
  const navigate = useNavigate();
  const [stockInput, setStock] = useState({
    stock_received: "",
    stock_returned: "",
    stock_in_hand: "",
    stock_price: "",
    date: "",
  });

  useEffect(() => {
    document.title = "MDMS | Add Stock";
  });

  const handleInput = (e) => {
    e.persist();
    setStock({ ...stockInput, [e.target.name]: e.target.value });
  };

  const addStock = (e) => {
    e.preventDefault();

    const data = {
      stock_received: stockInput.stock_received,
      stock_returned: stockInput.stock_returned,
      stock_in_hand: stockInput.stock_in_hand,
      stock_price: stockInput.stock_price,
      date: stockInput.date,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/addstock", data).then((res) => {
        swal("Success", res.data.message, "success");
        navigate("/stocklist");
      });
    });
  };

  return (
    <div>
      <Header />
      {/* <!-- Bread crumb Start --> */}
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title">Add Stock</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to="/stock">Manage Stock</NavLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Add Stock
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Bread crumb End --> */}

      <div className="d-flex justify-content-center and align-items-center">
        <form className="shadow rounded p-4 p-sm-3 mt-3" onSubmit={addStock}>
          <div className="mb-3">
            <label className="form-label">Enter Stock Received</label>
            <input
              type="text"
              className="form-control"
              name="stock_received"
              onChange={handleInput}
              value={stockInput.stock_received}
              placeholder="Enter stock received"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Enter Stock Returned</label>
            <input
              type="text"
              className="form-control"
              name="stock_returned"
              onChange={handleInput}
              value={stockInput.stock_returned}
              placeholder="Enter stock returned"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Enter Stock in Hand</label>
            <input
              type="number"
              className="form-control"
              name="stock_in_hand"
              onChange={handleInput}
              value={stockInput.stock_in_hand}
              placeholder="Enter Stock in Hand"
            />
          </div>

          <div className="mb-4">
            <label>Enter Stock Price</label>
            <input
              type="number"
              className="form-control"
              name="stock_price"
              onChange={handleInput}
              value={stockInput.stock_price}
              placeholder="Enter stock price"
            />
          </div>

          <div className="mb-4">
            <label>Enter Stock Price</label>
            <input
              type="date"
              className="form-control"
              name="date"
              onChange={handleInput}
              value={stockInput.date}
              placeholder="Enter date"
            />
          </div>

          <div class="d-grid gap-2 col-6 mx-auto mb-3">
            <button className="btn btn-outline-dark rounded-0">
              Add Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStock;
