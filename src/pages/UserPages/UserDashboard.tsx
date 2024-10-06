import React, { useState, useEffect } from "react";
import { Row, Col, Card, Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserNavbar from "../../components/common_pages/UserHeader";
import Footer from "../../components/common_pages/Footer";
import { getProfileDetails, fetchApprovedAndUnblockedProviders, fetchCategories } from "../../api/userAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import { ServiceProvider } from "../../types/SeviceProviders";

interface ServiceProvider {
  _id: string;
  name: string;
  service: string;
  profilePicture: string;
  expYear:string
}
interface ProfileData {
  name: string;
}

const ClientDashboard: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await getProfileDetails();
        setProfileData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleViewDetails = (providerId: string) => {
    navigate(`/user/serviceProviderDetails/${providerId}`);
  };
  const handleViewMore = () => {
    navigate("/user/service-providers");
  };
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const allProviders = await fetchApprovedAndUnblockedProviders();
        const mappedProviders = allProviders.map((provider: any) => ({
          _id: provider._id,
          name: provider.name,
          expYear: provider.expYear,
          profilePicture: provider.profilePicture,
          service: provider.service,
          path: `/user/serviceProvider/${provider._id}`,
        }));

        const sortedProviders = mappedProviders.sort((a, b) => b.expYear - a.expYear).slice(0, 10);
        setProviders(sortedProviders);
      } catch (error) {
        console.error("Failed to fetch providers:", error);
      }
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const categoryData = await fetchCategories();
      setCategories(categoryData);
    };
    fetchCategoryData();
  }, []);

  return (
    <>
      <UserNavbar />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://www.med4you.it/wp-content/uploads/2016/10/ginecologia.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#f4f4f9",
          padding: "4rem 0",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Row className="mx-auto text-center" style={{ maxWidth: "900px" }}>
            <Col sm={12} className="mb-4">
              <h1
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "#f9c74f",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.9)",
                  animation: "fadeInDown 1.2s ease-in-out",
                }}
              >
                {profileData ? (
                  <span>Welcome, {profileData.name}!</span>
                ) : (
                  <span>Loading...</span>
                )}
              </h1>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "20px",
                  fontWeight: "300",
                  lineHeight: "1.8",
                  letterSpacing: "0.5px",
                  color: "#f9f9f9",
                  textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                Empower mothers on their incredible journey with our trusted resources and support. Connect with mothers-to-be, offering services like yoga therapy, pre-delivery care, and more.
              </p>
              <Link to="/user/about">
                <button
                  style={{
                    backgroundColor: "#f9c74f",
                    color: "white",
                    padding: "12px 30px",
                    fontSize: "18px",
                    borderRadius: "30px",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "2rem",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3722c")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f9c74f")}
                >
                  <FontAwesomeIcon icon={faInfoCircle} /> Learn More
                </button>
              </Link>
            </Col>
          </Row>
        </div>
      </div>

      {/* Sliding Cards Section */}
      
      <div
  style={{
    padding: "4rem 0",
    textAlign: "center",
    background: "#fffff", // Darker shades for the gradient
    borderTop: "1px solid #ccc",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", // Increased shadow for depth
    position: "relative",
    overflow: "hidden", // Prevent overflow from child elements
    borderRadius: "20px", // Rounded corners for a softer look
  }}
>
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "90%", // Width of the hole effect
      height: "90%", // Height of the hole effect
      background: "linear-gradient(to bottom right, #b0c4d6 50%, #6c9eab 50%)", // Darker shades for the gradient
      borderRadius: "20px", // Match border radius with the parent
      transform: "translate(-50%, -50%)", // Center the hole
      zIndex: 1,
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
    }}
  />

<h2
  style={{
    color: "#ffffff", // Changed to white for better contrast
    fontFamily: "'Poppins', sans-serif",
    fontSize: "3rem", // Increased font size
    marginBottom: "2rem",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // More pronounced shadow for depth
    position: "relative", // To keep it above the "hole" div
    zIndex: 2,
    padding: "0.5rem 1rem", // Padding for a better touch target
    borderRadius: "10px", // Rounded corners
    background: "linear-gradient(to bottom right, #b0c4d6 50%, #6c9eab 50%)", // Updated gradient
    display: "inline-block", // Ensures the background fits tightly around the text
    overflow: "hidden", // Prevents any overflow from child elements
  }}
>
  Our Service Providers
</h2>


  <button
    onClick={handleViewMore}
    style={{
      position: "absolute",
      top: "1rem",
      right: "2rem",
      padding: "0.75rem 1.5rem",
      backgroundColor: "#f3722c",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.3s ease", // Added transform transition
      fontSize: "1rem", // Adjusted font size
      zIndex: 3,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "#d65b1f";
      e.currentTarget.style.transform = "scale(1.05)"; // Slight scaling on hover
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "#f3722c";
      e.currentTarget.style.transform = "scale(1)"; // Reset scaling
    }}
  >
    View More
  </button>
  
  <Carousel
    interval={3000}
    controls={true}
    indicators={true}
    style={{ maxWidth: "1100px", margin: "0 auto", zIndex: 2 }} // Ensure carousel stays above the hole
  >
    {Array.from({ length: Math.ceil(providers.length / 4) }, (_, index) => (
      <Carousel.Item key={index}>
        <Row className="mx-auto" style={{ justifyContent: "center" }}>
          {providers.slice(index * 4, index * 4 + 4).map((provider) => (
            <Col sm={12} md={6} lg={3} className="mb-4" key={provider._id}>
              <Card
                style={{
                  border: "none",
                  borderRadius: "15px",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease", // Added transition for box-shadow
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.2)"; // Enhanced shadow on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.1)"; // Reset shadow
                }}
              >
                <Card.Img
                  variant="top"
                  src={provider.profilePicture}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "15px 15px 0 0",
                  }}
                />
                <Card.Body>
                  <Card.Title
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#2c3e50", // Consistent text color
                    }}
                  >
                    {provider.name}
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "16px",
                      color: "#555",
                    }}
                  >
                    Experience: {provider.expYear} years
                    <br />
                    Service: {provider.service}
                  </Card.Text>
                  <button
                    onClick={() => handleViewDetails(provider._id)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#f3722c",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "color 0.3s ease", // Transition for color
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#d65b1f")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#f3722c")}
                  >
                    View Details
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Carousel.Item>
    ))}
  </Carousel>
</div>


<div
  style={{
    padding: "12rem 0",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    backgroundImage:
      'url("https://th.bing.com/th/id/OIP.XJjdX2sEHms0d4JpkuoU9QHaHa?w=1080&h=1080&rs=1&pid=ImgDetMain")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
    overflow: "hidden", // Prevent overflow for visual effects
  }}
>
  {/* Overlay for text contrast */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
      zIndex: 1, // Place below text
    }}
  />

  <h2
    style={{
      color: "#ffffff", // Changed to white for better contrast
      fontFamily: "'Poppins', sans-serif",
      fontSize: "48px",
      letterSpacing: "2px",
      marginBottom: "1rem",
      textTransform: "uppercase",
      textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)", // More intense shadow
      zIndex: 2,
      position: "relative", // Ensure it appears above overlay
      animation: "fadeInDown 1s ease-in-out",
    }}
  >
    Our Services
  </h2>
  <p
    style={{
      color: "#ffffff", // Changed to white for better contrast
      maxWidth: "800px",
      fontSize: "18px",
      lineHeight: "1.5",
      marginBottom: "4rem",
      fontFamily: "'Open Sans', sans-serif",
      textShadow: "1px 1px 8px rgba(0, 0, 0, 0.5)", // More intense shadow
      zIndex: 2,
      position: "relative",
      animation: "fadeInUp 1s ease-in-out",
    }}
  >
    Maternal health encompasses the physical, mental, emotional, and social
    well-being of mothers and their babies. We are committed to ensuring
    that every mother experiences positive health outcomes and receives the
    best possible care throughout her maternity journey.
  </p>

  {/* Carousel Section */}
  <Carousel
    controls={true}
    indicators={true}
    interval={3000}
    fade={true}
    style={{
      maxWidth: "900px",
      width: "100%",
      zIndex: 2,
      position: "relative", // Ensure it appears above overlay
      animation: "fadeInUp 1.5s ease-in-out",
    }}
  >
    {categories.length > 0 ? (
      categories.map((category, index) => (
        <Carousel.Item key={index}>
          <div
            style={{
              padding: "50px",
              textAlign: "center",
              backgroundColor: "#f3722c",
              borderRadius: "15px",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)", // Enhanced shadow
              backdropFilter: "blur(15px)", // Increased blur effect
              transition: "transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
              transform: "scale(1)", // Default scale
              zIndex: 2, // Ensure above overlay
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"; // Slight scaling on hover
              e.currentTarget.style.boxShadow = "0 20px 50px rgba(0, 0, 0, 0.4)"; // Enhanced shadow on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset scaling
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.3)"; // Reset shadow
            }}
          >
            <h3
              style={{
                fontSize: "30px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "bold",
                color: "#333",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {category}
            </h3>
          </div>
        </Carousel.Item>
      ))
    ) : (
      <Carousel.Item>
        <div
          style={{
            padding: "50px",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly more opaque for better visibility
            borderRadius: "15px",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)", // Enhanced shadow
            backdropFilter: "blur(15px)", // Increased blur effect
            zIndex: 2, // Ensure above overlay
          }}
        >
          <h3>No categories available</h3>
        </div>
      </Carousel.Item>
    )}
  </Carousel>
</div>

      <Footer />
    </>
  );
};

export default ClientDashboard;
