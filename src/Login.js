import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
          navigate("/admin");
        } else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  };

  useEffect(() => {
    document.title = "MDMS | Login";

    if (localStorage.getItem("auth_token")) {
      navigate("/");
    }
  });

  return (
    <div className="full-width d-flex justify-content-center and align-items-center bg-img">
      <form className="rounded shadow p-4 p-sm-3" onSubmit={loginSubmit}>
        <div className="mb-3">
          <label for="emailAddress" className="form-label">
            Email Address
          </label>
          <div class="form-group input-group">
            <span class="input-group-text">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              value={loginInput.email}
              className="form-control"
              placeholder="Enter email"
              id="emailAddress"
              aria-describedby="emailHelp"
            />
          </div>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
          <span className="text-danger">{loginInput.error_list.email}</span>
        </div>

        <div className="mb-4">
          <label for="password" className="form-label">
            Password
          </label>
          <div class="form-group input-group">
            <span class="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              value={loginInput.password}
              className="form-control"
              placeholder="Enter password"
              id="password"
            />
          </div>
          <span className="text-danger">{loginInput.error_list.password}</span>
        </div>

        <div class="d-grid gap-2 col-6 mx-auto mb-3">
          <button type="submit" className="btn btn-outline-dark rounded-0">
            Login
          </button>
        </div>
        <NavLink
          className="d-grid col-6 mx-auto justify-content-center"
          to="/register"
        >
          Not an Admin? Register
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
