import { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { FaUsers, FaUserTie, FaCalendarCheck } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';

import { getDashboardDetails } from '../../api/adminAPI';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from 'chart.js';
import Footer from '../../components/common_pages/Footer';
import AdminNavbar from '../../components/common_pages/AdminHeader';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface IDashboardDetails {
  usersCount: number;
  providersCount: number;
  bookingsCount: {
    completed: number;
    scheduled: number;
    cancelled: number;
    refunded: number;
  };
}

interface IBooking {
  _id: string;
  date: string;
  status: string;
  price: number;
}

const aggregateChartData = (bookings: IBooking[], groupBy: 'month' | 'day') => {
  const filteredBookings = bookings.filter(
    booking => booking.status === 'Completed' || booking.status === 'Scheduled' || booking.status === 'Cancelled'
  );

  const data: { [key: string]: { bookings: number; revenue: number } } = {};

  filteredBookings.forEach((booking) => {
    const date = new Date(booking.date);
    let key: string;

    if (groupBy === 'month') {
      key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    } else {
      key = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'long' });
    }

    if (!data[key]) {
      data[key] = { bookings: 0, revenue: 0 };
    }

    data[key].bookings += 1;
    data[key].revenue += booking.price;
  });

  const sortedKeys = Object.keys(data).sort((a, b) =>
    new Date(a).getTime() - new Date(b).getTime()
  );

  return {
    labels: sortedKeys,
    bookingsData: sortedKeys.map(key => data[key].bookings),
    revenueData: sortedKeys.map(key => data[key].revenue),
  };
};

const AdminDashboard = () => {
  const [dashboardDetails, setDashboardDetails] = useState<IDashboardDetails>({
    usersCount: 0,
    bookingsCount: { completed: 0, scheduled: 0, cancelled: 0, refunded: 0 },
    providersCount: 0,
  });

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'month' | 'day'>('month');
  const [pieData, setPieData] = useState<any>(null);

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance Chart',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: viewMode === 'month' ? 'Month' : 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count / Revenue (₹)',
        },
      },
    },
  };

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      const response = await getDashboardDetails();
      const { usersCount, bookingsCount, providersCount } = response.data;
      setDashboardDetails({ usersCount, providersCount, bookingsCount });
      setBookings(response.data.scheduledBookings);

      const revenueByStatus = {
        completed: bookingsCount.completed * 2000,
        scheduled: bookingsCount.scheduled * 1500,
        cancelled: bookingsCount.cancelled * 0,
        refunded: bookingsCount.refunded * -1000,
      };

      setPieData({
        labels: ['Completed', 'Scheduled', 'Cancelled', 'Refunded'],
        datasets: [
          {
            label: 'Booking Count',
            data: [
              bookingsCount.completed,
              bookingsCount.scheduled,
              bookingsCount.cancelled,
              bookingsCount.refunded,
            ],
            
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
          {
            label: 'Revenue (₹)',
            data: [
              revenueByStatus.completed,
              revenueByStatus.scheduled,
              revenueByStatus.cancelled,
              revenueByStatus.refunded,
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(255, 99, 132, 0.4)',
              'rgba(153, 102, 255, 0.4)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    };
    fetchDashboardDetails();
  }, []);

  useEffect(() => {
    if (bookings && bookings.length > 0) {
      const { labels, bookingsData, revenueData } = aggregateChartData(bookings, viewMode);
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
            label: 'Revenue (₹)',
            data: revenueData,
            backgroundColor: 'rgba(53, 162, 235, 0.6)',
            borderColor: 'rgba(53, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [bookings, viewMode]);

  const toggleViewMode = () => {
    setViewMode(prevMode => (prevMode === 'month' ? 'day' : 'month'));
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gradient-to-br from-[#EEF5FF] to-[#D9E9FF] p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#19328F]">Admin Dashboard</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<FaUserTie className="text-[#2F76FF]" />}
            title="Service Providers"
            value={dashboardDetails.providersCount}
          />
          <StatCard
            icon={<FaUsers className="text-[#2F76FF]" />}
            title="Users"
            value={dashboardDetails.usersCount}
          />
          <StatCard
            icon={<FaCalendarCheck className="text-[#2F76FF]" />}
            title="Total Bookings"
            value={
              dashboardDetails.bookingsCount.completed +
              dashboardDetails.bookingsCount.scheduled +
              dashboardDetails.bookingsCount.cancelled
            }
          />
        </div>

        {/* Bar Chart Section */}
        <div className="w-full bg-white rounded-lg shadow-xl p-6 mb-6">
          {chartData && <Bar options={chartOptions} data={chartData} />}
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={toggleViewMode}
          >
            Toggle View Mode ({viewMode})
          </button>
        </div>

        {/* Pie Chart Section */}
        <div className="w-full md:w-1/3 lg:w-1/2 mx-auto  rounded-lg shadow-xl p-6">
        {pieData && (
            <Pie
              data={pieData}
           
              options={{
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          )}
        </div>

                {/* Main Content */}
                <Container>
          <div className="mt-5 mb-5">
            <Row>
              <Col md={6}>
                <img
                  src="https://images.pexels.com/photos/7282807/pexels-photo-7282807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  style={{ height: "350px", width: "100%" }}
                  className="rounded-4"
                  alt="admindash1"
                />
              </Col>
              <Col md={6} className="mt-3">
                <img
                  src="https://images.pexels.com/photos/7282318/pexels-photo-7282318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  style={{ height: "350px", width: "100%" }}
                  className="rounded-4"
                  alt="admindash2"
                />
              </Col>
            </Row>
            <h3 className="poppins-semibold-italic mt-4">
              Begin your child's journey with Us
            </h3>
            <p className="text-secondary poppins-regular">
              We prioritize excellence in care and support, ensuring every aspect meets the highest standards.
            </p>
            <h2 className="text-center fw-bold mt-3">About Us</h2>
            <hr />
            <p className="text-center mt-3">
              The birth of your baby is one of the most exciting events in your
              life. From the miracle of the first heartbeat to the exhilarating
              moment of the first breath, a new love story is beginning! Whether
              you are expecting or have already welcomed your little one into
              the world, Janika will walk you through this beautiful journey.
              <br />
              Ayurveda says, “If a pregnant woman is taken care of, as advised,
              she will give birth to a child who does not have any diseases—a
              healthy, physically strong, radiant and well-nourished baby.” We
              at Janika believe every mother and baby deserves the best care
              possible – before, during, and after a newborn enters the world.
              We have designed services and solutions not only for the physical
              but also the mental well-being of the mother. You will have
              questions about how and why you should care for yourself during
              your pregnancy; we are here to answer you.
            </p>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}

const StatCard = ({ icon, title, value }: StatCardProps) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
    <div className="text-3xl">{icon}</div>
    <div className="ml-4">
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <p className="text-2xl font-semibold text-[#19328F]">{value}</p>
    </div>
  </div>
);
