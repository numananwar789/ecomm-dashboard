import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import axios from "axios";

function CRegister() {
  const navigate = useNavigate();
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      address: registerInput.address,
      password: registerInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/cregister`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("customer_name", res.data.username);
          swal("Success", res.data.message, "success");
          navigate("/");
        } else {
          setRegister({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };

  useEffect(() => {
    document.title = "MDMS | Register";

    if (localStorage.getItem("customer_name")) {
      navigate("/");
    }
  });

  return (
    <div className="full-width d-flex justify-content-center and align-items-center bg-img">
      <form className="rounded p-4 p-sm-3" onSubmit={registerSubmit}>
        <div className="mb-3">
          <label for="full_name" className="form-label">
            Full Name
          </label>
          <div class="form-group input-group mb-3">
            <span class="input-group-text">
              <i className="fas fa-address-book"></i>
            </span>
            <input
              type="text"
              name="name"
              onChange={handleInput}
              value={registerInput.name}
              className="form-control"
              placeholder="Enter full name"
            />
          </div>
          <span className="text-danger">{registerInput.error_list.name}</span>
        </div>

        <div className="mb-3">
          <label for="emailAddress" className="form-label">
            Email Address
          </label>
          <div class="form-group input-group mb-3">
            <span class="input-group-text">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              value={registerInput.email}
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
          <span className="text-danger">{registerInput.error_list.email}</span>
        </div>

        <div className="mb-4">
          <label for="address" className="form-label">
            Address
          </label>
          <div class="form-group input-group mb-3">
            <span class="input-group-text">
              <i className="fas fa-address-card"></i>
            </span>
            <textarea
              name="address"
              onChange={handleInput}
              value={registerInput.address}
              className="form-control"
              placeholder="Enter address"
            />
          </div>
          <span className="text-danger">
            {registerInput.error_list.address}
          </span>
        </div>

        <div className="mb-4">
          <label for="password" className="form-label">
            Password
          </label>
          <div class="form-group input-group mb-3">
            <span class="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              value={registerInput.password}
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <span className="text-danger">
            {registerInput.error_list.password}
          </span>
        </div>

        <div class="d-grid col-6 mx-auto mb-3">
          <button type="submit" className="btn btn-outline-dark rounded-0">
            Register
          </button>
        </div>
        <NavLink
          className="d-grid col-6 mx-auto justify-content-center"
          to="/clogin"
        >
          Already a Member? Login
        </NavLink>
      </form>
    </div>
  );
}

export default CRegister;
