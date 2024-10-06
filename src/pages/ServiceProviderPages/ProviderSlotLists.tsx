import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { getSlotsList, getProfileDetails } from "../../api/serviceProviderAPI";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import Pagination from "../../components/common_pages/Pagination";
import TableShimmer from "../../components/common_pages/Table";
import { debounce } from "lodash";
import AppNavbar from "../../components/common_pages/ProviderHeader";
import Footer from "../../components/common_pages/Footer";
import { updateServiceProviderInfo } from "../../redux/slice/authSlice";

interface Schedule {
  from: string;
  to: string;
  title: string;
  price: number;
  description: string;
  status: "open" | "booked";
  services: string[];
}

interface Slot {
  _id: string;
  date: Date;
  schedule: Schedule[];
}

const SlotsList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const [slotsList, setSlotsList] = useState<Slot[]>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "4");

  const providerInfo = useSelector(
    (state: RootState) => state.auth.serviceProviderInfo
  );

  const handleAddSlot = async () => {
    const refreshedProviderInfo = await fetchProviderInfo();
    if (!refreshedProviderInfo || !refreshedProviderInfo.isApproved) {
      setShowPopUp(true);
      return;
    }
    navigate("/serviceProvider/add-slot");
  };

  const handleEditSlot = (slotId: string) => {
    console.log("slotId", slotId);

    navigate(`/serviceProvider/edit-slot/${slotId}`);
  };

  const fetchProviderInfo = async () => {
    const response = await getProfileDetails();
    if (response.success) {
      dispatch(updateServiceProviderInfo(response.data));
      return response.data;
    }
    return null;
  };

  const fetchProviderSlotsList = async (
    page: number,
    limit: number,
    query = ""
  ) => {
    setLoading(true);
    const response = await getSlotsList(page, limit, query);

    if (response.success) {
      setSlotsList(response.data);
      setTotalPages(response.totalPages);
    } else {
      console.error("Error fetching slots:", response.message);
    }
    setLoading(false);
  };

  const debouncedFetchSlotsList = useCallback(
    debounce((page: number, limit: number, query: string) => {
      fetchProviderSlotsList(page, limit, query);
    }, 500),
    []
  );

  useEffect(() => {
    if (location.state?.refresh) {
      fetchProviderSlotsList(currentPage, limit, searchQuery);
    } else {
      debouncedFetchSlotsList(currentPage, limit, searchQuery);
    }
  }, [currentPage, limit, searchQuery, location.state]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSearchParams({
      page: "1",
      limit: limit.toString(),
      search: e.target.value,
    });
  };

  // Helper function to check if the slot is expired
  const isExpired = (endDate: Date, status: string) => {
    return status === "open" && new Date() > new Date(endDate);
  };

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
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="px-6 py-8">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                Slots List
              </h1>
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={handleAddSlot}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  Add Slot
                </button>
                {/* <input
      type="text"
      placeholder="Search by title or date..."
      value={searchQuery}
      onChange={handleSearch}
      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-150 ease-in-out"
    /> */}
              </div>

              {loading ? (
                <TableShimmer />
              ) : (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: "5rem",
                    fontFamily: "sans-serif",
                    fontSize: "large",
                  }}
                >
                  <thead className="bg-gray-100">
                    <tr className="text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
                        Title
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
                        From
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
                        To
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
                        Price
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
                        Status
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 hover:bg-gray-200 transition duration-150 ease-in-out">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {slotsList.length > 0 ? (
                      slotsList.map((slot) =>
                        slot.schedule.map((schedule, index) => (
                          <tr
                            key={`${slot._id}-${index}`}
                            className="hover:bg-gray-100 transition duration-150 ease-in-out"
                          >
                            <td className="border-b border-gray-200 px-6 py-4 text-left text-sm font-medium text-gray-800">
                              {schedule.services}
                            </td>
                            <td className="border-b border-gray-200 px-6 py-4 text-left text-sm text-gray-600">
                              {new Date(schedule.from).toLocaleString()}
                            </td>
                            <td className="border-b border-gray-200 px-6 py-4 text-left text-sm text-gray-600">
                              {new Date(schedule.to).toLocaleString()}
                            </td>
                            <td className="border-b border-gray-200 px-6 py-4 text-left text-sm font-semibold text-gray-800">
                              ${schedule.price.toFixed(2)}
                            </td>
                            <td
                              className={`border-b border-gray-200 px-6 py-4 text-left text-sm font-semibold ${
                                isExpired(
                                  new Date(schedule.from),
                                  schedule.status
                                )
                                  ? "text-gray-400"
                                  : schedule.status === "open"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {isExpired(
                                new Date(schedule.from),
                                schedule.status
                              )
                                ? "Expired"
                                : schedule.status}
                            </td>
                            <td className="border-b border-gray-200 px-6 py-4 text-center">
                              {!isExpired(
                                new Date(schedule.from),
                                schedule.status
                              ) && schedule.status === "open" ? (
                                <button
                                  onClick={() => handleEditSlot(slot._id)}
                                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                                >
                                  Edit
                                </button>
                              ) : (
                                <span className="text-gray-400">N/A</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-4 text-gray-500"
                        >
                          No slots available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setSearchParams({
                    page: page.toString(),
                    limit: limit.toString(),
                    search: searchQuery,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {showPopUp && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "0.25rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Approval Required</h2>
            <p>Your profile needs to be approved before you can add a slot.</p>
            <button
              onClick={() => setShowPopUp(false)}
              style={{
                padding: "0.75rem 1.5rem",
                color: "#fff",
                backgroundColor: "#007bff",
                border: "none",
                borderRadius: "0.25rem",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SlotsList;
