import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaBars } from 'react-icons/fa';
import Footer from "../../components/common_pages/Footer";
import AdminNavbar from "../../components/common_pages/AdminHeader";
import AdminSidebar from "../../components/common_pages/AdminSidebars";

const AdminDashBoard: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Header */}
      <AdminNavbar />

      {/* Page Layout */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Menu Button */}
        <Button 
          variant="primary" 
          onClick={handleShow} 
          style={{ 
            position: 'absolute', 
            top: '1rem', 
            left: '1rem', 
            zIndex: 1000 // Ensures button stays on top
          }}
        >
          <FaBars /> Menu
        </Button>

        {/* Sidebar */}
        <AdminSidebar show={show} handleClose={handleClose} />

        {/* Main Content */}
        <Container>
          <div className="mt-5 mb-5">
            <Row>
              <Col md={6}>
                <img
                  src="https://images.pexels.com/photos/7282807/pexels-photo-7282807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  style={{ height: "350px", width: "100%" }}
                  className="rounded-4"
                  alt="admindash1"
                />
              </Col>
              <Col md={6} className="mt-3">
                <img
                  src="https://images.pexels.com/photos/7282318/pexels-photo-7282318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  style={{ height: "350px", width: "100%" }}
                  className="rounded-4"
                  alt="admindash2"
                />
              </Col>
            </Row>
            <h3 className="poppins-semibold-italic mt-4">
              Begin your child's journey with Us
            </h3>
            <p className="text-secondary poppins-regular">
              We prioritize excellence in care and support, ensuring every aspect meets the highest standards.
            </p>
            <h2 className="text-center fw-bold mt-3">About Us</h2>
            <hr />
            <p className="text-center mt-3">
              The birth of your baby is one of the most exciting events in your
              life. From the miracle of the first heartbeat to the exhilarating
              moment of the first breath, a new love story is beginning! Whether
              you are expecting or have already welcomed your little one into
              the world, Janika will walk you through this beautiful journey.
              <br />
              Ayurveda says, “If a pregnant woman is taken care of, as advised,
              she will give birth to a child who does not have any diseases—a
              healthy, physically strong, radiant and well-nourished baby.” We
              at Janika believe every mother and baby deserves the best care
              possible – before, during, and after a newborn enters the world.
              We have designed services and solutions not only for the physical
              but also the mental well-being of the mother. You will have
              questions about how and why you should care for yourself during
              your pregnancy; we are here to answer you.
            </p>
          </div>
        </Container>

      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AdminDashBoard;
