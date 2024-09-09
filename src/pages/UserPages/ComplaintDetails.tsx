// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getComplaintById } from '../../api/userAPI';

// interface Complaint {
//   subject: string;
//   message: string;
//   response?: string;
// }

// const ComplaintDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [complaint, setComplaint] = useState<Complaint | null>(null);

//   useEffect(() => {
//     const fetchComplaint = async () => {
//       if (id) { // Ensure id is defined
//         try {
//           const data = await getComplaintById(id);
//           setComplaint(data);
//         } catch (error) {
//           console.error('Error fetching complaint details:', error);
//         }
//       }
//     };

//     fetchComplaint();
//   }, [id]);

//   if (!complaint) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h2>Complaint Details</h2>
//       <p><strong>Subject:</strong> {complaint.subject}</p>
//       <p><strong>Message:</strong> {complaint.message}</p>
//       <p><strong>Response:</strong> {complaint.response || 'No response yet'}</p>
//     </div>
//   );
// };

// export default ComplaintDetails;
