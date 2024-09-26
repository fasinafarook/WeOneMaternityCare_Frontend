import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceProviderDetails, approveServiceProvider } from "../../api/adminAPI";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiBriefcase, FiClock, FiBook, FiFileText } from "react-icons/fi";
import Footer from "../../components/common_pages/Footer";
import AdminNavbar from "../../components/common_pages/AdminHeader";

interface ServiceProviderDetails {
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
    hasCompletedDetails: boolean;
}

const SingleServiceProviderDetails: React.FC = () => {
    const [serviceProviderDetails, setServiceProviderDetails] = useState<ServiceProviderDetails | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const { id } = useParams<{ id: string }>();

    // Fetch Service Provider details when component mounts or `openModal` changes
    useEffect(() => {
        if (id) {
            fetchServiceProviderDetails(id);
        }
    }, [id, openModal]);

    // Fetch Service Provider details from API
    const fetchServiceProviderDetails = async (id: string) => {
        try {
            const response = await getServiceProviderDetails(id);
            if (response.success) {
                setServiceProviderDetails(response.data);
            } else {
                throw new Error("Failed to fetch service provider details");
            }
        } catch (error) {
            console.error("Error fetching ServiceProvider details:", error);
            toast.error("Failed to fetch ServiceProvider details");
        }
    };

    // Handle approval of Service Provider
    const handleApproval = async () => {
      try {
        const response = await approveServiceProvider(id as string);
        if (response) {
          setOpenModal(false);
          toast.success("ServiceProvider Approved");
          fetchServiceProviderDetails(id as string);
        }
      } catch (error) {
        console.error("Error approving ServiceProvider:", error);
        toast.error("Failed to approve ServiceProvider");
      }
    };

    // Handle document viewing
    const handleDocumentView = (url?: string) => {
        if (url) {
            window.open(url, "_blank");
        } else {
            toast.error("Document not available");
        }
    };

    // Component rendering
    return (
        <>
            {/* Header */}
            <AdminNavbar />

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>


                {/* Main Content */}
                <div className="bg-gradient-to-br min-h-screen py-10 px-4">
                    <ApprovalModal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        onApprove={handleApproval}
                    />

                    {serviceProviderDetails ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="md:flex">
                                <ProfileSidebar serviceProvider={serviceProviderDetails} />
                                <MainContent
                                    serviceProvider={serviceProviderDetails}
                                    onDocumentView={handleDocumentView}
                                    onApprove={() => setOpenModal(true)}
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex justify-center items-center h-screen">Loading...</div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
};

// Sidebar Component for displaying service provider details
const ProfileSidebar: React.FC<{ serviceProvider: ServiceProviderDetails }> = ({ serviceProvider }) => (
  <div className="md:w-1/3 p-8 text-black bg-indigo-900 flex flex-col items-center justify-center">
      <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={serviceProvider.profilePicture || "https://via.placeholder.com/150"}
          alt={serviceProvider.name}
          className="w-48 h-48 rounded-full mb-6 border-4 border-white shadow-lg"
      />
      <DetailItem icon={<FiUser />} label="Name" value={serviceProvider.name} />
      <DetailItem icon={<FiMail />} label="Email" value={serviceProvider.email} />
      <DetailItem icon={<FiPhone />} label="Mobile" value={serviceProvider.mobile.toString()} />
  </div>
);


// Main Content Component for additional service provider information
const MainContent: React.FC<{
  serviceProvider: ServiceProviderDetails;
  onDocumentView: (url?: string) => void;
  onApprove: () => void;
}> = ({ serviceProvider, onDocumentView, onApprove }) => (
  <div className="md:w-2/3 p-8 flex flex-col items-center justify-center">
      {serviceProvider.hasCompletedDetails ? (
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
          >
              <h2 className="text-3xl font-bold mb-6 text-indigo-900">Professional Profile</h2>
              <DetailItem icon={<FiBriefcase />} label="Location" value={serviceProvider.location} />
              <DetailItem icon={<FiClock />} label="Years of Experience" value={serviceProvider.expYear} />
              <DetailItem icon={<FiBook />} label="Specialization" value={serviceProvider.specialization} />

              <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-indigo-900">Qualification</h3>
                  <p className="text-gray-700 leading-relaxed">{serviceProvider.qualification}</p>
              </div>

              <div className="mt-8 space-y-4">
                  <DocumentButton icon={<FiFileText />} label="View Experience Certificate" onClick={() => onDocumentView(serviceProvider.experienceCrt)} />
              </div>

              {!serviceProvider.isApproved && (
                  <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onApprove}
                      className="mt-8 bg-gradient-to-r from-green-400 to-green-600 text-black font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
                  >
                      Approve Service Provider
                  </motion.button>
              )}
          </motion.div>
      ) : (
          <div className="text-center text-gray-600">
              <h2 className="text-3xl font-bold mb-4 text-indigo-900">Incomplete Profile</h2>
              <p className="text-xl">The service provider's profile registration is incomplete.</p>
          </div>
      )}
  </div>
);

// DetailItem component for displaying individual details
const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="mb-4 flex flex-col items-center justify-center text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <div>
          <h3 className="text-sm font-semibold opacity-75">{label}</h3>
          <p className="text-lg">{value}</p>
      </div>
  </div>
);


// DocumentButton component for viewing documents
const DocumentButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-black font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
  >
      <span className="mr-2">{icon}</span>
      {label}
  </motion.button>
);


// ApprovalModal component for confirming approval action
const ApprovalModal: React.FC<{ open: boolean; onClose: () => void; onApprove: () => void }> = ({ open, onClose, onApprove }) => {
  return (
      <>
          {open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                      <h2 className="text-2xl font-bold mb-4">Confirm Approval</h2>
                      <p className="mb-6">Are you sure you want to approve this service provider?</p>
                      <div className="flex justify-center space-x-4">
                          <button onClick={onApprove} className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded">
                              Approve
                          </button>
                          <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-4 rounded">
                              Cancel
                          </button>
                      </div>
                  </div>
              </div>
          )}
      </>
  );
};


export default SingleServiceProviderDetails;
