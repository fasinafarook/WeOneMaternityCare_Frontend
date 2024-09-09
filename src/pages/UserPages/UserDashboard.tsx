import { useState, useEffect } from "react";
import {  Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import { FaBars } from 'react-icons/fa';
import UserNavbar from "../../components/common_pages/UserHeader";
import Footer from "../../components/common_pages/Footer";
import { getProfileDetails } from '../../api/userAPI';
// import UserSidebar from "../../components/common_pages/UserSidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle} from '@fortawesome/free-solid-svg-icons';
// import { faDumbbell } from '@fortawesome/free-solid-svg-icons'; // Use an alternative icon


interface ProfileData {
  name: string;
}

const ClientDashboard = () => {
  // const [show, setShow] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
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

      <div style={{ 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundImage: 'url("https://th.bing.com/th/id/OIP.0a7NCcpOi66xf1GMXo_VbwHaE8?w=286&h=191&c=7&r=0&o=5&dpr=1.3&pid=1.7")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#333', 
      }}>
        <div style={{ flex: 1, padding: '2rem' }}>
          <Row className="mx-3 my-5">
            <Col sm={12} md={6}>
              {/* Optional image or other content */}
            </Col>
            <Col sm={12} md={6} className="text-center">
              <h1 style={{
                fontFamily: "'Poppins', sans-serif",  
                fontSize: '32px',  
                fontWeight: '600',  
                marginBottom: '20px',  
                color: '#424874',  
              }}>
                {profileData ? (
                  <span>Welcome, {profileData.name}!</span>
                ) : (
                  <span>Loading...</span>
                )}
              </h1>
              <p 
                style={{
                  fontFamily: "'Poppins', sans-serif", 
                  fontSize: '18px',  
                  fontWeight: '300',  
                  lineHeight: '1.6',  
                  letterSpacing: '0.5px',  
                  color: '#424874',  
                }}
              >
                Empower mothers on their incredible journey with our trusted resources and support. Here, you can seamlessly connect with mothers-to-be, offering a range of services including yoga therapy, pre-delivery care, doctor support, and much more. Together, let's make every step of the pregnancy journey as smooth and enriching as possible.
              </p>
              <Link to="/about"> 
                <button
                  style={{
                    backgroundColor: 'rgba(255,213,79,1)', 
                    color: 'white', 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    borderRadius: '5px', 
                    border: 'none', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(245,133,41,1)')} 
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,213,79,1)')} 
                >
                  <FontAwesomeIcon icon={faInfoCircle} /> 
                  Learn More
                </button>
              </Link>
            </Col>
          </Row>

          {/* Our Doctors Feature */}
        
        </div>
{/* <div>
<Container>
            <h2 className="text-center mb-4" style={{ color: '#424874', fontWeight: '600' }}>Our Doctors</h2>
            <Row>
              <Col md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <FontAwesomeIcon icon={faUserMd} size="3x" style={{ color: '#f68b1f' }} />
                    <Card.Title className="mt-3">Doctor Available</Card.Title>
                    <Card.Text>
                      Connect with experienced doctors who are available to support you throughout your pregnancy.
                    </Card.Text>
                    <Link to="/doctors" className="btn btn-primary">View Doctors</Link>
                  </Card.Body>
                </Card>
              </Col> */}

              {/* Pre-delivery Service Providers */}
              {/* <Col md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <FontAwesomeIcon icon={faBaby} size="3x" style={{ color: '#f68b1f' }} />
                    <Card.Title className="mt-3">Pre-delivery Service Providers</Card.Title>
                    <Card.Text>
                      Our pre-delivery service providers offer the best care to ensure a healthy and smooth delivery process.
                    </Card.Text>
                    <Link to="/pre-delivery" className="btn btn-primary">View Pre-delivery Services</Link>
                  </Card.Body>
                </Card>
              </Col> */}

              {/* Post-delivery Service Providers */}
              {/* <Col md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <FontAwesomeIcon icon={faBaby} size="3x" style={{ color: '#f68b1f' }} />
                    <Card.Title className="mt-3">Post-delivery Service Providers</Card.Title>
                    <Card.Text>
                      Post-delivery services to ensure both mother and baby receive the best care after childbirth.
                    </Card.Text>
                    <Link to="/post-delivery" className="btn btn-primary">View Post-delivery Services</Link>
                  </Card.Body>
                </Card>
              </Col> */}

              {/* Yoga Therapists */}
              {/* <Col md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <FontAwesomeIcon icon={faDumbbell} size="3x" style={{ color: '#f68b1f' }} />
                    <Card.Title className="mt-3">Yoga Therapists Available</Card.Title>
                    <Card.Text>
                      Join our yoga therapy sessions designed to support mothers through each stage of pregnancy.
                    </Card.Text>
                    <Link to="/yoga" className="btn btn-primary">View Yoga Therapists</Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
</div> */}
        <Footer />
      </div>
    </>
  );
};

export default ClientDashboard;
