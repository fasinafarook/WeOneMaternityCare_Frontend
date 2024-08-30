import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceProviderDetails } from "../../api/userAPI";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiBriefcase, FiClock, FiBook } from "react-icons/fi";
import UserSidebar from "../../components/common_pages/UserSidebar";
import Footer from '../../components/common_pages/Footer';
import UserNavbar from '../../components/common_pages/UserHeader';
import { Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';

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

const ProviderDetails: React.FC = () => {
    const [show, setShow] = useState(false);
    const [serviceProviderDetails, setServiceProviderDetails] = useState<ServiceProviderDetails | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            fetchServiceProviderDetails(id);
        }
    }, [id]);

    const fetchServiceProviderDetails = async (id: string) => {
        try {
            const response = await getServiceProviderDetails(id);
            if (response.success) {
                setServiceProviderDetails(response.data);
            }
        } catch (error) {
            console.error("Error fetching ServiceProvider details:", error);
            toast.error("Failed to fetch ServiceProvider details");
        }
    };

    if (!serviceProviderDetails) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <UserNavbar />
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Button
                    variant="primary"
                    onClick={handleShow}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        zIndex: 1000
                    }}
                >
                    <FaBars /> Menu
                </Button>
                <UserSidebar show={show} handleClose={handleClose} />
                <br />
                <div className="bg-white flex-1 py-10 px-4 flex justify-center items-center">
                <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex justify-center items-center"
                    >
                        <div className="flex flex-col md:flex-row w-full">
                            <ProfileSidebar serviceProvider={serviceProviderDetails} />
                            <MainContent serviceProvider={serviceProviderDetails} />
                        </div>
                    </motion.div>
                </div>
                <Footer />
            </div>
        </>
    );
};



const ProfileSidebar: React.FC<{ serviceProvider: ServiceProviderDetails }> = ({ serviceProvider }) => (
    
    <div className="md:w-1/3 p-8 bg-indigo-900 text-black flex justify-center items-center flex-col">
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

const MainContent: React.FC<{ serviceProvider: ServiceProviderDetails }> = ({ serviceProvider }) => (
    <div className="md:w-2/3 p-8 flex justify-center items-center flex-col">
        {serviceProvider.hasCompletedDetails ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="w-full">
                <h2 className="text-3xl font-bold mb-6 text-indigo-900 text-center">Professional Profile</h2>
                <DetailItem icon={<FiBriefcase />} label="Location" value={serviceProvider.location} />
                <DetailItem icon={<FiClock />} label="Years of Experience" value={serviceProvider.expYear} />
                <DetailItem icon={<FiBook />} label="Service" value={serviceProvider.service} />
                <DetailItem icon={<FiBook />} label="Specialization" value={serviceProvider.specialization} />
                <DetailItem icon={<FiBook />} label="Qualification" value={serviceProvider.qualification} />
                <DetailItem icon={<FiBook />} label="Rate" value={serviceProvider.rate} />
            </motion.div>
        ) : (
            <div className="text-center text-gray-600">
                <h2 className="text-3xl font-bold mb-4 text-indigo-900">Incomplete Profile</h2>
                <p className="text-xl">The service provider's profile registration is incomplete.</p>
            </div>
        )}
    </div>
);

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="mb-4 flex items-center w-full justify-center">
        <div className="text-2xl mr-3">{icon}</div>
        <div>
            <h3 className="text-sm font-semibold opacity-75">{label}</h3>
            <p className="text-lg">{value}</p>
        </div>
    </div>
);

export default ProviderDetails;
