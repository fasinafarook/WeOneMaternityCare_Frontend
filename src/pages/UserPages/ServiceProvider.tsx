import React, { useEffect, useState } from "react";
import {
  fetchApprovedAndUnblockedProviders,
  fetchCategories,
} from "../../api/userAPI";
import { ServiceProvider } from "../../types/SeviceProviders";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common_pages/Footer";
import UserNavbar from "../../components/common_pages/UserHeader";

const ApprovedProviders: React.FC = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>(
    []
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [providersPerPage] = useState<number>(8);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProvidersAndCategories = async () => {
      try {
        const providersData = await fetchApprovedAndUnblockedProviders();
        const categoriesData = await fetchCategories();
        setProviders(providersData);
        setCategories(categoriesData);
        setFilteredProviders(providersData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    loadProvidersAndCategories();
  }, []);

  useEffect(() => {
    const filterProviders = () => {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = providers.filter((provider) => {
        const matchesSearchTerm =
          provider.name.toLowerCase().includes(lowercasedSearchTerm) ||
          provider.service.toLowerCase().includes(lowercasedSearchTerm) ||
          provider.location.toLowerCase().includes(lowercasedSearchTerm);
        const matchesCategory =
          selectedCategory === "" || provider.service === selectedCategory;
        return matchesSearchTerm && matchesCategory;
      });
      setFilteredProviders(filtered);
    };

    filterProviders();
  }, [searchTerm, selectedCategory, providers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleViewDetails = (providerId: string) => {
    navigate(`/user/serviceProviderDetails/${providerId}`);
  };

  const handleViewSlots = (providerId: string) => {
    navigate(`/user/get-service-providers-slots-details/${providerId}`);
  };

  // Pagination logic
  const indexOfLastProvider = currentPage * providersPerPage;
  const indexOfFirstProvider = indexOfLastProvider - providersPerPage;
  const currentProviders = filteredProviders.slice(
    indexOfFirstProvider,
    indexOfLastProvider
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <UserNavbar />
      <div
        style={{
          backgroundImage: `url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')`,
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ padding: "2rem" }}>
          <div
            className="providers-list"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h1
              style={{
                marginBottom: "2rem",
                color: "#2b6777",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              Service Providers
            </h1>

            <div
              className="filters"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "600px",
                marginBottom: "2rem",
                gap: "1rem",
              }}
            >
              <input
                type="text"
                placeholder="Search by name, service, or location"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  padding: "0.8rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
              />
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                style={{
                  padding: "0.8rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div
              className="overflow-x-auto"
              style={{ width: "100%", maxWidth: "1000px" }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Profile</th>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>Service</th>
                    <th style={tableHeaderStyle}>Specialization</th>
                    <th style={tableHeaderStyle}>Location</th>
                    <th style={tableHeaderStyle}>Details</th>
                    <th style={tableHeaderStyle}>Slots</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProviders.length > 0 ? (
                    currentProviders.map((provider) => (
                      <tr key={provider._id}>
                        <td style={tableCellStyle}>
                          <img
                            src={
                              provider.profilePicture ||
                              "https://via.placeholder.com/40"
                            }
                            alt={provider.name}
                            style={{
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                            }}
                          />
                        </td>
                        <td style={tableCellStyle}>{provider.name}</td>
                        <td style={tableCellStyle}>{provider.service}</td>
                        <td style={tableCellStyle}>
                          {provider.specialization}
                        </td>
                        <td style={tableCellStyle}>{provider.location}</td>
                        <td style={tableCellStyle}>
                          <button
                            onClick={() => handleViewDetails(provider._id)}
                            style={buttonStyle}
                          >
                            View Details
                          </button>
                        </td>
                        <td style={tableCellStyle}>
                          <button
                            onClick={() => handleViewSlots(provider._id)}
                            style={buttonStyle}
                          >
                            View Slots
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        style={{
                          textAlign: "center",
                          padding: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        No providers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                providersPerPage={providersPerPage}
                totalProviders={filteredProviders.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

// Styles
const tableHeaderStyle = {
  padding: "10px",
  backgroundColor: "#f2f2f2",
  textAlign: "left",
  fontWeight: "bold",
  borderBottom: "1px solid #ddd",
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const buttonStyle = {
  padding: "6px 12px",
  backgroundColor: "#2b6777",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
  border: "none",
  textDecoration: "none",
};

// Pagination component
const Pagination: React.FC<{
  providersPerPage: number;
  totalProviders: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}> = ({ providersPerPage, totalProviders, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProviders / providersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          padding: "0",
          gap: "10px",
        }}
      >
        {pageNumbers.map((number) => (
          <li
            key={number}
            style={{
              cursor: "pointer",
              fontWeight: currentPage === number ? "bold" : "normal",
            }}
          >
            <a
              onClick={() => paginate(number)}
              style={{ textDecoration: "none", color: "#2b6777" }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ApprovedProviders;
