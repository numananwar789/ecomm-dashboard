import Header from "../Header";
import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function UpdateStock() {
  const navigate = useNavigate();
  const props = useParams();
  //   const [data, setData] = useState([]);
  const [stockInput, setStock] = useState({
    stock_received: "",
    stock_returned: "",
    stock_in_hand: "",
    stock_price: "",
    date: "",
  });

  const handleInput = (e) => {
    e.persist();
    setStock({ ...stockInput, [e.target.name]: e.target.value });
  };

  useEffect(async () => {
    document.title = "MDMS | Update Stock";

    axios.get(`/api/getstock/${props.id}`).then((res) => {
      if (res.data.status === 200) {
        setStock(res.data.stock);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        navigate("/stocklist");
      }
    });
  }, [props.id, navigate]);

  const editStock = (e, id) => {
    e.preventDefault();
    const data = {
      stock_received: stockInput.stock_received,
      stock_returned: stockInput.stock_returned,
      stock_in_hand: stockInput.stock_in_hand,
      stock_price: stockInput.stock_price,
      date: stockInput.date,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/updatestock/${props.id}`, data).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          navigate("/stocklist");
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
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
            <h4 className="page-title">Update Stock</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to="/stock">Manage Stock</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to="/stocklist">Stock List</NavLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Update Stock
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Bread crumb End --> */}

      <div className="d-flex justify-content-center and align-items-center">
        <form className="shadow rounded p-4 p-sm-3 mt-3" onSubmit={editStock}>
          <div className="mb-3">
            <label className="form-label">Enter Stock Received</label>
            <input
              type="number"
              name="stock_received"
              className="form-control"
              onChange={handleInput}
              value={stockInput.stock_received}
            />
          </div>

          <div className="mb-4">
            <label>Enter Stock Returned</label>
            <input
              type="number"
              name="stock_returned"
              className="form-control"
              onChange={handleInput}
              value={stockInput.stock_returned}
            />
          </div>

          <div className="mb-4">
            <label>Enter Stock in Hand</label>
            <input
              type="number"
              name="stock_in_hand"
              className="form-control"
              onChange={handleInput}
              value={stockInput.stock_in_hand}
            />
          </div>

          <div className="mb-4">
            <label>Enter Stock Price</label>
            <input
              type="number"
              name="stock_price"
              className="form-control"
              onChange={handleInput}
              value={stockInput.stock_price}
            />
          </div>

          <div className="mb-4">
            <label>Enter Stock Price</label>
            <input
              type="date"
              name="date"
              className="form-control"
              onChange={handleInput}
              value={stockInput.date}
            />
          </div>

          <div class="d-grid gap-2 col-6 mx-auto mb-3">
            <button className="btn btn-outline-dark rounded-0">
              Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateStock;
