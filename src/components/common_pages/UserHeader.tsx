import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../api/adminAPI";
import logo from "../../../public/images/WeOne (1).png";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userLogout } from "../../redux/slice/authSlice";
import { getProfileDetails } from "../../api/userAPI";
interface ProfileData {
  name: string;
}

const UserNavbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation(); // Get the current route location
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        dispatch(userLogout());
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
  useEffect(() => {
    // Fetch user data from backend
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
    position: "relative", // Ensure this is correctly typed
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
      <p>..</p>
      <Navbar.Brand as={Link} to="/user/home">
        <img src={logo} alt="Logo" style={{ width: "70px", height: "70px" }} />
      </Navbar.Brand>

      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end"
          style={{ visibility: "visible", display: "flex" }}
        >
          <Nav
            className="me-auto"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Nav.Link
              as={Link}
              to="/user/home"
              style={navLinkStyle("/user/home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/webinars"
              style={navLinkStyle("/webinars")}
            >
              Webinar
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs" style={navLinkStyle("/blogs")}>
              Blog
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/user/get-scheduled-Bookings"
              style={navLinkStyle("/user/get-scheduled-Bookings")}
            >
              Bookings
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/user/service-providers"
              style={navLinkStyle("/user/service-providers")}
            >
              Service Providers
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/user/complaints"
              style={navLinkStyle("/user/complaints")}
            >
              Complaints
            </Nav.Link>
          </Nav>

          <Nav>
            <h1
              style={{
                fontFamily: "'Poppins', sans-serif", // Consistent font family
                fontSize: "12px", // Larger size for the header
                fontWeight: "600", // Bold weight for strong emphasis
                marginBottom: "10px", // Space below the header
                color: "#333", // A darker shade for better contrast
                background:
                  "linear-gradient(90deg, rgba(255,213,79,1) 0%, rgba(245,133,41,1) 100%)", // Gradient background
                padding: "10px 15px", // Padding for spacing inside the header
                borderRadius: "8px", // Rounded corners for a softer look
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                textAlign: "center", // Center the text
                maxWidth: "400px", // Limit the width for a clean look
                margin: "auto", // Center the element horizontally
              }}
            >
              {profileData ? (
                <span>user name: {profileData.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </h1>

            <NavDropdown
              title={<FaUserCircle size={40} style={{ color: "white" }} />}
              id="basic-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/user/get-profile">
                Profile Details
              </NavDropdown.Item>
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

export default UserNavbar;
