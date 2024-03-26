import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import swal from "sweetalert";

function AddProduct() {
  const navigate = useNavigate();
  const [nameInput, setName] = useState({
    name: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setName({ ...nameInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = "MDMS | Add Product";
  });

  const addProduct = (e) => {
    e.preventDefault();

    const data = {
      name: nameInput.name,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/addproduct", data).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          navigate("/productdescription");
        } else {
          setName({ ...nameInput, error_list: res.data.validation_errors });
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
            <h4 className="page-title">Add Product</h4>
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
                    Add Product
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Bread crumb End --> */}

      <div className="d-flex justify-content-center and align-items-center">
        <form className="shadow rounded p-4 p-sm-3 mt-3" onSubmit={addProduct}>
          <div className="mb-3">
            <label className="form-label">Enter Product Name</label>
            <input
              type="text"
              name="name"
              onChange={handleInput}
              value={nameInput.name}
              className="form-control"
              placeholder="Enter product name"
            />
            <span className="text-danger">{nameInput.error_list.name}</span>
          </div>

          <div class="d-grid gap-2 col-6 mx-auto mb-3">
            <button className="btn btn-outline-dark rounded-0">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
