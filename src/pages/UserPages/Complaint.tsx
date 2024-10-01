import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { getProfileDetails, fileComplaint } from '../../api/userAPI';
import UserNavbar from '../../components/common_pages/UserHeader';
import Footer from '../../components/common_pages/Footer';
import toast from 'react-hot-toast'; // Import toast from react-hot-toast

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
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const validateForm = () => {
    const newErrors: { subject?: string; description?: string } = {};

    if (!subject) newErrors.subject = 'Subject is required';
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

  // Styling for the page container with background image
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: "url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  // Centered form container style with responsive padding
  const formContainerStyle = {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent background for readability
  };

  // Form styling for a clean look with rounded corners and responsive width
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '600px',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff', // Solid white background for the form itself
  };

  // Input styling with responsive design
  const inputStyle = {
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  };

  // Textarea styling
  const textareaStyle = {
    ...inputStyle,
    height: '120px',
    resize: 'vertical',
  };

  // Button styling for consistent design and responsiveness
  const buttonStyle = {
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',
    boxSizing: 'border-box',
  };

  // Button hover effect
  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  // Responsive font sizes
  const labelStyle = {
    marginBottom: '8px',
    fontSize: '16px',
  };

  return (
    <>
    <div style={containerStyle}>
      <UserNavbar />
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label style={labelStyle}>Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={inputStyle}
              placeholder="Enter subject"
            />
            {errors.subject && <p style={{ color: 'red' }}>{errors.subject}</p>}
          </div>
          <div>
            <label style={labelStyle}>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={textareaStyle}
              placeholder="Enter complaint description"
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
      </div>
    </div>
          <Footer />
</>
  );
};

export default FileComplaint;
