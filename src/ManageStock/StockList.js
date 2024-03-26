import Header from "../Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import swal from "sweetalert";
import axios from "axios";

function StockList() {
  const navigate = useNavigate();
  const [stock, setStock] = useState([]);

  useEffect(async () => {
    document.title = "MDMS | Stock List";

    axios.get("/api/stocklist").then((res) => {
      if (res.data.status === 200) {
        // console.log(res.data.stock);
        setStock(res.data.stock);
      }
    });
  }, []);

  function deleteOperation(id) {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.delete(`/api/deletestock/${id}`).then((res) => {
        if (res.data.status === 200) {
          // setDescription(res.data.description);
          swal("Success", res.data.message, "success");
          navigate("/addstock");
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
            <h4 className="page-title">Stock List</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                  <li className="breadcrumb-item">
                    <NavLink to="/stock">Manage Stock</NavLink>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Stock List
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
                <th>Stock Received</th>
                <th>Stock Returned</th>
                <th>Stock in Hand</th>
                <th>Stock Price</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* {Display_Stock} */}
              {stock.map((item) => (
                <tr key={item.stock_id}>
                  <td>{item.stock_received}</td>
                  <td>{item.stock_returned}</td>
                  <td>{item.stock_in_hand}</td>
                  <td>Rs/- {item.stock_price}</td>
                  <td>{item.date}</td>
                  <td>
                    <NavLink to={"/updatestock/" + item.stock_id}>
                      <Button variant="contained" color="success">
                        <EditIcon />
                      </Button>
                    </NavLink>
                  </td>
                  <td>
                    <Button
                      onClick={() => deleteOperation(item.stock_id)}
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

export default StockList;
