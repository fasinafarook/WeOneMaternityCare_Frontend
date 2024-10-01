import React, { useEffect, useState } from 'react';
import { getProfileDetails, getUserComplaints } from '../../api/userAPI';
import UserNavbar from '../../components/common_pages/UserHeader';
import Footer from '../../components/common_pages/Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ComplaintsList: React.FC = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(5); // Display 5 complaints per page
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserProfileAndComplaints = async () => {
      try {
        const userData = await getProfileDetails();
        if (userData && userData.success && userData.data) {
          setUserId(userData.data._id);

          const userComplaints = await getUserComplaints(userData.data._id);
          if (Array.isArray(userComplaints)) {
            setComplaints(userComplaints);
          } else {
            console.error('Complaints data not found or API response format is incorrect.');
          }
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Failed to fetch user profile or complaints:', error);
      }
    };

    fetchUserProfileAndComplaints();
  }, []);

  // Pagination Logic
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = complaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

  const totalPages = Math.ceil(complaints.length / complaintsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Inline styles
  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Full height of the viewport
      backgroundImage: `url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    content: {
      flex: 1, // Grow to fill the remaining space
      padding: '20px',
      boxSizing: 'border-box',
      backgroundColor: 'rgba(255, 255, 255, 0.85)', // Light background overlay for readability
      margin: '20px auto',
      borderRadius: '8px',
      maxWidth: '1200px',
      width: '100%',
    },
    tableContainer: {
      overflowX: 'auto', // Responsive table for smaller screens
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    thTd: {
      border: '1px solid #ddd',
      padding: '12px',
      textAlign: 'left',
    },
    th: {
      backgroundColor: '#f4f4f4',
      fontWeight: 'bold',
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
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
    paginationButton: {
      margin: '0 5px',
      padding: '8px 16px',
      border: '1px solid #ddd',
      cursor: 'pointer',
      backgroundColor: '#fff',
      transition: 'background-color 0.3s ease',
    },
    activePage: {
      backgroundColor: '#007bff',
      color: '#fff',
      fontWeight: 'bold',
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
          File New Complaint
        </button>

        {complaints.length > 0 ? (
          <div style={styles.tableContainer}>
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
                {currentComplaints.map((complaint, index) => (
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
          </div>
        ) : (
          <p>No complaints found.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                style={currentPage === i + 1 ? { ...styles.paginationButton, ...styles.activePage } : styles.paginationButton}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ComplaintsList;
