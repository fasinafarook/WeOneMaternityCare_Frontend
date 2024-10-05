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
    console.log('slotId',slotId);
    
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
          backgroundImage: `url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* <div className="absolute inset-0 bg-black opacity-60"></div>         */}
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Slots List
        </h1>
        <button
          onClick={handleAddSlot}
          style={{
            padding: "0.75rem 1.5rem",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        >
          Add Slot
        </button>
        <input
          type="text"
          placeholder="Search by title or date..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ddd",
            borderRadius: "0.25rem",
            marginBottom: "1rem",
          }}
        />
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
            <thead>
              <tr>
                <th
                  style={{ borderBottom: "1px solid #ddd", padding: "0.75rem" }}
                >
                  Title
                </th>
                <th
                  style={{ borderBottom: "1px solid #ddd", padding: "0.75rem" }}
                >
                  From
                </th>
                <th
                  style={{ borderBottom: "1px solid #ddd", padding: "0.75rem" }}
                >
                  To
                </th>
                <th
                  style={{ borderBottom: "1px solid #ddd", padding: "0.75rem" }}
                >
                  Price
                </th>
                <th
                  style={{ borderBottom: "1px solid #ddd", padding: "0.75rem" }}
                >
                  Status
                </th>
                <th
                  style={{ borderBottom: "1px solid #ddd", padding: "0.75rem" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {slotsList.length > 0 ? (
                slotsList.map((slot) =>
                  slot.schedule.map((schedule, index) => (
                    <tr key={`${slot._id}-${index}`}>
                      <td
                        style={{
                          borderBottom: "1px solid #ddd",
                          padding: "0.75rem",
                        }}
                      >
                        {schedule.title}
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #ddd",
                          padding: "0.75rem",
                        }}
                      >
                        {new Date(schedule.from).toLocaleString()}
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #ddd",
                          padding: "0.75rem",
                        }}
                      >
                        {new Date(schedule.to).toLocaleString()}
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #ddd",
                          padding: "0.75rem",
                        }}
                      >
                        ${schedule.price}
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #ddd",
                          padding: "0.75rem",
                          color: isExpired(
                            new Date(schedule.from),
                            schedule.status
                          )
                            ? "grey"
                            : schedule.status === "open"
                            ? "green"
                            : "red",
                        }}
                      >
                        {isExpired(new Date(schedule.from), schedule.status)
                          ? "Expired"
                          : schedule.status}
                      </td>
                      <td
                        style={{
                          borderBottom: "1px solid #ddd",
                          padding: "0.75rem",
                        }}
                      >
                        {!isExpired(new Date(schedule.from), schedule.status) &&
                          schedule.status === "open" && (
                            <button
                              onClick={() => handleEditSlot(slot._id)}
                              style={{
                                padding: "0.5rem 1rem",
                                color: "#fff",
                                backgroundColor: "#007bff",
                                border: "none",
                                borderRadius: "0.25rem",
                                cursor: "pointer",
                              }}
                            >
                              Edit
                            </button>
                          )}
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    style={{ textAlign: "center", padding: "1rem" }}
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
