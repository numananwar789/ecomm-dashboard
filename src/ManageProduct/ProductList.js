import Header from "../Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import swal from "sweetalert";
import axios from "axios";

function ProductList() {
  const navigate = useNavigate();
  const [description, setDescription] = useState([]);

  useEffect(async () => {
    document.title = "MDMS | Product List";

    axios.get("/api/descriptionlist").then((res) => {
      if (res.data.status === 200) {
        // console.log(res.data.description);
        setDescription(res.data.description);
      }
    });
  }, []);

  function deleteOperation(id) {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.delete(`/api/delete/${id}`).then((res) => {
        if (res.data.status === 200) {
          // setDescription(res.data.description);
          swal("Success", res.data.message, "success");
          navigate("/productdescription");
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      });
    });
  }

  return (
    <div>
      <Header />
      {/* <!-- Bread crumb Start --> */}
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title">Product List</h4>
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
                    Product List
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Bread crumb End --> */}
      <div className="container mt-4">
        <div className="table-responsive rounded">
          <Table className="table-bordered table-hover shadow-sm text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* {display_Description} */}
              {description.map((item) => (
                <tr key={item.description_id}>
                  <td>{item.products.name}</td>
                  <td>{item.type}</td>
                  <td>{item.quantity}</td>
                  <td>Rs/- {item.price}</td>
                  <td>
                    <NavLink to={"/update/" + item.description_id}>
                      <Button variant="contained" color="success">
                        <EditIcon />
                      </Button>
                    </NavLink>
                  </td>
                  <td>
                    <Button
                      onClick={() => deleteOperation(item.description_id)}
                      variant="contained"
                      color="error"
                    >
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
