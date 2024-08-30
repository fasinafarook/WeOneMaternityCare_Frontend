import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link ,useNavigate} from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { logout } from "../../api/adminAPI";
import logo from "../../../public/images/logo.jpeg";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userLogout } from '../../redux/slice/authSlice';

const UserNavbar: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
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
  return (
    <Navbar style={{ backgroundColor: "rgb(45 107 152)" }}>
      <Container>
        <Navbar.Brand as={Link} to="/user/home">
          <img
            src={logo}
            alt="Logo"
            style={{ width: '100px', height: '70px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
  id="basic-navbar-nav"
  className="justify-content-end"
  style={{ visibility: 'visible', display: 'flex' }}
>          <Nav className="me-auto">
            <Nav.Link as={Link} to="/emergency" style={{ color: 'white' }}>Emergency</Nav.Link>
            <Nav.Link as={Link} to="/webinars" style={{ color: 'white' }}>Webinar</Nav.Link>
            <Nav.Link as={Link} to="/blogs" style={{ color: 'white' }}>Blog</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown 
              title={<FaUserCircle size={40} />} // Use FaUserCircle as the dropdown toggle icon
              id="basic-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/user/get-profile">Profile Details</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item 
                onClick={handleLogout}
                style={{ backgroundColor: '#dc3545', color: '#fff' }}
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
