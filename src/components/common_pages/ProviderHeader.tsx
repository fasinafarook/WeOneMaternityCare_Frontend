import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../api/adminAPI";
import logo from "../../../public/images/WeOne (1).png";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { serviceProviderLogout } from "../../redux/slice/authSlice";
import { getProfileDetails } from "../../api/serviceProviderAPI";
import Swal from "sweetalert2";

interface ProfileData {
  name: string;
}

const AppNavbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

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
          dispatch(serviceProviderLogout());
          navigate("/");
          Swal.fire('Logged out!', 'You have been logged out.', 'success');
        }
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await getProfileDetails();
        console.log("data: ", data);
        setProfileData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const navLinkStyle = (path: string): React.CSSProperties => ({
    color: path === window.location.pathname ? "#c97d60" : "white",
    fontWeight: "500",
    fontSize: "16px",
    marginRight: "20px",
    position: "relative",
    padding: "5px 10px",
    textTransform: "capitalize",
    transition: "all 0.3s ease",
    overflow: "hidden",
  });

  return (
    <Navbar
      style={{ background: "linear-gradient(to right, #574b60, #D7BCC8)" }}
      expand="lg"
    >
      <Navbar.Brand as={Link} to="/serviceProvider/home">
        <img src={logo} alt="Logo" style={{ width: "70px", height: "70px" }} />
      </Navbar.Brand>

      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between" // Use between to separate navigation items and profile/logout section
        >
          <Nav className="me-auto" style={{ display: "flex", alignItems: "center" }}>
            <Nav.Link as={Link} to="/serviceProvider/home" style={navLinkStyle("/serviceProvider/home")}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/webinars" style={navLinkStyle("/webinars")}>
              Webinar
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs" style={navLinkStyle("/blogs")}>
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/serviceProvider/get-scheduled-bookings" style={navLinkStyle("/serviceProvider/get-scheduled-bookings")}>
              Bookings
            </Nav.Link>
            <Nav.Link as={Link} to="/serviceProvider/get-slots" style={navLinkStyle("/serviceProvider/get-slots")}>
              Slots
            </Nav.Link>
          </Nav>

          <Nav className="d-flex align-items-center">
            <Nav.Link
              as={Link}
              to="/serviceProvider/get-profile"
              style={{ display: "flex", alignItems: "center", color: "white", marginRight: "20px" }}
            >
              <FaUserCircle size={40} />
              <span style={{ marginLeft: "10px", fontSize: "16px", fontWeight: "500" }}>
                {profileData ? profileData.name : "Loading..."}
              </span>
            </Nav.Link>

            <Button
              onClick={handleLogout}
              style={{ backgroundColor: "#dc3545", border: "none", color: "#fff" }}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
