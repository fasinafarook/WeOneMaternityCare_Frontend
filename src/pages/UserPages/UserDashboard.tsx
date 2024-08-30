import { useState, useEffect } from "react";
import userHero from "../../../public/images/img1.jpeg";
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import UserNavbar from "../../components/common_pages/UserHeader";
import Footer from "../../components/common_pages/Footer";
import { getProfileDetails } from '../../api/userAPI';
import UserSidebar from "../../components/common_pages/UserSidebar";

interface ProfileData {
  name: string;
}

const ClientDashboard = () => {
  const [show, setShow] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => { 
      try {
        const { data } = await getProfileDetails();
        console.log('data: ', data);
        setProfileData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <UserNavbar />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Toggle Button */}
        <Button 
          variant="primary" 
          onClick={handleShow} 
          style={{ 
            position: 'absolute', 
            top: '1rem', 
            left: '1rem', 
            zIndex: 1000 
          }}
        >
          <FaBars /> Menu
        </Button>

        {/* Sidebar */}
        <UserSidebar show={show} handleClose={handleClose} />


        {/* Main Content */}
        <div style={{ flex: 1, padding: '2rem' }}>
          <Row className="mx-3 my-5">
            <Col sm={12} md={6}>
              <img
                src={userHero}
                alt="user-hero"
                style={{ objectFit: 'contain', width: '100%', height: '300px' }}
              />
            </Col>
            <Col sm={12} md={6} className="text-center">
              <p className="fs-5 poppins-light mb-3">
                <h1>
                {profileData ? (
                  <span>Welcome, {profileData.name}!</span>
                ) : (
                  <span>Loading...</span>
                )}
                </h1>
                <br />
                Empowering mothers with trusted information, support, and resources
                throughout their pregnancy journey.<br />
                Empower mothers on their incredible journey with our trusted resources
                and support. Here, you can seamlessly connect with mothers-to-be,
                offering a range of services including yoga therapy, pre-delivery
                care, doctor support, and much more. Together, let's make every step
                of the pregnancy journey as smooth and enriching as possible.<br />
                Our website offers a range of services including yoga therapy,
                pre-delivery care, doctors support, and much more.
              </p>
            </Col>
          </Row>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default ClientDashboard;
