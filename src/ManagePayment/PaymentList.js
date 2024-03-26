import Header from "../Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import swal from "sweetalert";
import axios from "axios";

function PaymentList() {
  const navigate = useNavigate();
  const [payment, setPayment] = useState([]);

  useEffect(async () => {
    document.title = "MDMS | Payment List";

    axios.get("/api/paymentlist").then((res) => {
      if (res.data.status === 200) {
        // console.log(res.data.description);
        setPayment(res.data.payment);
      }
    });
  }, []);

  function deleteOperation(id) {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.delete(`/api/delete/${id}`).then((res) => {
        if (res.data.status === 200) {
          // setDescription(res.data.description);
          swal("Success", res.data.message, "success");
          navigate("/paymentlist");
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
            <h4 className="page-title">Payment List</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to="/paymentlist">Manage Payment</NavLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Payment List
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
                <th>Credit</th>
                <th>Debit</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* {display_Description} */}
              {payment.map((item) => (
                <tr key={item.payment_id}>
                  <td>{item.credit}</td>
                  <td>{item.debit}</td>
                  <td>{item.date}</td>
                  <td>
                    <NavLink to={"/update/" + item.payment_id}>
                      <Button variant="contained" color="success">
                        <EditIcon />
                      </Button>
                    </NavLink>
                  </td>
                  <td>
                    <Button
                      onClick={() => deleteOperation(item.payment_id)}
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

export default PaymentList;
