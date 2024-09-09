import React from 'react';

const About: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    marginTop: '20px',
    padding: '0 15px',
  };

  const headingStyle: React.CSSProperties = {
    color: '#007bff',
    textAlign: 'center',
    margin: '20px 0',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '20px',
  };

  const listStyle: React.CSSProperties = {
    marginLeft: '20px',
  };

  const strongStyle: React.CSSProperties = {
    color: '#343a40',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>About Maternal Care Hub</h1>
      <p>
        Welcome to <strong style={strongStyle}>Maternal Care Hub</strong>, a dedicated platform designed to support and enhance maternal health during and after pregnancy. We understand that expecting and new mothers face numerous challenges, from accessing quality care to managing stress and anxiety. Our mission is to bridge these gaps and provide comprehensive, personalized care through a user-friendly and centralized platform.
      </p>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Our Mission</h2>
        <p>
          Maternal health encompasses the physical, mental, emotional, and social well-being of mothers and their babies. We are committed to ensuring that every mother experiences positive health outcomes and receives the best possible care throughout her maternity journey.
        </p>
      </div>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Our Vision</h2>
        <p>
          <strong style={strongStyle}>Maternal Care Hub</strong> aims to:
          <ul style={listStyle}>
            <li><strong>Centralize Maternal Care:</strong> Provide a single platform where mothers can access a wide range of services, from doctor consultations and emergency care to nursing and yoga.</li>
            <li><strong>Offer Personalized Support:</strong> Tailor care recommendations and services to individual needs, ensuring each mother receives the support that's right for her.</li>
            <li><strong>Improve Access and Communication:</strong> Simplify the process of booking appointments and communicating with service providers to reduce stress and improve overall experiences.</li>
            <li><strong>Enhance Information Access:</strong> Provide comprehensive and easily accessible information about maternal health, helping mothers make informed decisions.</li>
          </ul>
        </p>
      </div>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Why Maternal Care Hub?</h2>
        <p>
          Many mothers face difficulties accessing cohesive care due to fragmented platforms, limited information, and poor communication with service providers. <strong style={strongStyle}>Maternal Care Hub</strong> addresses these issues by offering:
          <ul style={listStyle}>
            <li><strong>Seamless Booking:</strong> An easy-to-use system for scheduling consultations, emergency care, and other services.</li>
            <li><strong>Comprehensive Information:</strong> Access to valuable resources and information tailored to maternal health.</li>
            <li><strong>Better Communication:</strong> Improved channels for interacting with service providers, reducing misunderstandings and enhancing support.</li>
          </ul>
        </p>
      </div>
      <p>
        At <strong style={strongStyle}>Maternal Care Hub</strong>, our goal is to make maternal care more accessible, integrated, and supportive, helping mothers navigate their journey with confidence and ease.
      </p>
    </div>
  );
};

export default About;
