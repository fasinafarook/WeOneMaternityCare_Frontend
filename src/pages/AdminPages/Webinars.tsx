import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getWebinars, toggleWebinarListing } from "../../api/adminAPI"; // Ensure you have this API function
import toast from "react-hot-toast";
import { FiPlus, FiPackage } from "react-icons/fi";
import Pagination from "../../components/common_pages/Pagination";
import WebinarShimmer from "../../components/common_pages/webinar";
import AdminNavbar from "../../components/common_pages/AdminHeader";
import Footer from "../../components/common_pages/Footer";

interface IWebinar {
  webinarId: string;
  title: string;
  quotes: string;
  thumbnail: string;
  videoUrl: string;
  createdAt: Date;
  isListed: boolean;
}

const Webinars: React.FC = () => {
  const navigate = useNavigate();
  const [webinars, setWebinars] = useState<IWebinar[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");

  const fetchWebinars = useCallback(async (page: number, limit: number) => {
    setLoading(true);
    try {
      const response = await getWebinars(page, limit);
      if (Array.isArray(response)) {
        setWebinars(response);
        setTotalPages(Math.ceil(response.length / limit));
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error) {
      toast.error("Failed to fetch webinars");
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  useEffect(() => {
    fetchWebinars(currentPage, limit);
  }, [currentPage, limit, fetchWebinars]);

  const showConfirmation = (webinarId: string, isCurrentlyListed: boolean) => {
    toast((t) => (
      <div className="flex items-center">
        <span>
          {isCurrentlyListed ? "Unlist this webinar?" : "List this webinar?"}
        </span>
        <button
          onClick={async () => {
            try {
              const updatedWebinar = await toggleWebinarListing(
                webinarId,
                !isCurrentlyListed
              );
              if (updatedWebinar) {
                setWebinars((prevWebinars) =>
                  prevWebinars.map((webinar) =>
                    webinar.webinarId === webinarId
                      ? { ...webinar, isListed: !isCurrentlyListed }
                      : webinar
                  )
                );
                toast.success(
                  `Webinar ${
                    isCurrentlyListed ? "unlisted" : "listed"
                  } successfully`
                );
              }
            } catch (error) {
              toast.error("Failed to update webinar status");
            }
            toast.dismiss(t.id);
          }}
          className="ml-4 bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
        >
          Confirm
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-2 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
        >
          Cancel
        </button>
      </div>
    ));
  };

  const handleToggleListing = (
    webinarId: string,
    isCurrentlyListed: boolean
  ) => {
    showConfirmation(webinarId, isCurrentlyListed);
  };

  return (
    <>
      <AdminNavbar />
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "8px",
          color: "white",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "30px",
            borderRadius: "10px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#333",
                marginBottom: "16px",
              }}
            >
              <FiPackage
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              Webinar Management
            </h1>
            <button
              onClick={() => navigate("/admin/add-webinars")}
              style={{
                backgroundColor: "#1D4ED8",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "18px",
                transition: "background-color 0.3s ease",
              }}
            >
              <FiPlus style={{ marginRight: "10px" }} />
              Add Webinar
            </button>
          </div>

          {loading ? (
            <WebinarShimmer />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {webinars.map((webinar) => (
                <div
                  key={webinar.webinarId}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (
                    (e.currentTarget.style.transform = "scale(1.03)"),
                    (e.currentTarget.style.transition = "transform 0.3s ease")
                  )}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    style={{
                      padding: "20px",
                      borderBottom: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    <h5
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {webinar.title}
                    </h5>
                  </div>
                  <div style={{ padding: "20px", textAlign: "center" }}>
                    <video
                      src={webinar.videoUrl}
                      controls
                      width="100%"
                      poster={webinar.thumbnail}
                      style={{
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <p
                      style={{
                        marginTop: "10px",
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      {new Date(webinar.createdAt).toLocaleDateString()}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      {webinar.quotes}
                    </p>
                    <button
                      onClick={() =>
                        handleToggleListing(webinar.webinarId, webinar.isListed)
                      }
                      style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        backgroundColor: webinar.isListed
                          ? "#DC2626"
                          : "#059669",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {webinar.isListed ? "Unlist Webinar" : "List Webinar"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Webinars;
