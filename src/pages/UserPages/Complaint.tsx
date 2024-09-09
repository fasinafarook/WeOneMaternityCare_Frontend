import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { getProfileDetails, fileComplaint } from '../../api/userAPI';
import UserNavbar from '../../components/common_pages/UserHeader';
import Footer from '../../components/common_pages/Footer';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const FileComplaint: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ subject?: string; description?: string }>({});
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getProfileDetails();
        console.log('Response:', response);

        if (response && response.success && response.data) {
          setUserId(response.data._id); // Access the user ID from the `data` property
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const validateForm = () => {
    const newErrors: { subject?: string; description?: string } = {};

    if (!subject) newErrors.subject = 'Subject is required';
    // Custom validation: Subject should not exceed 100 characters
    if (subject.length > 100) newErrors.subject = 'Subject cannot exceed 100 characters';
    if (description.length < 15) newErrors.description = 'Description must be at least 15 characters long';
    
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission if there are validation errors

    if (!userId) {
      toast.error('User not logged in or user ID missing');
      return;
    }

    try {
      await fileComplaint(userId, subject, description);
      setSubject('');
      setDescription('');
      toast.success('Complaint filed successfully');
      navigate('/user/complaints'); // Redirect to the complaints view page
    } catch (error) {
      console.error('Error filing complaint:', error);
      toast.error('Failed to file complaint');
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  };

  const inputStyle = {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const textareaStyle = {
    ...inputStyle,
    height: '100px',
    resize: 'vertical',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <>
      <UserNavbar />
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={{ marginBottom: '5px', display: 'block' }}>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={inputStyle}
          />
          {errors.subject && <p style={{ color: 'red' }}>{errors.subject}</p>}
        </div>
        <div>
          <label style={{ marginBottom: '5px', display: 'block' }}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={textareaStyle}
          />
          {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
        </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Submit Complaint
        </button>
      </form>
      <Footer />
      <ToastContainer /> {/* Add ToastContainer for toast notifications */}
    </>
  );
};

export default FileComplaint;
