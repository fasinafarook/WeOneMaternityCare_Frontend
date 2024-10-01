import React, { useState, useEffect } from "react";
import { Row, Col, Card, Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserNavbar from "../../components/common_pages/UserHeader";
import Footer from "../../components/common_pages/Footer";
import {
  getProfileDetails,
  fetchApprovedAndUnblockedProviders,
  fetchCategories,
} from "../../api/userAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import { ServiceProvider } from "../../types/SeviceProviders";

interface ServiceProvider {
  _id: string;
  name: string;
  service: string;
  profilePicture: string;
  expYear: string;
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

        const sortedProviders = mappedProviders
          .sort((a, b) => b.expYear - a.expYear)
          .slice(0, 10);
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
            'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://th.bing.com/th/id/OIP.oGWOHE4KjkERZe-JufmDCAAAAA?rs=1&pid=ImgDetMain")',
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
                Empower mothers on their incredible journey with our trusted
                resources and support. Connect with mothers-to-be, offering
                services like yoga therapy, pre-delivery care, and more.
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
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f3722c")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f9c74f")
                  }
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
          backgroundColor: "#D3D3D3",
          borderTop: "1px solid #ccc",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <h2
          style={{
            color: "#333",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "36px",
            marginBottom: "2rem",
          }}
        >
          Service Providers
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
            transition: "background-color 0.3s ease",
            fontSize: "16px",
            zIndex: 900, // Ensure the button is above other elements
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#d65b1f")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f3722c")
          }
        >
          View More
        </button>

        <Carousel
          interval={3000}
          controls={true}
          indicators={true}
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {Array.from(
            { length: Math.ceil(providers.length / 4) },
            (_, index) => (
              <Carousel.Item key={index}>
                <Row className="mx-auto" style={{ justifyContent: "center" }}>
                  {providers.slice(index * 4, index * 4 + 4).map((provider) => (
                    <Col
                      sm={12}
                      md={6}
                      lg={3}
                      className="mb-4"
                      key={provider._id}
                    >
                      <Card
                        style={{
                          border: "none",
                          borderRadius: "15px",
                          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                          transition: "transform 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
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
                              color: "#333",
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
                            }}
                          >
                            View Details
                          </button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            )
          )}
        </Carousel>
      </div>

      <div
        style={{
          padding: "12rem 0",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          backgroundImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://www.nacmedicalcenter.com/images/global/hero-images/obstetrics-default-min.jpg?sfvrsn=f8b7e497_2")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <h2
          style={{
            color: "#fff",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "48px",
            letterSpacing: "2px",
            marginBottom: "1rem",
            textTransform: "uppercase",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
            animation: "fadeInDown 1s ease-in-out",
          }}
        >
          Our Services
        </h2>
        <p
          style={{
            maxWidth: "800px",
            fontSize: "18px",
            lineHeight: "1.5",
            marginBottom: "4rem",
            fontFamily: "'Open Sans', sans-serif",
            textShadow: "1px 1px 8px rgba(0, 0, 0, 0.3)",
            animation: "fadeInUp 1s ease-in-out",
          }}
        >
          Maternal health encompasses the physical, mental, emotional, and
          social well-being of mothers and their babies. We are committed to
          ensuring that every mother experiences positive health outcomes and
          receives the best possible care throughout her maternity journey.
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
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "15px",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                    backdropFilter: "blur(10px)",
                    transition: "transform 0.5s ease-in-out",
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
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "15px",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                  backdropFilter: "blur(10px)",
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
