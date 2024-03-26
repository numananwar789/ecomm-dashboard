import React from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Dashboard } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PaymentIcon from "@mui/icons-material/Payment";

function Header() {
  let username = localStorage.getItem("auth_name");
  const navigate = useNavigate();

  function logOut() {
    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        navigate("/login");
      }
    });
  }

  return (
    <div>
      {/* OffCanvas Navbar */}

      <Navbar bg="dark" variant="dark" expand={false}>
        <Container fluid>
          <Navbar.Brand className="brand" href="/admin">
            MDMS Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {localStorage.getItem("auth_token") ? (
                  <>
                    <NavLink className="offcanvas_navlink" to="/admin">
                      <Dashboard /> Dashboard
                    </NavLink>
                    <NavLink className="offcanvas_navlink" to="/products">
                      <CategoryIcon /> Products
                    </NavLink>
                    <NavLink className="offcanvas_navlink" to="/stock">
                      <InventoryIcon /> Stock
                    </NavLink>
                    <NavLink className="offcanvas_navlink" to="/clist">
                      <PersonIcon /> Customers
                    </NavLink>
                    <NavLink className="offcanvas_navlink" to="/payment">
                      <PaymentIcon /> Payment
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink className="offcanvas_navlink" to="/login">
                      Login
                    </NavLink>
                    <NavLink className="offcanvas_navlink" to="/register">
                      Register
                    </NavLink>
                  </>
                )}

                {localStorage.getItem("auth_name") ? (
                  <Nav>
                    <NavDropdown title={username}>
                      <NavDropdown.Item onClick={logOut}>
                        Logout <LogoutIcon />
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                ) : null}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
