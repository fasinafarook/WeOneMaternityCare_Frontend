import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const footerStyle = {
    background: "linear-gradient(to right, #574B60, #D7BCC8)",
    color: "white",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  const iconStyle = {
    marginRight: "1rem",
    fontSize: "2rem",
  };

  return (
    <>
      <div style={footerStyle}>
        <Container>
          <Row>
            <Col md={4} className="mt-5 mb-5">
              <h3 className="head text-center">Maternal Care</h3>
              <p className="text-center">
                Empowering mothers through compassionate care and support, every
                step of the journey
              </p>
            </Col>
            <Col md={4} className="mt-5  text-center">
              <h4>Links</h4>
              <Link to="/" style={linkStyle}>
                <p>Home</p>
              </Link>
              <Link to="/user/verify-login" style={linkStyle}>
                <p>Login</p>
              </Link>
            </Col>
            <Col
              md={4}
              className="mt-5 text-center mb-5 d-flex flex-column justify-content-center"
            >
              <h4>Contact Us</h4>
              <hr />
              <div className="mt-2">
                <FontAwesomeIcon icon={faInstagram} style={iconStyle} />
                <FontAwesomeIcon icon={faFacebookF} style={iconStyle} />
                <FontAwesomeIcon icon={faWhatsapp} style={iconStyle} />
                <FontAwesomeIcon icon={faLocationDot} style={iconStyle} />
              </div>
            </Col>
            <p className="text-center">Copyright © 2024. All rights Reserved</p>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Footer;
