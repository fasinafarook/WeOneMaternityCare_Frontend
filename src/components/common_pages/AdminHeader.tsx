import React from "react";
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../../public/images/logo.jpeg";
import { logout } from "../../api/adminAPI";
import { adminLogout } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const AdminNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      dispatch(adminLogout());
      navigate("/");
    }
  };
  return (
    <Navbar
      style={{ background: "linear-gradient(to right, #574b60, #D7BCC8)" }}
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/admin/dashboard">
          <Image
            src={logo}
            style={{ height: "70px", width: "auto" }} // Ensure width is auto to maintain aspect ratio
            alt="Logo"
          />
        </Navbar.Brand>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Links and Profile Icon */}
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end"
          style={{ visibility: "visible", display: "flex" }}
        >
          {/* Navbar content here */}
          <Nav>
            {/* Profile Icon with Dropdown */}
            <p>Admin</p>
            <NavDropdown
              title={<FaUserCircle size={40} />} // Use FaUserCircle as the dropdown toggle icon
              id="basic-nav-dropdown"
              align="end"
            >
              {" "}
              <NavDropdown.Item href="#">admin@gmail.com</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={handleLogout}
                style={{ backgroundColor: "#dc3545", color: "#fff" }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
