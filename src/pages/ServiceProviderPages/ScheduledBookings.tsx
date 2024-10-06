import { useEffect, useState, useCallback } from "react";
import {
  getSchedulesBookings,
  processRefund,
  updateBookingStatus,
  notifyLeaveAndRefund,
} from "../../api/serviceProviderAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import { MdVideoCameraBack } from "react-icons/md";
import Pagination from "../../components/common_pages/Pagination";
import TableShimmer from "../../components/common_pages/Table";
import AppNavbar from "../../components/common_pages/ProviderHeader";
import Footer from "../../components/common_pages/Footer";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-hot-toast";

interface ScheduledBooking {
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
  roomId: string;
  cancellationReason?: string;
  emergencyLeaveReason?: string;
}

const ScheduledBookings = () => {
  const [scheduledBookings, setScheduledBookings] = useState<
    ScheduledBooking[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<ScheduledBooking | null>(null);
  const [refundProcessing, setRefundProcessing] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [showReasonInputModal, setShowReasonInputModal] = useState(false);
  const [cancelReason, setCancelReason] = useState(""); // To store the reason entered
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  const handleRefund = async () => {
    if (selectedBooking) {
      setRefundProcessing(true);
      try {
        await processRefund(selectedBooking._id, selectedBooking.price);
        toast.success("Refund processed successfully");
        fetchScheduledBookings(currentPage, limit);
      } catch (error) {
        toast.error("An error occurred while processing the refund");
      } finally {
        setRefundProcessing(false);
        setShowRefundModal(false);
      }
    }
  };

  const handleCancelBooking = () => {
    setShowCancelConfirmModal(true);
  };

  const handleCancelConfirmed = () => {
    setShowCancelConfirmModal(false);
    setShowReasonInputModal(true); // Show the reason input modal
  };

  const handleReasonEntered = async () => {
    if (selectedBooking) {
      try {
        await notifyLeaveAndRefund(selectedBooking._id, cancelReason); // Notify with reason
        await updateBookingStatus(selectedBooking._id, "Cancelled"); // Update status with reason
        await processRefund(selectedBooking._id, selectedBooking.price); // Trigger refund
        toast.success("Booking canceled and refund processed successfully");
        fetchScheduledBookings(currentPage, limit); // Refresh bookings list
      } catch (error) {
        toast.error("An error occurred while processing the cancellation");
      } finally {
        setShowReasonInputModal(false);
      }
    }
  };
  const checkAndUpdateStatus = (booking: ScheduledBooking) => {
    const currentTime = new Date();
    const bookingEndTime = new Date(booking.toTime); // Use `toTime` for checking expiration

    // Check if the booking's end time is before the current time
    if (bookingEndTime < currentTime && booking.status === "Scheduled") {
      booking.status = "Expired";
    }

    return booking;
  };

  const fetchScheduledBookings = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const response = await getSchedulesBookings(page, limit);

      // Update the status of each booking using checkAndUpdateStatus
      const updatedBookings = response.data.map((booking: ScheduledBooking) =>
        checkAndUpdateStatus(booking)
      );

      setScheduledBookings(updatedBookings);
      setTotalPages(Math.ceil(response.total / limit));
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };
  const handleStartCall = useCallback(
    (roomId: string, serviceProviderId: string) => {
      navigate(`/video-call/${roomId}/${serviceProviderId}`);
    },
    [navigate]
  );

  const handleMarkAsCompleted = async () => {
    if (selectedBooking) {
      try {
        await updateBookingStatus(selectedBooking._id, "Completed");
        toast.success("Booking marked as completed successfully");
        fetchScheduledBookings(currentPage, limit);
      } catch (error) {
        toast.error("Error updating booking status");
      } finally {
        setShowCompletedModal(false);
      }
    }
  };

  useEffect(() => {
    fetchScheduledBookings(currentPage, limit);
  }, [currentPage, limit]);

  return (
    <>
      <AppNavbar />
      <div
        style={{
          backgroundImage: `url('https://i.pinimg.com/originals/50/3f/f0/503ff087cf186814be004303e754fcdf.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8  ">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-t-lg">
              <h1 className="text-4xl font-bold text-white mb-2">
                Scheduled Bookings
              </h1>
              <p className="text-gray-200">
                See information about all Bookings
              </p>
            </div>
            <div className="px-6 py-8">
              {/* Content of the bookings can go here */}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden ">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-300 hover:bg-blue-600 transition duration-150 ease-in-out">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-300 hover:bg-blue-600 transition duration-150 ease-in-out">
                    From - To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-300 hover:bg-blue-600 transition duration-150 ease-in-out">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-300 hover:bg-blue-600 transition duration-150 ease-in-out">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider border-b border-gray-300 hover:bg-blue-600 transition duration-150 ease-in-out">
                    Actions
                  </th>
                </tr>
              </thead>

              {loading ? (
                <TableShimmer columns={5} />
              ) : (
                <tbody
                  className="bg-white divide-y divide-gray-200"
                  style={{ borderBottom: "2px solid #333" }}
                >
                  {scheduledBookings.map((booking) => {
                    const currentTime = new Date();
                    const fromTime = new Date(booking.fromTime);
                    const toTime = new Date(booking.toTime);
                    const isWithinSchedule =
                      currentTime >= fromTime && currentTime <= toTime;
                    const isExpired = currentTime > toTime;

                    return (
                      <tr
                        key={booking._id}
                        className={`hover:bg-gray-50 transition-colors duration-200  ${
                          isExpired ? "bg-gray-100" : ""
                        }`}
                        style={{
                          border: "2px solid #323", // Dark border for the table
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(booking.date).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <FaRegClock className="h-5 w-5 mr-2 text-gray-400" />
                            {new Date(booking.fromTime).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                            {" - "}
                            {new Date(booking.toTime).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                            {booking.title}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                              booking.status === "Expired"
                                ? "bg-gray-100 text-gray-800"
                                : booking.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.status}
                          </span>

                          {booking.status === "Cancelled" &&
                            booking.cancellationReason && (
                              <div className="mt-2 text-sm text-gray-600">
                                <p>
                                  <strong>Reason:</strong>
                                  <button
                                    onClick={() => {
                                      setSelectedBooking(booking);
                                      setShowReasonModal(true);
                                    }}
                                    className="ml-2 underline text-blue-600 cursor-pointer"
                                  >
                                    View Reason
                                  </button>
                                </p>
                              </div>
                            )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {booking.status === "Scheduled" && !isExpired ? (
                            <div className="flex items-center space-x-2">
                              <Button
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  handleCancelBooking();
                                }}
                                className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-md font-semibold text-xs hover:bg-red-700 transition duration-150 ease-in-out"
                              >
                                Emergency
                              </Button>
                              <Button
                                onClick={() =>
                                  handleStartCall(
                                    booking.roomId,
                                    booking.serviceProviderId
                                  )
                                }
                                disabled={!isWithinSchedule}
                                className={`inline-flex items-center px-3 py-1.5 text-xs font-medium text-white border border-transparent rounded-md shadow-sm transition duration-150 ease-in-out ${
                                  !isWithinSchedule
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                                }`}
                              >
                                <MdVideoCameraBack className="h-4 w-4 mr-1" />
                                Start
                              </Button>

                              <Button
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setShowCompletedModal(true);
                                }}
                                disabled={!isWithinSchedule}
                                className={`inline-flex items-center px-3 py-1.5 text-xs font-medium text-white border border-transparent rounded-md shadow-sm transition duration-150 ease-in-out ${
                                  !isWithinSchedule
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                              >
                                Mark Completed
                              </Button>
                            </div>
                          ) : booking.status === "Cancelled" ? (
                            <div className="flex flex-col items-center">
                              <span className="text-gray-500 text-center">
                                {booking.status}
                              </span>
                              <button
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setShowRefundModal(true);
                                }}
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-150 ease-in-out"
                              >
                                Refund
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-500">
                              {booking.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>

            <div className="px-6 py-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>

          {/* Refund Modal */}
          <Dialog
            open={showRefundModal}
            onClose={() => setShowRefundModal(false)}
          >
            <DialogHeader>Refund</DialogHeader>
            <DialogBody>
              <p>
                Are you sure you want to process a refund of $
                {selectedBooking?.price} for this booking?
              </p>
            </DialogBody>
            <DialogFooter>
              <Button
                onClick={() => setShowRefundModal(false)}
                color="gray"
                className="mr-4"
              >
                Cancel
              </Button>
              <Button
                onClick={handleRefund}
                color="red"
                disabled={refundProcessing}
              >
                {refundProcessing ? "Processing..." : "Refund"}
              </Button>
            </DialogFooter>
          </Dialog>

          {/* Reason Modal */}
          <Dialog
            open={showReasonModal}
            onClose={() => setShowReasonModal(false)}
          >
            <DialogHeader>Cancellation Reason</DialogHeader>
            <DialogBody>
              <p>{selectedBooking?.cancellationReason}</p>
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => setShowReasonModal(false)} color="gray">
                Close
              </Button>
            </DialogFooter>
          </Dialog>

          {/* Completed Modal */}
          <Dialog
            open={showCompletedModal}
            onClose={() => setShowCompletedModal(false)}
          >
            <DialogHeader>Mark as Completed</DialogHeader>
            <DialogBody>
              <p>Are you sure you want to mark this booking as completed?</p>
            </DialogBody>
            <DialogFooter>
              <Button
                onClick={() => setShowCompletedModal(false)}
                color="gray"
                className="mr-4"
              >
                Cancel
              </Button>
              <Button onClick={handleMarkAsCompleted} color="blue">
                Mark as Completed
              </Button>
            </DialogFooter>
          </Dialog>
          {/* Cancel Confirmation Modal */}
          <Dialog
            open={showCancelConfirmModal}
            onClose={() => setShowCancelConfirmModal(false)}
          >
            <DialogHeader>Cancel Booking</DialogHeader>
            <DialogBody>
              <p>Are you sure you want to cancel this booking?</p>
            </DialogBody>
            <DialogFooter>
              <Button
                onClick={() => setShowCancelConfirmModal(false)}
                color="gray"
                className="mr-4"
              >
                No
              </Button>
              <Button onClick={handleCancelConfirmed} color="red">
                Yes, Cancel
              </Button>
            </DialogFooter>
          </Dialog>

          {/* Reason Input Modal */}
          <Dialog
            open={showReasonInputModal}
            onClose={() => setShowReasonInputModal(false)}
          >
            <DialogHeader>Enter Cancellation Reason</DialogHeader>
            <DialogBody>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Enter reason for cancellation"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </DialogBody>
            <DialogFooter>
              <Button
                onClick={() => setShowReasonInputModal(false)}
                color="gray"
                className="mr-4"
              >
                Cancel
              </Button>
              <Button onClick={handleReasonEntered} color="blue">
                Submit
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ScheduledBookings;
