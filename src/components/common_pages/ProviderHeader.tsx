// import React from "react";
// import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import logo from "../../../public/images/logo.jpeg";
// import { logout } from "../../api/adminAPI";
// import { serviceProviderLogout } from "../../redux/slice/authSlice";

// const AppNavbar: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     try {
//       const response = await logout();
//       if (response.success) {
//         dispatch(serviceProviderLogout());
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//       toast.error("Logout failed. Please try again.");
//     }
//   };

//   return (
//     <Navbar style={{ backgroundColor: "rgb(45 107 152)" }}>
//       <Container>
//         <Navbar.Brand
//           as={Link}
//           to="/serviceProvider/home"
//           style={{ display: "flex", alignItems: "center" }}
//         >
//           <img
//             src={logo}
//             alt="Logo"
//             style={{ width: "100px", height: "70px", objectFit: "contain" }}
//           />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse
//           id="basic-navbar-nav"
//           className="justify-content-end"
//           style={{ visibility: "visible", display: "flex" }}
//         >
//           {" "}
//           <Nav
//             className="me-auto"
//             style={{ display: "flex", alignItems: "center" }}
//           >
//             <Nav.Link
//               as={Link}
//               to="/webinars"
//               style={{
//                 color: "white",
//                 fontWeight: "500",
//                 fontSize: "16px",
//                 marginRight: "15px",
//                 position: "relative",
//                 padding: "8px 12px",
//                 textTransform: "uppercase",
//                 transition: "color 0.3s ease-in-out",
//                 overflow: "hidden",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = "#ffdd57"; // Change text color on hover
//                 e.currentTarget!.querySelector("span")!.style.transform =
//                   "scaleX(1)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = "white"; // Revert text color
//                 e.currentTarget!.querySelector("span")!.style.transform =
//                   "scaleX(0)";
//               }}
//             >
//               Webinar
//               <span
//                 style={{
//                   content: "''",
//                   position: "absolute",
//                   left: 0,
//                   bottom: 0,
//                   width: "100%",
//                   height: "2px",
//                   backgroundColor: "white",
//                   transform: "scaleX(0)",
//                   transition: "transform 0.3s ease-in-out",
//                   transformOrigin: "right",
//                 }}
//               />
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/blogs"
//               style={{
//                 color: "white",
//                 fontWeight: "500",
//                 fontSize: "16px",
//                 marginRight: "15px",
//                 position: "relative",
//                 padding: "8px 12px",
//                 textTransform: "uppercase",
//                 transition: "color 0.3s ease-in-out",
//                 overflow: "hidden",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = "#ffdd57"; // Change text color on hover
//                 e.currentTarget!.querySelector("span")!.style.transform =
//                   "scaleX(1)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = "white"; // Revert text color
//                 e.currentTarget!.querySelector("span")!.style.transform =
//                   "scaleX(0)";
//               }}
//             >
//               Blog
//               <span
//                 style={{
//                   content: "''",
//                   position: "absolute",
//                   left: 0,
//                   bottom: 0,
//                   width: "100%",
//                   height: "2px",
//                   backgroundColor: "white",
//                   transform: "scaleX(0)",
//                   transition: "transform 0.3s ease-in-out",
//                   transformOrigin: "right",
//                 }}
//               />
//             </Nav.Link>
//           </Nav>
//           <Nav>
//             <NavDropdown
//               title={<FaUserCircle size={40} />} // Use FaUserCircle as the dropdown toggle icon
//               id="basic-nav-dropdown"
//               align="end"
//             >
//               <NavDropdown.Item
//                 onClick={handleLogout}
//                 style={{ backgroundColor: "#dc3545", color: "#fff" }}
//               >
//                 Logout
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default AppNavbar;

import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../api/adminAPI";
import logo from "../../../public/images/WeOne (1).png";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userLogout } from "../../redux/slice/authSlice";
import { getProfileDetails } from "../../api/serviceProviderAPI";

interface ProfileData {
  name: string;
}

const AppNavbar: React.FC = () => {
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
      <Navbar.Brand as={Link} to="/serviceProvider/home">
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
              to="/serviceProvider/home"
              style={navLinkStyle("/serviceProvider/home")}
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
              to="/serviceProvider/get-scheduled-bookings"
              style={navLinkStyle("/serviceProvider/get-scheduled-bookings")}
            >
              Bookings
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/serviceProvider/get-slots"
              style={navLinkStyle("/serviceProvider/get-slots")}
            >
              Slots
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
                <span>service provider name: {profileData.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </h1>

            <NavDropdown
              title={<FaUserCircle size={40} style={{ color: "white" }} />}
              id="basic-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/serviceProvider/get-profile">
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

export default AppNavbar;
