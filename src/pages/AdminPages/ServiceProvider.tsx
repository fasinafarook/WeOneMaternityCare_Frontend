import React, { useEffect, useState } from "react";
import { getServiceProviders, blockProvider } from "../../api/adminAPI";
import { Link, useSearchParams } from "react-router-dom";
import { FiSearch, FiMail, FiPhone,  FiEye, FiUnlock, FiLock } from "react-icons/fi";
import Pagination from "../../components/common_pages/Pagination";
import TableShimmer from "../../components/common_pages/Table";
import toast from "react-hot-toast";
import Footer from "../../components/common_pages/Footer";
import AdminNavbar from "../../components/common_pages/AdminHeader";
import Swal from "sweetalert2"; 

interface ServiceProvidersData {
  name: string;
  email: string;
  mobile: string;
  service: string;
  location: string;
  specialization: string;
  isApproved: boolean;
  isBlocked: boolean;
  qualification: string;
  profilePicture: string;
  experienceCrt: string;
  rate: string;
  expYear: string;
  __v: number;
  _id: string;
}

const ServiceProviders: React.FC = () => {
  const [serviceProviders, setServiceProviders] = useState<ServiceProvidersData[]>([]);
  const [search, setSearch] = useState("");
  const [approvalFilter, setApprovalFilter] = useState<string>("all"); // New filter state
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");

  const handleSearch = (name: string) => {
    setSearch(name);
  };

  const handleApprovalFilterChange = (filter: string) => {
    setApprovalFilter(filter);
  };

  const filteredServiceProviders = serviceProviders
    .filter((provider) => provider.name.toLowerCase().includes(search.toLowerCase()))
    .filter((provider) => {
      if (approvalFilter === "approved") {
        return provider.isApproved;
      } else if (approvalFilter === "notApproved") {
        return !provider.isApproved;
      } else {
        return true; // Show all if the filter is set to "all"
      }
    });

  const fetchServiceProviders = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const serviceProvidersList = await getServiceProviders(page, limit);
      setServiceProviders(serviceProvidersList.data);
      setTotalPages(Math.ceil(serviceProvidersList.total / limit));
    } catch (error) {
      toast.error("Error fetching service providers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceProviders(currentPage, limit);
  }, [currentPage, limit]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  const handleBlock = async (serviceProviderId: string, userBlocked: boolean) => {
    const action = userBlocked ? "unblock" : "block";
    
    Swal.fire({
      title: `Are you sure you want to ${action} this provider?`,
      text: `This action will ${action} the provider's access.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `${action.charAt(0).toUpperCase() + action.slice(1)}`,
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await blockProvider(serviceProviderId);
          if (response.success) {
            setServiceProviders((prevProviders) =>
              prevProviders.map((provider) =>
                provider._id === serviceProviderId
                  ? { ...provider, isBlocked: !userBlocked }
                  : provider
              )
            );
            toast.success(`User ${action === 'block' ? 'blocked' : 'unblocked'} successfully.`);
          }
        } catch (error) {
          toast.error("An error occurred while updating user status.");
        }
      }
    });
  };

  return (
    <>
      {/* Header */}
      <AdminNavbar />

      {/* Page Layout */}
      <div
        style={{
          backgroundImage: "url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')",
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="bg-gray-100 min-h-screen p-8 bg-opacity-80">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Service Providers</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="relative mb-4">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search for Service Providers"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>

              <div className="mt-4">
                <select
                  value={approvalFilter}
                  onChange={(e) => handleApprovalFilterChange(e.target.value)}
                  className="w-full pl-3 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All</option>
                  <option value="approved">Approved</option>
                  <option value="notApproved">Not Approved</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Block/Unblock</th>
                  </tr>
                </thead>

                {loading ? (
                  <TableShimmer columns={7} />
                ) : (
                  <tbody className="divide-y divide-gray-200">
                    {filteredServiceProviders.map((provider, index) => (
                      <tr key={provider._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={provider.profilePicture || "https://via.placeholder.com/40"}
                                alt={provider.name}
                                style={{ width: "40px", height: "40px" }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiMail className="text-gray-400 mr-2" />
                            <div className="text-sm text-gray-900">{provider.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiPhone className="text-gray-400 mr-2" />
                            <div className="text-sm text-gray-900">{provider.mobile}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              provider.isApproved ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {provider.isApproved ? "Approved" : "Not Approved"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <Link to={`/admin/serviceProvider/${provider._id}`}>
                            <FiEye className="text-blue-600 cursor-pointer" />
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleBlock(provider._id, provider.isBlocked)}
                            className={`text-sm ${
                              provider.isBlocked ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {provider.isBlocked ? <FiUnlock /> : <FiLock />}
                          </button>
                        </td>
                      </tr>
                    ))}
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
      </div>
      <Footer />

    </>
  );
};

export default ServiceProviders;
