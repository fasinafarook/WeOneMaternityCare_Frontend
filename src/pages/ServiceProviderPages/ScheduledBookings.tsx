// import { useEffect, useState } from "react";
// import {
//   getSchedulesBookings,
//   processRefund,
// } from "../../api/serviceProviderAPI";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { FaRegClock } from "react-icons/fa";
// import { MdVideoCameraBack } from "react-icons/md";
// import Pagination from "../../components/common_pages/Pagination";
// import TableShimmer from "../../components/common_pages/Table";
// import AppNavbar from "../../components/common_pages/ProviderHeader";
// import Footer from "../../components/common_pages/Footer";
// import { Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useCallback } from "react";
// interface ScheduledBooking {
//   _id: string;
//   date: Date;
//   fromTime: Date;
//   toTime: Date;
//   description: string;
//   title: string;
//   price: number;
//   serviceProviderId: string;
//   userId: string;
//   status: string;
//   roomId: string;
//   cancellationReason?: string;
// }

// const ScheduledBookings = () => {
//   const [scheduledBookings, setScheduledBookings] = useState<
//     ScheduledBooking[]
//   >([]);
//   const [loading, setLoading] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [totalPages, setTotalPages] = useState(1);
//   const [showRefundModal, setShowRefundModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] =
//     useState<ScheduledBooking | null>(null);
//   const [refundProcessing, setRefundProcessing] = useState(false);
//   const currentPage = parseInt(searchParams.get("page") || "1");
//   const limit = parseInt(searchParams.get("limit") || "5");
//   const navigate = useNavigate();

//   const fetchScheduledBookings = async (page: number, limit: number) => {
//     setLoading(true);
//     const response = await getSchedulesBookings(page, limit);
//     setScheduledBookings(response.data);
//     setTotalPages(Math.ceil(response.total / limit));
//     setLoading(false);
//   };

//   const handlePageChange = (newPage: number) => {
//     setSearchParams({ page: newPage.toString(), limit: limit.toString() });
//   };

//   const handleRefund = async () => {
//     if (selectedBooking) {
//       setRefundProcessing(true);
//       try {
//         await processRefund(selectedBooking._id, selectedBooking.price);
//         // Handle success (e.g., show a success message, update the bookings list)
//         alert("Refund processed successfully");
//         fetchScheduledBookings(currentPage, limit);
//       } catch (error) {
//         // Handle error
//         alert("An error occurred while processing the refund");
//       } finally {
//         setRefundProcessing(false);
//         setShowRefundModal(false);
//       }
//     }
//   };

//   // const handleStartCall = (roomId: string) => {
//   //   navigate(`/video-call?roomId=${roomId}`);
//   // };

//   const handleStartCall = useCallback(
//     (roomId: string,serviceProviderId:string) => {
//       navigate(`/video-call/${roomId}/${serviceProviderId}`);
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     fetchScheduledBookings(currentPage, limit);
//   }, [currentPage, limit]);

//   return (
//     <>
//       <AppNavbar />
//       <div className="bg-gray-100 min-h-screen p-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
//             <div className="px-6 py-8">
//               <h1 className="text-4xl font-bold text-gray-800 mb-2">
//                 Scheduled Bookings
//               </h1>
//               <p className="text-gray-600">
//                 See information about all Bookings
//               </p>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Date
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     From-To
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Service
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Status
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   ></th>
//                 </tr>
//               </thead>

//               {loading ? (
//                 <TableShimmer columns={5} />
//               ) : (
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {scheduledBookings.map((booking) => (
//                     <tr
//                       key={booking._id}
//                       className="hover:bg-gray-50 transition-colors duration-200"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {new Date(booking.date).toLocaleDateString("en-US", {
//                             day: "numeric",
//                             month: "long",
//                             year: "numeric",
//                           })}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center text-sm text-gray-500">
//                           <FaRegClock className="h-5 w-5 mr-2 text-gray-400" />
//                           {new Date(booking.fromTime).toLocaleTimeString(
//                             "en-US",
//                             {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             }
//                           )}
//                           {" - "}
//                           {new Date(booking.toTime).toLocaleTimeString(
//                             "en-US",
//                             {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             }
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-3 py-1 inline-flex text-sm font-medium rounded-full">
//                           {booking.title}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
//                             booking.status === "Completed"
//                               ? "bg-green-100 text-green-800"
//                               : booking.status === "Cancelled"
//                               ? "bg-red-100 text-red-800"
//                               : booking.status === "Scheduled"
//                               ? "bg-green-100 text-green-800"
//                               : "bg-yellow-100 text-yellow-800"
//                           }`}
//                         >
//                           {booking.status}
//                         </span>

//                         {/* Only show refund button if the status is "Cancelled" and a cancellation reason is provided */}
//                         {booking.status === "Cancelled" &&
//                           booking.cancellationReason && (
//                             <div className="mt-2 text-sm text-gray-600">
//                               <p>
//                                 <strong>Reason:</strong>{" "}
//                                 {booking.cancellationReason}
//                               </p>
//                               <button
//                                 onClick={() => {
//                                   setSelectedBooking(booking);
//                                   setShowRefundModal(true);
//                                 }}
//                                 className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
//                               >
//                                 Refund
//                               </button>
//                             </div>
//                           )}
//                       </td>

//                       <td className="px-6 py-4 whitespace-nowrap text-right">
//                         {booking.status === "Scheduled" ? (
//                           <button
//                             onClick={() => handleStartCall(booking.roomId,booking.serviceProviderId)}
//                             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
//                           >
//                             <MdVideoCameraBack className="h-5 w-5 mr-2" />
//                             Start Call
//                           </button>
//                         ) : (
//                           <span className="text-gray-500 font-medium">
//                             {booking.status === "Completed"
//                               ? "Booking Completed"
//                               : ""}
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               )}
//             </table>
//           </div>
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       </div>
//       <Footer />

//       {/* Refund Confirmation Modal */}
//       <Modal show={showRefundModal} onHide={() => setShowRefundModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Refund</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {refundProcessing ? (
//             <p>Processing refund, please wait...</p>
//           ) : (
//             <p>Are you sure you want to process a refund for this booking?</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <button
//             type="button"
//             className="btn btn-secondary bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300 rounded px-4 py-2"
//             onClick={() => setShowRefundModal(false)}
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
//             onClick={handleRefund}
//             disabled={refundProcessing}
//           >
//             {refundProcessing ? "Processing..." : "Confirm Refund"}
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ScheduledBookings;

import { useEffect, useState } from "react";
import { getSchedulesBookings, processRefund } from "../../api/serviceProviderAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import { MdVideoCameraBack } from "react-icons/md";
import Pagination from "../../components/common_pages/Pagination";
import TableShimmer from "../../components/common_pages/Table";
import AppNavbar from "../../components/common_pages/ProviderHeader";
import Footer from "../../components/common_pages/Footer";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback } from "react";

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
}

const ScheduledBookings = () => {
  const [scheduledBookings, setScheduledBookings] = useState<ScheduledBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<ScheduledBooking | null>(null);
  const [refundProcessing, setRefundProcessing] = useState(false);
  const currentPage = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');
  const navigate = useNavigate();

  const fetchScheduledBookings = async (page: number, limit: number) => {
    setLoading(true);
    const response = await getSchedulesBookings(page, limit);
    setScheduledBookings(response.data);
    setTotalPages(Math.ceil(response.total / limit));
    setLoading(false);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  const handleRefund = async () => {
    if (selectedBooking) {
      setRefundProcessing(true);
      try {
        await processRefund(selectedBooking._id, selectedBooking.price);
        alert("Refund processed successfully");
        fetchScheduledBookings(currentPage, limit);
      } catch (error) {
        alert("An error occurred while processing the refund");
      } finally {
        setRefundProcessing(false);
        setShowRefundModal(false);
      }
    }
  };

   const handleStartCall = useCallback(
    (roomId: string,serviceProviderId:string) => {
      navigate(`/video-call/${roomId}/${serviceProviderId}`);
    },
    [navigate]
  );

  useEffect(() => {
    fetchScheduledBookings(currentPage, limit);
  }, [currentPage, limit]);

  return (
    <>
      <AppNavbar />
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="px-6 py-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Scheduled Bookings</h1>
              <p className="text-gray-600">See information about all Bookings</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From-To</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>

              {loading ? (
                <TableShimmer columns={5} />
              ) : (
                <tbody className="bg-white divide-y divide-gray-200">
  {scheduledBookings.map((booking) => {
    const currentTime = new Date();
    const fromTime = new Date(booking.fromTime);
    const toTime = new Date(booking.toTime);
    const isWithinSchedule = currentTime >= fromTime && currentTime <= toTime;
    const isExpired = currentTime > toTime;

    return (
      <tr key={booking._id} className="hover:bg-gray-50 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {new Date(booking.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center text-sm text-gray-500">
            <FaRegClock className="h-5 w-5 mr-2 text-gray-400" />
            {new Date(booking.fromTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" - "}
            {new Date(booking.toTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-3 py-1 inline-flex text-sm font-medium rounded-full">
            {booking.title}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
              isExpired
                ? "bg-gray-100 text-gray-800"
                : booking.status === "Completed"
                ? "bg-green-100 text-green-800"
                : booking.status === "Cancelled"
                ? "bg-red-100 text-red-800"
                : booking.status === "Scheduled"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {isExpired ? "Expired" : booking.status}
          </span>

          {booking.status === "Cancelled" && booking.cancellationReason && (
            <div className="mt-2 text-sm text-gray-600">
              <p>
                <strong>Reason:</strong>
                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setShowReasonModal(true);
                  }}
                  className="ml-2 underline cursor-pointer"
                >
                  View Reason
                </button>
              </p>
              <button
                onClick={() => {
                  setSelectedBooking(booking);
                  setShowRefundModal(true);
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
              >
                Refund
              </button>
            </div>
          )}
        </td>

        <td className="px-6 py-4 whitespace-nowrap text-right">
          {booking.status === "Scheduled" && !isExpired ? (
            <button
              onClick={() => handleStartCall(booking.roomId, booking.serviceProviderId)}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out ${
                !isWithinSchedule ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isWithinSchedule}
            >
              <MdVideoCameraBack className="h-5 w-5 mr-2" />
              Start Call
            </button>
          ) : isExpired ? (
            <span className="text-gray-500 font-medium">Booking Expired</span>
          ) : (
            <span className="text-gray-500 font-medium">
              {booking.status === "Completed" ? "Booking Completed" : ""}
            </span>
          )}
        </td>
      </tr>
    );
  })}
</tbody>

              )}
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />

      {/* Refund Confirmation Modal */}
      <Modal show={showRefundModal} onHide={() => setShowRefundModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Refund</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {refundProcessing ? (
            <p>Processing refund, please wait...</p>
          ) : (
            <p>Are you sure you want to process a refund of ${selectedBooking?.price} for this booking?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowRefundModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleRefund}
            disabled={refundProcessing}
          >
            Confirm Refund
          </button>
        </Modal.Footer>
      </Modal>

      {/* Cancellation Reason Modal */}
      <Modal show={showReasonModal} onHide={() => setShowReasonModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancellation Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedBooking?.cancellationReason}</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowReasonModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScheduledBookings;
