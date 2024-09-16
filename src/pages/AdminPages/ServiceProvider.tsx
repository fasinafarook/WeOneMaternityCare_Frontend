import React, { useEffect, useState } from "react";
import { getServiceProviders, blockProvider } from "../../api/adminAPI";
import { Link, useSearchParams } from "react-router-dom";
import { FiSearch, FiMail, FiPhone, FiCheckCircle, FiXCircle, FiEye, FiUnlock, FiLock } from "react-icons/fi";
import { FaBars } from "react-icons/fa"; // Importing the missing FaBars icon
import Pagination from "../../components/common_pages/Pagination";
import TableShimmer from "../../components/common_pages/Table";
import toast from "react-hot-toast";
import Footer from "../../components/common_pages/Footer";
import AdminNavbar from "../../components/common_pages/AdminHeader";
// import AdminSidebar from "../../components/common_pages/AdminSidebars";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

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
  const [openModal, setOpenModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvidersData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleSearch = (name: string) => {
    setSearch(name);
  };

  const filteredServiceProviders = serviceProviders.filter((provider) =>
    provider.name.toLowerCase().includes(search.toLowerCase())
  );

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

  const handleOpenModal = (provider: ServiceProvidersData) => {
    setSelectedProvider(provider);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProvider(null);
  };

  const handleBlock = async (serviceProviderId: string, userBlocked: boolean) => {
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
        setSelectedProvider((prevProvider) =>
          prevProvider ? { ...prevProvider, isBlocked: !userBlocked } : null
        );
        setOpenModal(false);
        toast.success(`User ${userBlocked ? "unblocked" : "blocked"} successfully.`);
      }
    } catch (error) {
      toast.error("An error occurred while updating user status.");
    }
  };

  return (
    <>
      {/* Header */}
      <AdminNavbar />

      {/* Page Layout */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* Menu Button */}
        {/* <Button
          variant="primary"
          onClick={handleShow}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            zIndex: 1000, 
            background:'black'// Ensures button stays on top
          }}
        >
          <FaBars /> Menu
        </Button> */}

        {/* Sidebar */}
        {/* <AdminSidebar show={show} handleClose={handleClose} /> */}
<br />
<br />
        <div className="bg-gray-100 min-h-screen p-8">
          <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Service Providers</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search for Service Providers"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <br />
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
    {provider.isApproved ? (
      <>
        <FiCheckCircle className="mr-1" /> {/* Green check icon */}
        Approved {/* Green text */}
      </>
    ) : (
      <>
        <FiXCircle className="mr-1" /> {/* Red cross icon */}
        Not Approved {/* Red text */}
      </>
    )}
  </span>
</td>

                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <Link
                            to={`/admin/serviceProvider/${provider._id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <FiEye className="inline-block mr-1" />
                            View
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button 
                            className={`text-white px-4 py-2 rounded ${
                              provider.isBlocked ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            onClick={() => handleOpenModal(provider)}
                          >
                            {provider.isBlocked ? (
                              <>
                                <FiUnlock className="inline-block mr-1" />
                                Unblock
                              </>
                            ) : (
                              <>
                                <FiLock className="inline-block mr-1" />
                                Block
                              </>
                            )}
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
        <Footer />
      </div>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        size="sm"
        aria-labelledby="block-unblock-dialog"
      >
        <DialogHeader>Confirm Action</DialogHeader>
        <DialogBody>
          Are you sure you want to {selectedProvider?.isBlocked ? "unblock" : "block"} this provider?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCloseModal}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="blue"
            onClick={() => handleBlock(selectedProvider!._id, selectedProvider!.isBlocked)}
          >
            {selectedProvider?.isBlocked ? "Unblock" : "Block"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ServiceProviders;
