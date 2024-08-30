import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link ,useNavigate} from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import logo from "../../../public/images/logo.jpeg";
import { logout } from "../../api/adminAPI";
import { serviceProviderLogout } from '../../redux/slice/authSlice';

const AppNavbar: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        dispatch(serviceProviderLogout());
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
        <Navbar.Brand as={Link} to="/serviceProvider/home">
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

export default AppNavbar;
