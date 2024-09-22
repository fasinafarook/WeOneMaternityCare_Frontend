// import { useState ,useEffect} from 'react';
// // import {  Button } from 'react-bootstrap';
// import { Row, Col } from 'react-bootstrap';
// import Footer from '../../components/common_pages/Footer';
// import providerhero from "../../../public/images/img2.jpeg";
// // import { FaBars } from 'react-icons/fa'; // Import the FaUserCircle icon
// import AppNavbar from '../../components/common_pages/ProviderHeader';
// import { getProfileDetails } from '../../api/serviceProviderAPI';
// // import Sidebar from '../../components/common_pages/ProviderSidebars';

// interface ProfileData {
//   name: string;
// }


// const ProviderPage = () => {
//   // const [show, setShow] = useState(false);
//   const [profileData, setProfileData] = useState<ProfileData | null>(null);

//   // const handleClose = () => setShow(false);
//   // const handleShow = () => setShow(true);

//   useEffect(() => {
//     // Fetch user data from backend
//     const fetchUserData = async () => { 
//       try {
//         const { data } = await getProfileDetails();
//         console.log('data: ', data);
//         setProfileData(data);
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   return (
//     <>
//     <AppNavbar/>
//       <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//         {/* Toggle Button */}
//         {/* <Button 
//           variant="primary" 
//           onClick={handleShow} 
//           style={{ 
//             position: 'absolute', 
//             top: '1rem', 
//             left: '1rem', 
//             zIndex: 1000 
//           }}
//         >
//           <FaBars /> Menu
//         </Button> */}

//         {/* Sidebar */}
//         {/* <Sidebar show={show} handleClose={handleClose} /> */}

//         {/* Main Content */}
//         <div style={{ flex: '1', padding: '2rem' }}>
//           <Row className="mx-3 my-5">
//             <Col sm={12} md={6}>
//               <img
//                 src={providerhero}
//                 alt="user-hero"
//                 style={{ objectFit: 'contain', width: '100%' , height:'250px' }}
//               />
              
//             </Col>
            
//             <Col sm={12} md={6} className="text-center">
//             <h1>
//                 {profileData ? (
//                   <span>Welcome, {profileData.name}!</span>
//                 ) : (
//                   <span>Loading...</span>
//                 )}
//                 </h1>
//               <p className="fs-5 poppins-light mb-3">
//                 Empower mothers on their incredible journey with our trusted resources
//                 and support. Here, you can seamlessly connect with mothers-to-be,
//                 offering a range of services including yoga therapy, pre-delivery
//                 care, doctor support, and much more. Together, let's make every step
//                 of the pregnancy journey as smooth and enriching as possible.
//               </p>
//             </Col>
//           </Row>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default ProviderPage;













import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getDashboardData } from '../../api/serviceProviderAPI';
import AppNavbar from '../../components/common_pages/ProviderHeader';
import Footer from '../../components/common_pages/Footer';

interface DashboardData {
  totalBookings: number;
  scheduledBookings: number;
  completedBookings: number;
  canceledBookings: number;
  refundedBookings: number;
  totalRevenue: number;
}



const ProviderDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [timeFrame, setTimeFrame] = useState<'day' | 'month'>('month'); // State to manage time frame selection

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  // Chart data for bookings count by status
  const chartData = {
    labels: [ 'Total Revenue'],
    datasets: [
      {
        label: 'Count',
        data: [
          
          dashboardData.totalRevenue,  // Including revenue in the chart
        ],
        backgroundColor: ['#36A2EB', '#4BC0C0', '#FF9F40'],
      },
    ],
  };

  // Function to handle timeframe selection
  const handleTimeFrameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeFrame(event.target.value as 'day' | 'month');
    // You may want to call a function here to fetch data based on the selected time frame
  };

  return (
    <>
      <AppNavbar />
      <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mb-6">Service Provider Dashboard</h1>

        {/* Timeframe selector */}
        <div className="mb-4">
          <label htmlFor="timeframe" className="mr-2">Select Time Frame:</label>
          <select id="timeframe" value={timeFrame} onChange={handleTimeFrameChange}>
            <option value="day">Daily</option>
            <option value="month">Monthly</option>
          </select>
        </div>

        {/* Display the total count and booking stats */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="p-4 bg-blue-100 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Total Bookings</h2>
            <p className="text-xl">{dashboardData.totalBookings}</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Scheduled</h2>
            <p className="text-xl">{dashboardData.scheduledBookings}</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Completed</h2>
            <p className="text-xl">{dashboardData.completedBookings}</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Total Revenue</h2>
            <p className="text-xl">${dashboardData.totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Bar Chart for Bookings and Revenue */}
        <div style={{ width: '60%', margin: '0 auto' }}>
          <Bar data={chartData} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProviderDashboard;


