import React, { useEffect, useState } from 'react';
import { fetchComplaints, respondToComplaint } from '../../api/adminAPI';
import AdminNavbar from '../../components/common_pages/AdminHeader';
import Footer from '../../components/common_pages/Footer';
import { Modal, Button } from 'react-bootstrap';

const ComplaintsPage: React.FC = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null);
  const [response, setResponse] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'responded' | 'unresponded'>('all');

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const data = await fetchComplaints();
        setComplaints(data);
      } catch (err) {
        setError('Failed to load complaints');
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, []);

  const handleRespondClick = (complaint: any) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedComplaint(null);
    setResponse('');
    setResponseError(null);
    setShowModal(false);
  };

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
    if (e.target.value.length >= 15) {
      setResponseError(null);
    }
  };

  const handleSubmitResponse = async () => {
    if (response.trim().length < 15) {
      setResponseError('Response must be at least 15 characters long.');
      return;
    }

    if (selectedComplaint) {
      try {
        await respondToComplaint({ complaintId: selectedComplaint._id, response });

        alert('Response sent successfully');
        setSelectedComplaint(null);
        setResponse('');
        setShowModal(false);
        const data = await fetchComplaints();
        setComplaints(data);
      } catch (err) {
        alert('Failed to send response');
      }
    }
  };

  const getFilteredComplaints = () => {
    if (filter === 'responded') {
      return complaints.filter(complaint => complaint.isResolved);
    } else if (filter === 'unresponded') {
      return complaints.filter(complaint => !complaint.isResolved);
    }
    return complaints;
  };

  if (loading) return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  if (error) return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{error}</div>;

  return (
    <>
      <AdminNavbar />
      <div style={{ minHeight: 'calc(100vh - 60px)', padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Complaints</h1>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
  <button
    onClick={() => setFilter('all')}
    style={{
      marginRight: '10px',
      padding: '10px 20px',
      backgroundColor: '#4CAF50',  // Green background
      color: 'white',  // White text
      border: 'none',  // Remove default border
      borderRadius: '5px',  // Rounded corners
      cursor: 'pointer',  // Pointer cursor on hover
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Subtle shadow
      transition: 'background-color 0.3s, transform 0.3s',  // Smooth transition for hover effect
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}  // Darker green on hover
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}  // Revert to original color
  >
    All
  </button>
  <button
    onClick={() => setFilter('responded')}
    style={{
      marginRight: '10px',
      padding: '10px 20px',
      backgroundColor: '#2196F3',  // Blue background
      color: 'white',  // White text
      border: 'none',  // Remove default border
      borderRadius: '5px',  // Rounded corners
      cursor: 'pointer',  // Pointer cursor on hover
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Subtle shadow
      transition: 'background-color 0.3s, transform 0.3s',  // Smooth transition for hover effect
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1976D2')}  // Darker blue on hover
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2196F3')}  // Revert to original color
  >
    Responded
  </button>
  <button
    onClick={() => setFilter('unresponded')}
    style={{
      padding: '10px 20px',
      backgroundColor: '#f44336',  // Red background
      color: 'white',  // White text
      border: 'none',  // Remove default border
      borderRadius: '5px',  // Rounded corners
      cursor: 'pointer',  // Pointer cursor on hover
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Subtle shadow
      transition: 'background-color 0.3s, transform 0.3s',  // Smooth transition for hover effect
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d32f2f')}  // Darker red on hover
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}  // Revert to original color
  >
    Unresponded
  </button>
</div>

        {getFilteredComplaints().length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>No complaints found.</div>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>ID</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>Subject</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>Message</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>Resolved</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd', backgroundColor: '#f4f4f4' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredComplaints().map((complaint) => (
                  <tr key={complaint._id}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{complaint._id}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{complaint.subject}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{complaint.message}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', color: complaint.isResolved ? 'green' : 'red' }}>
                      {complaint.isResolved ? 'Yes' : 'No'}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {!complaint.isResolved && (
                        <button
                          style={{ padding: '5px 10px', cursor: 'pointer', color: 'blue' }}
                          onClick={() => handleRespondClick(complaint)}
                        >
                          Respond
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Respond to Complaint</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <textarea
                    value={response}
                    onChange={handleResponseChange}
                    placeholder="Write your response here..."
                    style={{ width: '100%', height: '100px' }}
                  />
                  {responseError && <div style={{ color: 'red', marginTop: '10px' }}>{responseError}</div>}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                <Button variant="primary" onClick={handleSubmitResponse}>Submit Response</Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ComplaintsPage;
