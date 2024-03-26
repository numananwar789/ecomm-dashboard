import Header from "../Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import swal from "sweetalert";
import axios from "axios";

function CustomerList() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);

  useEffect(async () => {
    document.title = "MDMS | Customer List";

    axios.get("/api/clist").then((res) => {
      if (res.data.status === 200) {
        // console.log(res.data.description);
        setCustomer(res.data.customer);
      }
    });
  }, []);

  function deleteOperation(id) {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.delete(`/api/deletecustomer/${id}`).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          navigate("/clist");
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
            <h4 className="page-title">Customer List</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                  <li className="breadcrumb-item active">Manage Customer</li>
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
                <th>Email</th>
                <th>Address</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* {display Customer List} */}
              {customer.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>

                  <td>
                    <Button
                      onClick={() => deleteOperation(item.id)}
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

export default CustomerList;
