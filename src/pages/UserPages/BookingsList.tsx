import { useEffect, useState } from "react";
import UserNavbar from "../../components/common_pages/UserHeader";
import { getScheduledIbookings, cancelBooking } from "../../api/userAPI";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/common_pages/Pagination";
import TableShimmer from "../../components/common_pages/Table";
import Footer from "../../components/common_pages/Footer";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export interface IScheduledBooking {
  _id: string;
  date: Date;
  fromTime: Date;
  toTime: Date;
  description: string;
  title: string;
  price: number;
  serviceProviderId: string;
  userId: string;
  status: string;
}

const OutsourcedBookings = () => {
  const [scheduledBookings, setScheduledBookings] = useState<IScheduledBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<IScheduledBooking | null>(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");

  const fetchScheduledBookings = async (page: number, limit: number) => {
    setLoading(true);
    const response = await getScheduledIbookings(page, limit);
    setScheduledBookings(response.data);
    setTotalPages(Math.ceil(response.total / limit));
    setLoading(false);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  const handleCancelBooking = async () => {
    if (!cancellationReason.trim()) {
      setErrorMessage("Cancellation reason is required.");
      return;
    }

    if (selectedBooking) {
      const result = await cancelBooking(selectedBooking._id, cancellationReason);
      console.log('Booking cancelled:', result);
      setShowReasonModal(false);
      fetchScheduledBookings(currentPage, limit); // Refresh the bookings list
    }
  };

  useEffect(() => {
    fetchScheduledBookings(currentPage, limit);
  }, [currentPage, limit]);

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen flex flex-col bg-[#EEF5FF] p-4 sm:p-6 md:p-12 lg:p-24">
        <div className="max-w-7xl text-[#070913] mx-auto w-full">
          <h1 className="text-xl font-bold mb-4">Bookings List</h1>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg shadow-lg bg-white">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-[#595b60] to-[#0d80f3]">
                      <tr>
                        {["ROLL NAME", "SCHEDULED ON", "PRICE", "STATUS", "ACTION"].map(
                          (header) => (
                            <th
                              key={header}
                              scope="col"
                              className="px-2 py-3 text-xs md:text-sm font-bold text-left text-white uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    {loading ? (
                      <TableShimmer columns={5} />
                    ) : (
                      <tbody className="bg-white divide-y divide-gray-200">
                        {scheduledBookings.map((booking: IScheduledBooking) => (
                          <tr
                            key={booking._id}
                            className="hover:bg-blue-50 transition-colors duration-200 ease-in-out cursor-pointer"
                          >
                            <td className="px-2 py-3 text-xs md:text-sm font-medium text-gray-800 whitespace-nowrap">
                              {booking.title}
                            </td>
                            <td className="px-2 py-3 text-xs md:text-sm text-gray-600 whitespace-nowrap">
                              {new Date(booking.date).toLocaleDateString(
                                "en-US",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </td>
                            <td className="px-2 py-3 text-xs md:text-sm text-gray-600 whitespace-nowrap">
                              <div className="flex items-center">
                                <MdOutlineCurrencyRupee className="text-blue-500 mr-1" />
                                <span>{booking.price}</span>
                              </div>
                            </td>
                            <td className="px-2 py-3 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  booking.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "Scheduled"
                                    ? "bg-blue-100 text-blue-800"
                                    : booking.status === "Cancelled"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : booking.status === "Refunded"
                                    ? "bg-red-100 text-red-800"
                                    : ""
                                }`}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-2 py-3 whitespace-nowrap">
                              {booking.status === "Refunded" ? (
                                <span className="text-red-600">Refunded</span>
                              ) : booking.status === "Cancelled" ? (
                                <span className="text-red-600">You are eligible for a refund within 24 hours.</span>
                              ) : (
                                <button
                                  onClick={() => {
                                    setSelectedBooking(booking);
                                    setShowConfirmationModal(true);
                                  }}
                                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
                                >
                                  Cancel Slot
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
            <div className="flex-grow"></div>
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to cancel this booking?</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300 rounded px-4 py-2"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2"
            onClick={() => {
              setShowConfirmationModal(false);
              setShowReasonModal(true);
            }}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>

      {/* Cancellation Reason Modal */}
      <Modal show={showReasonModal} onHide={() => setShowReasonModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Provide a reason for cancellation:</p>
          <textarea
            value={cancellationReason}
            onChange={(e) => {
              setCancellationReason(e.target.value);
              setErrorMessage(""); // Clear error message when user starts typing
            }}
            placeholder="Reason for cancellation"
            rows={3}
            className="w-full p-2 border rounded"
          />
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300 rounded px-4 py-2"
            onClick={() => setShowReasonModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2"
            onClick={handleCancelBooking}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OutsourcedBookings;
