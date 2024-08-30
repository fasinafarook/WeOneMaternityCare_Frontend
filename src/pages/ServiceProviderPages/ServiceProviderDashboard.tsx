import { useState ,useEffect} from 'react';
import {  Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import Footer from '../../components/common_pages/Footer';
import providerhero from "../../../public/images/img2.jpeg";
import { FaBars } from 'react-icons/fa'; // Import the FaUserCircle icon
import AppNavbar from '../../components/common_pages/ProviderHeader';
import { getProfileDetails } from '../../api/serviceProviderAPI';
import Sidebar from '../../components/common_pages/ProviderSidebars';

interface ProfileData {
  name: string;
}


const ProviderPage = () => {
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
    <AppNavbar/>
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
        <Sidebar show={show} handleClose={handleClose} />

        {/* Main Content */}
        <div style={{ flex: '1', padding: '2rem' }}>
          <Row className="mx-3 my-5">
            <Col sm={12} md={6}>
              <img
                src={providerhero}
                alt="user-hero"
                style={{ objectFit: 'contain', width: '100%' , height:'250px' }}
              />
              
            </Col>
            
            <Col sm={12} md={6} className="text-center">
            <h1>
                {profileData ? (
                  <span>Welcome, {profileData.name}!</span>
                ) : (
                  <span>Loading...</span>
                )}
                </h1>
              <p className="fs-5 poppins-light mb-3">
                Empower mothers on their incredible journey with our trusted resources
                and support. Here, you can seamlessly connect with mothers-to-be,
                offering a range of services including yoga therapy, pre-delivery
                care, doctor support, and much more. Together, let's make every step
                of the pregnancy journey as smooth and enriching as possible.
              </p>
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProviderPage;
