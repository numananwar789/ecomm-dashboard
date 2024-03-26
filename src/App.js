import "./App.css";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Protected from "./Protected";
import AddProduct from "./ManageProduct/AddProduct";
import Description from "./ManageProduct/Description";
import UpdateProduct from "./ManageProduct/UpdateProduct";
import ProductList from "./ManageProduct/ProductList";
import SearchProduct from "./ManageProduct/SearchProduct";
import Products from "./ManageProduct/Products";
import Dashboard from "./Dashboard";
import Home from "./Home";
import axios from "axios";
import Stock from "./ManageStock/Stock";
import AddStock from "./ManageStock/AddStock";
import StockList from "./ManageStock/StockList";
import UpdateStock from "./ManageStock/UpdateStock";
import CRegister from "./Customer/CRegister";
import CLogin from "./Customer/CLogin";
import CustomerList from "./Customer/CustomerList";
import Payment from "./ManagePayment/Payment";
import AddPayment from "./ManagePayment/AddPayment";
import PaymentList from "./ManagePayment/PaymentList";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <div>
      <Routes>
        {/* User Routes */}
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/cregister" element={<CRegister />}></Route>
        <Route exact path="/clogin" element={<CLogin />}></Route>

        {/* Admin Routes */}
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>

        {/* Product Routes */}
        <Route path="/admin" element={<Protected Cmp={Dashboard} />}></Route>
        <Route path="/products" element={<Protected Cmp={Products} />}></Route>
        <Route
          path="/productlist"
          element={<Protected Cmp={ProductList} />}
        ></Route>
        <Route
          path="/addproduct"
          element={<Protected Cmp={AddProduct} />}
        ></Route>
        <Route
          path="/productdescription"
          element={<Protected Cmp={Description} />}
        ></Route>
        <Route
          path="/update/:id"
          element={<Protected Cmp={UpdateProduct} />}
        ></Route>
        <Route
          path="/search"
          element={<Protected Cmp={SearchProduct} />}
        ></Route>

        {/* Stock Routes */}
        <Route path="/stock" element={<Protected Cmp={Stock} />}></Route>
        <Route path="/addstock" element={<Protected Cmp={AddStock} />}></Route>
        <Route
          path="/stocklist"
          element={<Protected Cmp={StockList} />}
        ></Route>
        <Route
          path="/updatestock/:id"
          element={<Protected Cmp={UpdateStock} />}
        ></Route>
        {/*  */}

        {/* Customer Route */}
        <Route path="/clist" element={<Protected Cmp={CustomerList} />}></Route>

        {/* Payment Route */}
        <Route path="/payment" element={<Protected Cmp={Payment} />}></Route>
        <Route
          path="/addpayment"
          element={<Protected Cmp={AddPayment} />}
        ></Route>
        <Route
          path="/paymentlist"
          element={<Protected Cmp={PaymentList} />}
        ></Route>

        <Route path="/" element={<Navigate replace to="/admin" />} />
      </Routes>
    </div>
  );
}

export default App;
