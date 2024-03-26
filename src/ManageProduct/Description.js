import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import swal from "sweetalert";

function Description() {
  const navigate = useNavigate();

  const [productlist, setProductlist] = useState([]);
  const [descriptionInput, setDescription] = useState({
    type: "",
    quantity: "",
    price: "",
    product_id: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setDescription({ ...descriptionInput, [e.target.name]: e.target.value });
  };

  useEffect(async () => {
    document.title = "MDMS | Product Description";

    // let result = await fetch("http://127.0.0.1:8000/api/list");
    // result = await result.json();
    // setData(result);
    // console.log(result);
    axios.get("/api/list").then((res) => {
      if (res.data.status === 200) {
        setProductlist(res.data.products);
      }
    });
  }, []);

  const addDescription = (e) => {
    e.preventDefault();

    const formData = {
      product_id: descriptionInput.product_id,
      type: descriptionInput.type,
      quantity: descriptionInput.quantity,
      price: descriptionInput.price,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/add-description", formData).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          navigate("/productlist");
        } else {
          setDescription({
            ...descriptionInput,
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
            <h4 className="page-title">Add Product Description</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to="/products">Manage Product</NavLink>
                  </li>
                  <li class="breadcrumb-item">
                    <NavLink to="/addproduct">Add Product</NavLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Add Product Description
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Bread crumb End --> */}

      <div className="d-flex justify-content-center and align-items-center">
        <form
          className="shadow rounded p-4 p-sm-3 mt-3"
          onSubmit={addDescription}
        >
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <select
              className="form-select"
              name="product_id"
              onChange={handleInput}
              value={descriptionInput.product_id}
            >
              <option>Select Product</option>
              {productlist.map((item) => {
                return (
                  <option value={item.product_id} key={item.product_id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <span className="text-danger">
              {descriptionInput.error_list.product_id}
            </span>
          </div>

          <div className="mb-3">
            <label className="form-label">Select Type</label>
            <select
              className="form-select"
              name="type"
              onChange={handleInput}
              value={descriptionInput.type}
            >
              <option selected value="">
                Select Type
              </option>
              <option value="Syrup">Syrup</option>
              <option value="Tablet">Tablet</option>
              <option value="Capsule">Capsule</option>
            </select>
            <span className="text-danger">
              {descriptionInput.error_list.type}
            </span>
          </div>

          <div className="mb-3">
            <label className="form-label">Enter Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              onChange={handleInput}
              value={descriptionInput.quantity}
              placeholder="Enter quantity"
            />
            <span className="text-danger">
              {descriptionInput.error_list.quantity}
            </span>
          </div>

          <div className="mb-4">
            <label>Enter Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              onChange={handleInput}
              value={descriptionInput.price}
              placeholder="Enter price"
            />
            <span className="text-danger">
              {descriptionInput.error_list.price}
            </span>
          </div>
          <div class="d-grid gap-2 col-6 mx-auto mb-3">
            <button className="btn btn-outline-dark rounded-0">
              Add Description
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Description;
