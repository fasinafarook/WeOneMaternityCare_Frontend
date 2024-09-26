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

  // useEffect(() => {
  //   // Fetch user data from backend
  //   const fetchUserData = async () => { 
  //     try {
  //       const { data } = await getProfileDetails();
  //       console.log('data: ', data);
  //       setProfileData(data);
  //     } catch (error) {
  //       console.error('Failed to fetch user data:', error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

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













// import { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { getDashboardData } from '../../api/serviceProviderAPI';
// import AppNavbar from '../../components/common_pages/ProviderHeader';
// import Footer from '../../components/common_pages/Footer';

// interface DashboardData {
//   totalBookings: number;
//   scheduledBookings: number;
//   completedBookings: number;
//   canceledBookings: number;
//   refundedBookings: number;
//   totalRevenue: number;
// }



// const ProviderDashboard = () => {
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const data = await getDashboardData();
//         setDashboardData(data);
//       } catch (error) {
//         console.error('Failed to fetch dashboard data:', error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (!dashboardData) {
//     return <p>Loading...</p>;
//   }

  

 

//   return (
//     <>
//       <AppNavbar />
      // <div className="container mx-auto p-4">
      //   <h1 className="text-center text-2xl font-bold mb-6">Service Provider Dashboard</h1>
      //   {/* Display the total count and booking stats */}
        // <div className="flex justify-center space-x-8 mb-8">
        //   <div className="p-4 bg-blue-100 rounded-md shadow-md">
        //     <h2 className="text-lg font-semibold">Total Bookings</h2>
        //     <p className="text-xl">{dashboardData.totalBookings}</p>
        //   </div>
        //   <div className="p-4 bg-blue-100 rounded-md shadow-md">
        //     <h2 className="text-lg font-semibold">Scheduled</h2>
        //     <p className="text-xl">{dashboardData.scheduledBookings}</p>
        //   </div>
        //   <div className="p-4 bg-blue-100 rounded-md shadow-md">
        //     <h2 className="text-lg font-semibold">Completed</h2>
        //     <p className="text-xl">{dashboardData.completedBookings}</p>
        //   </div><div className="p-4 bg-blue-100 rounded-md shadow-md">
        //     <h2 className="text-lg font-semibold">Cancelled</h2>
        //     <p className="text-xl">{dashboardData.canceledBookings}</p>
        //   </div><div className="p-4 bg-blue-100 rounded-md shadow-md">
        //     <h2 className="text-lg font-semibold">Refunded</h2>
        //     <p className="text-xl">{dashboardData.refundedBookings}</p>
        //   </div>
        //   <div className="p-4 bg-blue-100 rounded-md shadow-md">
        //     <h2 className="text-lg font-semibold">Total Revenue</h2>
        //     <p className="text-xl">${dashboardData.totalRevenue.toFixed(2)}</p>
        //   </div>
        // </div>

        
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ProviderDashboard;


import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getDashboardData } from '../../api/serviceProviderAPI';
import AppNavbar from '../../components/common_pages/ProviderHeader';
import Footer from '../../components/common_pages/Footer';
import { ChartOptions } from 'chart.js';

interface DashboardData {
  totalBookings: number;
  scheduledBookings: number;
  completedBookings: number;
  canceledBookings: number;
  refundedBookings: number;
  totalRevenue: number;
  bookings: { date: string, status: string, price: number }[];
}

const aggregateChartData = (bookings: DashboardData['bookings'], groupBy: 'month' | 'day') => {
  const data: Record<string, { bookings: number; revenue: number }> = {};
  
  bookings.forEach((booking) => {
    const date = new Date(booking.date);
    let key = groupBy === 'month' 
      ? date.toLocaleString('default', { month: 'short', year: 'numeric' }) 
      : date.toLocaleDateString('en-IN', { day: '2-digit', month: 'long' });

    if (!data[key]) {
      data[key] = { bookings: 0, revenue: 0 };
    }

    data[key].bookings += 1;
    data[key].revenue += booking.price;
  });

  const labels = Object.keys(data).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  return {
    labels,
    bookingsData: labels.map(key => data[key].bookings),
    revenueData: labels.map(key => data[key].revenue),
  };
};

const ProviderDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'month' | 'day'>('month');

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Bookings & Revenue' },
    },
    scales: {
      x: { title: { display: true, text: viewMode === 'month' ? 'Month' : 'Day' } },
      y: { title: { display: true, text: 'Count / Revenue ($)' }, beginAtZero: true },
    },
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);

        const { labels, bookingsData, revenueData } = aggregateChartData(data.bookings, viewMode);
        setChartData({
          labels,
          datasets: [
            {
              label: 'Bookings',
              data: bookingsData,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Revenue ($)',
              data: revenueData,
              backgroundColor: 'rgba(53, 162, 235, 0.6)',
              borderColor: 'rgba(53, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [viewMode]);

  const toggleViewMode = () => setViewMode(prev => (prev === 'month' ? 'day' : 'month'));

  if (!dashboardData) return <p>Loading...</p>;

  return (
    <>
      <AppNavbar />

      
      <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mb-6">Service Provider Dashboard</h1>
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
          </div><div className="p-4 bg-blue-100 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Cancelled</h2>
            <p className="text-xl">{dashboardData.canceledBookings}</p>
          </div><div className="p-4 bg-blue-100 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Refunded</h2>
            <p className="text-xl">{dashboardData.refundedBookings}</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Total Revenue</h2>
            <p className="text-xl">${dashboardData.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="mb-6">
          <button onClick={toggleViewMode} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
            Toggle to {viewMode === 'month' ? 'Day' : 'Month'} View
          </button>
          {chartData && <Bar data={chartData} options={chartOptions} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProviderDashboard;
