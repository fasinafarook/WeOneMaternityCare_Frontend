import React, { useState } from "react";
import { Navbar, Container, Image, Nav, Button, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../../public/images/logo.jpeg";
import { logout } from "../../api/adminAPI";
import { adminLogout } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { adminServices } from "../../Services/constants/serviceList"; // Import the admin services list

const AdminNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false); // State for Offcanvas visibility

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const response = await logout();
        if (response.success) {
          dispatch(adminLogout());
          navigate("/");
          Swal.fire('Logged out!', 'You have been logged out.', 'success');
        }
      } catch (error) {
        console.error("Logout failed:", error);
        Swal.fire('Error!', 'Logout failed. Please try again.', 'error');
      }
    }
  };

  return (
    <>
      <Navbar expand="lg" style={{ background: "linear-gradient(to right, #574b60, #D7BCC8)", padding: "10px 0" }}>
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

          {/* Sidebar Button */}
          <Button
            variant="secondary"
            onClick={() => setShowSidebar(true)} // Open the sidebar
            style={{ marginLeft: 'auto', backgroundColor: "#4CAF50", color: "#fff" }}
          >
            Services
          </Button>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc3545",
              border: "none",
              color: "#fff",
              marginLeft: "1rem",
              padding: "10px 20px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
          >
            Logout
          </Button>
        </Container>
      </Navbar>

      {/* Sidebar (Offcanvas) */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start"> {/* Changed placement to 'start' */}
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Services</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {adminServices.map(({ service, path }) => (
              <Nav.Link
                key={service}
                as={NavLink}
                to={path}
                style={({ isActive }: { isActive: boolean }) => ({
                  fontSize: "16px",
                  padding: "10px 20px",
                  marginRight: "10px",
                  borderRadius: "5px",
                  textTransform: "capitalize",
                  backgroundColor: isActive ? "#4CAF50" : "transparent",
                  color: isActive ? "#fff" : "#000",
                  transition: "background-color 0.3s ease",
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
