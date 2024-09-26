import React from 'react';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import AppNavbar from './ProviderHeader';
import UserNavbar from './UserHeader';

const About: React.FC = () => {
  const location = useLocation(); 

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',

    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lineHeight: '1.6',
    color: '#333',
    fontFamily: '"Helvetica Neue", Arial, sans-serif'
  };
  
  const headingStyle = {
    color: '#2b6777',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px'
  };
  
  const strongStyle = {
    color: '#2b6777',
    fontWeight: 'bold'
  };
  
  const sectionStyle = {
    marginBottom: '30px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  };
  
  const listStyle = {
    paddingLeft: '20px',
    marginTop: '10px',
    listStyleType: 'disc',
    color: '#495057'
  };
  const isServiceProvider = location.pathname.startsWith('/serviceProvider');

  return (
    <>
      {isServiceProvider ? <AppNavbar /> : <UserNavbar />}
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
    <Footer/></>
  );
};



export default About;
