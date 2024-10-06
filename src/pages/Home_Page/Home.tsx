import React from "react";
import "./Home.css";
import logo from "../../../src/public/images/logo.jpeg";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import img1 from "../../../src/public/images/img1.jpeg";
import img2 from "../../../src/public/images/img2.jpeg";
import img7 from "../../../src/public/images/img3.jpeg";
import img5 from "../../../src/public/images/img4.jpeg";
import Footer from "../../components/common_pages/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

// Define any props here if needed
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <div className="bg-image">
        <div className="d-flex  justify-content-between align-items-center p-3">
          <Link to="/">
            <img
              src={logo}
              style={{ height: "100px", width: "100px" }}
              alt="banner"
            />
          </Link>
          <Dropdown
            className="ms-auto me-5 mt-3"
            style={{ height: "50px", width: "50px", borderRadius: "25px" }}
          >
            <Dropdown.Toggle
              className="dropdown mt-2 me-2"
              style={{
                backgroundColor: " rgba(0, 0, 0, 0)",
                height: "50px",
                width: "50px",
                borderRadius: "25px",
                borderColor: "rgba(0, 0, 0, 0)",
              }}
              id="dropdown-basic"
            >
              <h1 className=" text-secondary">
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{
                    height: "40px",
                    width: "50px",
                    fontFamily: "Poppins, sans-serif",
                    margin: "-8px 0",
                    alignItems: "center",
                    color: "black",
                  }}
                />
                Login
              </h1>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/serviceProvider/serviceProvider-register">
                Service Provider
              </Dropdown.Item>
              <Dropdown.Item href="/user/client-register">Client</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column mt-5">
          <h1
            className="text-light"
            style={{
              fontFamily: "Righteous, sans-serif", // Stylish font
              fontWeight: 600, // Semibold weight
              marginTop: "5rem", // Top margin
              fontSize: "2rem", // Default font size
              textAlign: "center", // Center the text
              lineHeight: "1.4", // Line height for readability
              color: "#ffffff", // Light text color
            }}
          >
            <span
              style={{
                fontSize: "2.5rem", // Larger font size for the main title
                display: "block", // Display block for line break
              }}
            >
              Welcome to WeOne MaternityCare
            </span>

            <span
              style={{
                fontSize: "1.5rem", // Medium font size for the subtitle
                display: "block", // Display block for line break
              }}
            >
              Your trusted partner in pregnancy care and women's health.
            </span>

            <span
              style={{
                fontSize: "2rem", // Default size for the third line
                display: "block", // Display block for line break
              }}
            >
              Begin your child's journey with Us
            </span>
          </h1>

          <Link
            to="/user/verify-login"
            className="d-flex justify-content-center align-items-center login-link"
          >
            <button
              className="btn text-light w-100 btn-get-start mt-3"
              style={{
                backgroundColor: "#6a697f",
                borderColor: "#ddd",
                fontFamily: "Poppins, sans-serif",
                fontSize: "1rem",
              }}
            >
              Get Started <FontAwesomeIcon icon={faRightToBracket} />
            </button>
          </Link>
        </div>
      </div>

      <div className="container mt-5 mb-5  ">
        <Row>
          <Col md={6}>
            <img
              src="https://images.pexels.com/photos/3398674/pexels-photo-3398674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              style={{ height: "400px", width: "100%", borderRadius: "40px" }}
              alt="about us"
            />
          </Col>
          <Col md={6}>
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
            <h4 className="text-center fw-bold">
              Personalized maternity care,
              <br /> tailored to your needs.
            </h4>
          </Col>
        </Row>
      </div>

      <Container>
        <Row>
          <h2 className="text-center mt-4 mb-4">Our Services</h2>
          <Col md={3} className="text-center mt-3">
            <img
              src={img2}
              style={{ height: "80px", width: "80px" }}
              alt="service4"
            />
            <h4>Pre Delivery Care</h4>
            <p className="service_description">
              All aspects that could influence the health and development of a
              baby are guided by us, and we at Janika will be there to help you
              welcome the new addition to your life.
            </p>
          </Col>
          <Col md={3} className="text-center mt-3">
            <img
              src={img7}
              style={{ height: "80px", width: "90px" }}
              alt="service2"
            />
            <h4>Yoga Therapy</h4>
            <p className="service_description">
              Pregnancy may be one of the happiest phases in a woman’s life, but
              there is no denying that the stress and strains it puts a woman’s
              body through are immense. Yoga is extremely beneficial and can
              help one recover from the effects of childbirth smoothly.
            </p>
          </Col>
          <Col md={3} className="text-center mt-3">
            <img
              src={img5}
              style={{ height: "80px", width: "80px" }}
              alt="service3"
            />
            <h4>Doctors Support</h4>
            <p className="service_description">
              Motherhood is a wonderful phase in every women’s life, but it also
              comes with doubts and confusion about what to do what not to do,
              what is right and what is wrong. New moms through a lot of
              insecurities and stress during this time. That’s when Janika comes
              to the rescue.
            </p>
          </Col>
          <Col md={3} className="text-center mt-3">
            <img
              src={img1}
              style={{ height: "80px", width: "80px" }}
              alt="service1"
            />
            <h4>Post Delivery Care</h4>
            <p className="service_description">
              The premium package which gives the ultimate Ayurveda care for new
              moms and babies. Stimulates blood circulation, prevents postpartum
              hair fall, reshapes your body, and gives glow to your skin. A
              complete rejuvenating process.
            </p>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5">
        <Row>
          <Col md={3}>
            <img
              src="https://images.pexels.com/photos/5424696/pexels-photo-5424696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              style={{ height: "300px", width: "100%", borderRadius: "40px" }}
              alt="contactus1"
            />
          </Col>
          <Col md={3} className="mt-5">
            <img
              src="https://images.pexels.com/photos/7282475/pexels-photo-7282475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              style={{ height: "300px", width: "100%", borderRadius: "40px" }}
              alt="contactus2"
            />
          </Col>
          <Col md={6} className="mt-5">
            <h2 className="text-center">Contact Us</h2>
            <div className="ms-5">
              <p className="mt-3">
                <i
                  className="fa-solid fa-location-dot me-4"
                  style={{ color: "rgb(26, 87, 109)" }}
                ></i>
                vadakara, Calicut, Kerala 673508
              </p>
              <p className="mt-3">
                <i
                  className="fa-solid fa-phone me-4"
                  style={{ color: "rgb(26, 87, 109)" }}
                ></i>
                +91 8921951119
              </p>
              <p className="mt-3">
                <i
                  className="fa-solid fa-envelope me-4"
                  style={{ color: "rgb(26, 87, 109)" }}
                ></i>
                WeOneMaternitycare@gmail.com
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* <div className="review_container">
        <Container className="mt-5 pt-5 ">
          <Row>
            <h2 className="text-center mb-5">Reviews</h2>
            <Carousel>
              <Carousel.Item className="mb-4">
                <Col
                  md={12}
                  className="d-flex justify-content-center align-items-center flex-column"
                >
                  <img
                    src="https://images.pexels.com/photos/3319310/pexels-photo-3319310.jpeg"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50px",
                    }}
                    alt="profile"
                  />
                  <p className="text-center mt-3">
                    My Therapists Bhavya was very gentle with baby and great for
                    my massage well. She was very professional, experienced and
                    followed hygiene protocol. I would recommend Janika for new
                    born baby and mother massage.
                  </p>
                </Col>
              </Carousel.Item>
              <Carousel.Item className="mb-4">
                <Col
                  md={12}
                  className="d-flex justify-content-center align-items-center flex-column"
                >
                  <img
                    src="https://images.pexels.com/photos/7155244/pexels-photo-7155244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50px",
                    }}
                    alt="profile"
                  />
                  <p className="text-center mt-3">
                    I am availing the service from Janika along with products
                    they sent. The therapist who is assigned to me is very
                    experienced one , Therapist Prabitha is very professional
                    and also very good in giving treatment. I am loving all the
                    pamper from Prabitha and Janika products she uses for
                    therapy.
                  </p>
                </Col>
              </Carousel.Item>
              <Carousel.Item className="mb-4">
                <Col
                  md={12}
                  className="d-flex justify-content-center align-items-center flex-column"
                >
                  <img
                    src="https://images.pexels.com/photos/8359636/pexels-photo-8359636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50px",
                    }}
                    alt="profile"
                  />
                  <p className="text-center mt-3">
                    I have used Janika Ayurveda services since pregnancy and
                    postpartum. I had got 2 wonderful therapists Bindhu chechi
                    and Anjali chechi. Both took really good care of me and my
                    baby. Thankful to my therapists immensely.
                  </p>
                </Col>
              </Carousel.Item>
            </Carousel>
          </Row>
        </Container>
        </div> */}
      <Footer />
    </>
  );
};

export default Home;
