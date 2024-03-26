import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import swal from "sweetalert";

function UserHeader() {
  let username = localStorage.getItem("customer_name");
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("customer_name");
    swal("Success", "Logged Out Successfully", "success");
    navigate("/login");
  }

  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand
            style={{ fontWeight: "bold", color: "white" }}
            href="#home"
          >
            MDMS
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {localStorage.getItem("customer_name") ? (
                <>
                  <Nav.Link className="navlink" to="/">
                    Home
                  </Nav.Link>
                  <NavLink className="navlink" to="#">
                    About Us
                  </NavLink>
                  <NavLink className="navlink" to="#">
                    Contact Us
                  </NavLink>
                </>
              ) : (
                <>
                  <Nav.Link className="navlink" to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link className="navlink" to="#">
                    About Us
                  </Nav.Link>
                  <Nav.Link className="navlink" to="#">
                    Contact Us
                  </Nav.Link>
                  <Nav.Link className="navlink" href="/clogin">
                    Login
                  </Nav.Link>
                </>
              )}

              {localStorage.getItem("customer_name") ? (
                <Nav className="navlink">
                  <NavDropdown title={username}>
                    <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default UserHeader;
