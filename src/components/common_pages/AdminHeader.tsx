import React, { useState } from "react";
import {
  Navbar,
  Container,
  Image,
  Nav,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../../src/public/images/logo.jpeg";
import { logout } from "../../api/adminAPI";
import { adminLogout } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { adminServices } from "../../Services/constants/serviceList";
import { FaSignOutAlt, FaCog } from "react-icons/fa"; // Import icons

const AdminNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await logout();
        if (response.success) {
          dispatch(adminLogout());
          navigate("/");
          Swal.fire("Logged out!", "You have been logged out.", "success");
        }
      } catch (error) {
        console.error("Logout failed:", error);
        Swal.fire("Error!", "Logout failed. Please try again.", "error");
      }
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        style={{
          background: "linear-gradient(to right, #2c3e50, #bdc3c7)",
          padding: "10px 0",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Sidebar Button */}
          <Button
            variant="link"
            onClick={() => setShowSidebar(true)} // Open the sidebar
            style={{
              backgroundColor: "transparent",
              color: "#fff",
              fontSize: "20px",
              padding: "10px",
              border: "none",
              transition: "color 0.3s ease",
            }}
          >
            <FaCog /> {/* Settings icon */}
          </Button>

          {/* Logo centered */}
          <Navbar.Brand
            href="/admin/dashboard"
            style={{ flexGrow: 1, textAlign: "center" }}
          >
            <Image
              src={logo}
              style={{ width: "70px", height: "70px", margin: "0 auto" }}
              alt="Logo"
            />
            <h3 style={{ color: "#fff", margin: "0" }}>Admin</h3>
          </Navbar.Brand>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            style={{
              backgroundColor: "#e74c3c",
              border: "none",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "50%",
              transition: "background-color 0.3s ease",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaSignOutAlt /> {/* Logout icon */}
          </Button>
        </Container>
      </Navbar>

      {/* Sidebar (Offcanvas) */}
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="start"
        style={{ backgroundColor: "#34495e", color: "#fff" }}
      >
        <Offcanvas.Header
          closeButton
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}
        >
          <Offcanvas.Title>Admin Services</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ padding: "0" }}>
          <Nav className="flex-column">
            {adminServices.map(({ service, path }) => (
              <Nav.Link
                key={service}
                as={NavLink}
                to={path}
                style={({ isActive }: { isActive: boolean }) => ({
                  fontSize: "16px",
                  padding: "15px 20px",
                  margin: "5px 0",
                  borderRadius: "0",
                  textTransform: "capitalize",
                  backgroundColor: isActive ? "#2980b9" : "transparent",
                  color: isActive ? "#fff" : "#bdc3c7",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  textDecoration: "none",
                })}
                onClick={() => setShowSidebar(false)} // Close sidebar on link click
              >
                {service}
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdminNavbar;
