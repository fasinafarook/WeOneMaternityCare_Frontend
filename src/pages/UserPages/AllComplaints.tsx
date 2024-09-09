import React, { useEffect, useState } from 'react';
import { getProfileDetails, getUserComplaints } from '../../api/userAPI';
import UserNavbar from '../../components/common_pages/UserHeader';
import Footer from '../../components/common_pages/Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ComplaintsList: React.FC = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserProfileAndComplaints = async () => {
      try {
        const userData = await getProfileDetails();
        if (userData && userData.success && userData.data) {
          setUserId(userData.data._id);
          
          const userComplaints = await getUserComplaints(userData.data._id);
          console.log('Raw API Response:', userComplaints); // Debug the raw API response
          
          if (Array.isArray(userComplaints)) { // Directly check if the response is an array
            setComplaints(userComplaints);
            console.log('Complaints state after setting:', userComplaints);
          } else {
            console.error("Complaints data not found or API response format is incorrect.");
          }
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Failed to fetch user profile or complaints:", error);
      }
    };
  
    fetchUserProfileAndComplaints();
  }, []);

  console.log('complaints state', complaints); // Log the complaints state

  // Inline styles
  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Full height of the viewport
    },
    content: {
      flex: 1, // Grow to fill the remaining space
      padding: '20px',
      boxSizing: 'border-box',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    thTd: {
      border: '1px solid #ddd',
      padding: '12px',
    },
    th: {
      backgroundColor: '#f4f4f4',
    },
    trEven: {
      backgroundColor: '#f9f9f9',
    },
    trHover: {
      backgroundColor: '#ddd',
    },
    button: {
        margin: '10px 0',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      },
    statusPending: {
      color: 'red',
      fontWeight: 'bold',
    },
    statusResolved: {
      color: 'green',
      fontWeight: 'bold',
    },
  };

  const handleNewComplaint = () => {
    navigate('/user/new-complaint'); // Redirect to the new complaint page
  };

  return (
    <div style={styles.pageContainer}>
      <UserNavbar />
      <div style={styles.content}>
        <h2>Your Complaints</h2>

        <button style={styles.button} onClick={handleNewComplaint}>
           Complaint
        </button>
        {complaints.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Subject</th>
                <th style={styles.th}>Message</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Response</th> {/* New column for the response */}
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr
                  key={complaint._id}
                  style={index % 2 === 0 ? styles.trEven : {}}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <td style={styles.thTd}>{complaint.subject}</td>
                  <td style={styles.thTd}>{complaint.message}</td>
                  <td style={styles.thTd}>
                    <span style={complaint.isResolved ? styles.statusResolved : styles.statusPending}>
                      {complaint.isResolved ? 'Resolved' : 'Pending'}
                    </span>
                  </td>
                  <td style={styles.thTd}>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td style={styles.thTd}>{complaint.isResolved ? complaint.response : '-'}</td> {/* Show the response message if resolved */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No complaints found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ComplaintsList;
