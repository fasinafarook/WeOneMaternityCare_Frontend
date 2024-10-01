import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getBlogs, updateBlogStatus } from "../../api/adminAPI";
import toast from "react-hot-toast";
import { FiPlus, FiPackage, FiEye, FiEyeOff } from "react-icons/fi";
import Pagination from "../../components/common_pages/Pagination";
import TableShimmer from "../../components/common_pages/Table";
import AdminNavbar from "../../components/common_pages/AdminHeader";
import Footer from "../../components/common_pages/Footer";

// Define the Blog type
interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  isListed: boolean;
}

// ConfirmationModal Component within the same file
const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        <p style={{ fontSize: "18px", marginBottom: "16px" }}>{message}</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              backgroundColor: "#e3342f",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#6c757d",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// BlogManagement Component
const BlogManagement = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const limit = 6;
  const currentPage = parseInt(searchParams.get("page") || "1");

  const fetchBlogs = useCallback(async (page: number, limit: number) => {
    setLoading(true);
    try {
      const response = await getBlogs(page, limit);
      if (response.success) {
        setBlogs(response.blogs || []);
        setTotalPages(Math.ceil(response.total / limit));
      } else {
        toast.error("Failed to fetch blogs");
      }
    } catch (error) {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  const handleToggleStatus = (blogId: string, currentStatus: boolean) => {
    setCurrentBlogId(blogId);
    setCurrentStatus(currentStatus);
    setMessage(`Are you sure you want to ${currentStatus ? "unlist" : "list"} this blog?`);
    setIsModalOpen(true);
  };

  const confirmToggleStatus = async () => {
    if (currentBlogId) {
      try {
        const response = await updateBlogStatus(currentBlogId, !currentStatus);
        if (response.success) {
          setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
              blog._id === currentBlogId ? { ...blog, isListed: !currentStatus } : blog
            )
          );
          toast.success(`Blog has been ${currentStatus ? "unlisted" : "listed"}`);
        } else {
          toast.error("Failed to update blog status");
        }
      } catch (error) {
        toast.error("Failed to update blog status");
      }
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage, limit);
  }, [currentPage, limit, fetchBlogs]);

  return (
    <>
      <AdminNavbar />
      <div
        style={{
          minHeight: "100vh",
          padding: "40px 16px",
          backgroundImage:
            "url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "24px",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              flexDirection: "column",
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
              <FiPackage style={{ marginRight: "8px", verticalAlign: "middle" }} />
              Blog Management
            </h1>
            <button
              onClick={() => navigate("/admin/add-blogs")}
              style={{
                backgroundColor: "#1e90ff",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
              }}
            >
              <FiPlus style={{ marginRight: "8px" }} />
              Add Blog
            </button>
          </div>

          {loading ? (
            <TableShimmer columns={6} />
          ) : (
            blogs.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "16px",
                  marginBottom: "32px",
                }}
              >
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    style={{
                      backgroundColor: "#fff",
                      padding: "16px",
                      borderRadius: "12px",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginRight: "16px",
                        }}
                      />
                      <div>
                        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
                          {blog.title}
                        </h3>
                        <p style={{ fontSize: "14px", color: "#666", marginBottom: "4px" }}>
                          {blog.date}
                        </p>
                        <p style={{ fontSize: "14px", color: "#444" }}>
                          {blog.content.slice(0, 100)}...
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleStatus(blog._id, blog.isListed)}
                      style={{
                        backgroundColor: blog.isListed ? "#e3342f" : "#38c172",
                        color: "#fff",
                        padding: "10px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background-color 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      {blog.isListed ? (
                        <>
                          <FiEyeOff style={{ marginRight: "8px" }} />
                          Unlist Blog
                        </>
                      ) : (
                        <>
                          <FiEye style={{ marginRight: "8px" }} />
                          List Blog
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <Footer />

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmToggleStatus}
        message={message}
      />
    </>
  );
};

export default BlogManagement;
