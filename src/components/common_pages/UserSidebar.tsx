// Sidebar.tsx
import { FC } from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { userServices } from '../../Services/constants/serviceList'; // Adjust the import path as necessary

interface SidebarProps {
  show: boolean;
  handleClose: () => void;
}

const UserSidebar: FC<SidebarProps> = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} style={{ width: '250px' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Services</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          {userServices.map(({ service, path }) => (
            <Nav.Link
              as={Link}
              to={path}
              key={service}
              style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', color: 'black' }}
            >
              <FaHome style={{ marginRight: '0.5rem' }} />
              {service}
            </Nav.Link>
          ))}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UserSidebar;
