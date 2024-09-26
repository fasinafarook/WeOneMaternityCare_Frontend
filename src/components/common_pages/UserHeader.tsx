import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../api/adminAPI";
import logo from "../../../public/images/WeOne (1).png";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userLogout } from "../../redux/slice/authSlice";
import { getProfileDetails, getUserCompletedBookings } from "../../api/userAPI";
import Swal from 'sweetalert2';

interface ProfileData {
  name: string;
  userId: string; // Add userId here
}

const UserNavbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [hasCompletedBooking, setHasCompletedBooking] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const response = await logout();
        if (response.success) {
          dispatch(userLogout());
          navigate("/");
        } else {
          toast.error("Logout failed. Please try again.");
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
        // Fetch user profile details
        const { data } = await getProfileDetails();
        console.log("Profile Data:", data);
        setProfileData(data);

        // Extract userId from the profile and fetch completed bookings
        const userId = data._id; // Extract userId
        console.log('id',userId);
        
        const { data: completedBookings } = await getUserCompletedBookings(userId);
        console.log('Completed Bookings:', completedBookings);

        if (completedBookings && completedBookings.length > 0) {
          setHasCompletedBooking(true);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
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

  {console.log('hasCompletedBooking:', hasCompletedBooking)}

  const handleMessageClick = () => {
    if (hasCompletedBooking) {
      navigate("/user/messages");
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Complete a Booking',
        text: 'You need to complete at least one booking to start chatting with other mothers.',
        confirmButtonText: 'OK'
      });    }
  };
  return (
    <Navbar
      style={{ background: "linear-gradient(to right, #574b60, #D7BCC8)" }}
      expand="lg"
    >
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
            

            <Nav.Link
        as="span"
        style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
        onClick={handleMessageClick} 
      >
        ChatBox
      </Nav.Link>
      <Nav.Link
              as={Link}
              to="/user/about"
              style={navLinkStyle("/user/about")}
            >
              About
            </Nav.Link>
          </Nav>

          <Nav className="d-flex align-items-center">
            <Nav.Link
              as={Link}
              to="/user/get-profile"
              style={{
                display: "flex",
                alignItems: "center",
                color: "white",
                marginRight: "20px",
              }}
            >
              <FaUserCircle size={40} />
              <span style={{ marginLeft: "10px" }}>
                {profileData?.name || "Profile"}
              </span>
            </Nav.Link>
            <Nav.Link onClick={handleLogout} style={{ color: "white" }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
