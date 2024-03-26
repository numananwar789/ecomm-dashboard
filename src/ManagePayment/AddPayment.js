import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import swal from "sweetalert";

function AddPayment() {
  const navigate = useNavigate();
  const [paymentInput, setPayment] = useState({
    credit: "",
    debit: "",
    date: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setPayment({ ...paymentInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = "MDMS | Add Payment";
  });

  const AddPayment = (e) => {
    e.preventDefault();

    const data = {
      credit: paymentInput.credit,
      debit: paymentInput.debit,
      date: paymentInput.date,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/addpayment", data).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          navigate("/addpayment");
        } else {
          setPayment({
            ...paymentInput,
            error_list: res.data.validation_errors,
          });
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
            <h4 className="page-title">Add Payment</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to="/payment">Manage Payment</NavLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Add Payment
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Bread crumb End --> */}

      <div className="d-flex justify-content-center and align-items-center">
        <form className="shadow rounded p-4 p-sm-3 mt-3" onSubmit={AddPayment}>
          <div className="mb-3">
            <label className="form-label">Enter Credit</label>
            <input
              type="text"
              name="credit"
              onChange={handleInput}
              value={paymentInput.credit}
              className="form-control"
              placeholder="Enter Credit Amount"
            />
            <span className="text-danger">
              {paymentInput.error_list.credit}
            </span>
          </div>

          <div className="mb-3">
            <label className="form-label">Enter Debit</label>
            <input
              type="text"
              name="debit"
              onChange={handleInput}
              value={paymentInput.debit}
              className="form-control"
              placeholder="Enter Debit Amount"
            />
            <span className="text-danger">{paymentInput.error_list.debit}</span>
          </div>

          <div className="mb-3">
            <label className="form-label">Enter Date</label>
            <input
              type="date"
              name="date"
              onChange={handleInput}
              value={paymentInput.date}
              className="form-control"
            />
            <span className="text-danger">{paymentInput.error_list.date}</span>
          </div>

          <div class="d-grid gap-2 col-6 mx-auto mb-3">
            <button className="btn btn-outline-dark rounded-0">
              Add Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPayment;
