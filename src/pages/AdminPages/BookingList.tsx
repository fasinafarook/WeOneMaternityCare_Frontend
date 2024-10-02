import React, { useEffect, useState } from "react";
import { getBookings } from "../../api/adminAPI";
import {
  Container,
  Table,
  Spinner,
  Alert,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import AdminNavbar from "../../components/common_pages/AdminHeader";
import Footer from "../../components/common_pages/Footer";

interface Booking {
  _id: string;
  date: string;
  fromTime: string;
  toTime: string;
  title: string;
  serviceProviderId: {
    _id: string;
    name: string;
  };
  userId: {
    _id: string;
    name: string;
  };
  status: string;
  price: number;
}

const AdminBookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query state
  const [startDate, setStartDate] = useState<string>(""); // Start date state
  const [endDate, setEndDate] = useState<string>(""); // End date state
  const [statusFilter, setStatusFilter] = useState<string>("All"); // Status filter state
  const limit = 10; // Number of items per page

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings(page, limit);
        setBookings(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings");
        setLoading(false);
      }
    };

    fetchBookings();
  }, [page]); // Re-fetch data when page changes

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  // Convert date strings to Date objects for comparison
  const isWithinDateRange = (bookingDate: string) => {
    const bookingDateObj = new Date(bookingDate);
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;

    if (startDateObj && bookingDateObj < startDateObj) return false;
    if (endDateObj && bookingDateObj > endDateObj) return false;

    return true;
  };

  // Filter bookings based on search query, date range, and status
  const filteredBookings = bookings
    .filter((booking) =>
      booking.serviceProviderId?.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .filter((booking) => isWithinDateRange(booking.date))
    .filter(
      (booking) => statusFilter === "All" || booking.status === statusFilter
    ); // Filter by status

  if (loading)
    return (
      <Container className="text-center my-5" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );

  if (error)
    return (
      <Container className="my-5" style={{ minHeight: "80vh" }}>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <>
      <AdminNavbar />
      <div
        style={{
          backgroundImage:
            "url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            maxWidth: "90%",
          }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Booking Lists
          </h1>

          {/* Search input for filtering by service provider */}
          <Form.Group controlId="searchServiceProvider" className="mb-3">
            <Form.Label>Filter by Service Provider</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter service provider's name"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ borderRadius: "5px", padding: "10px", fontSize: "16px" }}
            />
          </Form.Group>

          {/* Date range filter */}
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  style={{
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "16px",
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  style={{
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "16px",
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Status filter dropdown */}
          <Form.Group controlId="statusFilter" className="mb-3">
            <Form.Label>Filter by Status</Form.Label>
            <Form.Select
              aria-label="Filter by status"
              onChange={handleFilterChange}
              style={{ borderRadius: "5px", padding: "10px", fontSize: "16px" }}
            >
              <option value="All">All</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refunded">Refunded</option>
            </Form.Select>
          </Form.Group>

          <Table
            responsive
            striped
            bordered
            hover
            className="shadow-sm"
            style={{
              fontSize: "15px",
              borderRadius: "5px",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <thead className="thead-dark">
              <tr>
                <th>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Title</th>
                <th>Service Provider</th>
                <th>User</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{new Date(booking.fromTime).toLocaleTimeString()}</td>
                    <td>{new Date(booking.toTime).toLocaleTimeString()}</td>
                    <td>{booking.title}</td>
                    <td>
                      {booking.serviceProviderId
                        ? booking.serviceProviderId.name
                        : "Unknown"}
                    </td>
                    <td>{booking.userId ? booking.userId.name : "Unknown"}</td>
                    <td>
                      <span
                        className={`badge ${
                          booking.status === "Scheduled"
                            ? "bg-primary"
                            : booking.status === "Completed"
                            ? "bg-success"
                            : booking.status === "Cancelled"
                            ? "bg-danger"
                            : booking.status === "Refunded"
                            ? "bg-warning"
                            : "bg-secondary"
                        }`}
                        style={{ padding: "5px 10px", borderRadius: "5px" }}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>${booking.price.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination controls */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <Button
              onClick={handlePrevPage}
              disabled={page === 1}
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              Previous
            </Button>
            <span style={{ fontSize: "16px" }}>Page {page}</span>
            <Button
              onClick={handleNextPage}
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              Next
            </Button>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AdminBookingList;
