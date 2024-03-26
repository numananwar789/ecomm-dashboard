import Header from "../Header";
import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function UpdateProduct() {
  const navigate = useNavigate();
  const props = useParams();
  const [data, setData] = useState([]);
  const [descriptionInput, setDescription] = useState({
    type: "",
    quantity: "",
    price: "",
    product_id: "",
  });

  const handleInput = (e) => {
    e.persist();
    setDescription({ ...descriptionInput, [e.target.name]: e.target.value });
  };

  useEffect(async () => {
    document.title = "MDMS | Update Product";

    axios.get("/api/list").then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.products);
        setData(res.data.products);
      }
    });

    axios.get(`/api/getdescription/${props.id}`).then((res) => {
      if (res.data.status === 200) {
        setDescription(res.data.description);
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        navigate("/productlist");
      }
    });
  }, [props.id, navigate]);

  const editProduct = (e, id) => {
    e.preventDefault();
    const data = {
      product_id: descriptionInput.product_id,
      type: descriptionInput.type,
      quantity: descriptionInput.quantity,
      price: descriptionInput.price,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/update-description/${props.id}`, data).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          navigate("/productlist");
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
          navigate("/productlist");
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
            <h4 className="page-title">Update Description</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to="/products">Manage Product</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to="/productlist">Product List</NavLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Update Description
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Bread crumb End --> */}

      <div className="d-flex justify-content-center and align-items-center">
        <form className="shadow rounded p-4 p-sm-3 mt-3" onSubmit={editProduct}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <select
              className="form-select"
              name="product_id"
              onChange={handleInput}
              value={descriptionInput.product_id}
            >
              <option value="">Select Product</option>
              {data.map((item) => {
                return (
                  <option value={item.product_id} key={item.product_id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Select Type</label>
            <select
              className="form-select"
              name="type"
              onChange={handleInput}
              value={descriptionInput.type}
            >
              <option value="">Select Type</option>
              <option value="Syrup">Syrup</option>
              <option value="Tablet">Tablet</option>
              <option value="Capsule">Capsule</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Enter Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              onChange={handleInput}
              value={descriptionInput.quantity}
            />
          </div>

          <div className="mb-4">
            <label>Enter Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              onChange={handleInput}
              value={descriptionInput.price}
            />
          </div>

          <div class="d-grid gap-2 col-6 mx-auto mb-3">
            <button className="btn btn-outline-dark rounded-0">
              Update Description
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;

// <form className="shadow rounded p-4 p-sm-3 mt-4">
//   <div className="mb-3">
//     <label>Product Name</label>
//     <input
//       type="text"
//       className="form-control"
//       onChange={(e) => setName(e.target.value)}
//       defaultValue={description.name}
//     />
//   </div>

//   <div className="mb-3">
//     <label>Type</label>
//     <input
//       type="text"
//       className="form-control"
//       onChange={(e) => setType(e.target.value)}
//       defaultValue={description.type}
//     />
//   </div>

//   <div className="mb-3">
//     <label>Quantity</label>
//     <input
//       type="number"
//       className="form-control"
//       onChange={(e) => setQuantity(e.target.value)}
//       defaultValue={description.quantity}
//     />
//   </div>

//   <div className="mb-4">
//     <label>Price</label>
//     <input
//       type="number"
//       className="form-control"
//       onChange={(e) => setPrice(e.target.value)}
//       defaultValue={description.price}
//     />
//   </div>

//   <div class="d-grid gap-2 col-6 mx-auto mb-3">
//     <button
//       onClick={() => editProduct(data.product_id)}
//       className="btn btn-outline-dark rounded-0"
//     >
//       Update Product
//     </button>
//   </div>
// </form>
