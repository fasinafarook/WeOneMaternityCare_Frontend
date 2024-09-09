// import React, { useEffect, useState } from 'react';
// import { fetchApprovedAndUnblockedProviders } from '../../api/userAPI';
// import { ServiceProvider } from '../../types/SeviceProviders';
// import { useNavigate } from 'react-router-dom';
// import UserSidebar from "../../components/common_pages/UserSidebar";
// import Footer from '../../components/common_pages/Footer';
// import { Button } from 'react-bootstrap';
// import UserNavbar from '../../components/common_pages/UserHeader';
// import { FaBars } from 'react-icons/fa';

// const ApprovedProviders: React.FC = () => {
//     const [show, setShow] = useState(false);
//     const [providers, setProviders] = useState<ServiceProvider[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const loadProviders = async () => {
//             try {
//                 const data = await fetchApprovedAndUnblockedProviders();
//                 setProviders(data);
//                 setFilteredProviders(data);
//             } catch (err) {
//                 setError('Failed to fetch providers');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadProviders();
//     }, []);

//     useEffect(() => {
//         const filterProviders = () => {
//             const lowercasedSearchTerm = searchTerm.toLowerCase();
//             const filtered = providers.filter(provider =>
//                 provider.name.toLowerCase().includes(lowercasedSearchTerm) ||
//                 provider.service.toLowerCase().includes(lowercasedSearchTerm) ||
//                 provider.location.toLowerCase().includes(lowercasedSearchTerm)
//             );
//             setFilteredProviders(filtered);
//         };

//         filterProviders();
//     }, [searchTerm, providers]);

//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value);
//     };

//     const handleViewDetails = (providerId: string) => {
//         navigate(`/user/serviceProviderDetails/${providerId}`); // Adjust the route to your details page
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <>
//         <UserNavbar/>
//         <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

//         <Button 
//           variant="primary" 
//           onClick={handleShow} 
//           style={{ 
//             position: 'absolute', 
//             top: '1rem', 
//             left: '1rem', 
//             zIndex: 1000 
//           }}
//         >
//           <FaBars /> Menu
//         </Button>
//         <UserSidebar show={show} handleClose={handleClose} />
//         <br />
//         <div style={{ flex: 1, padding: '2rem' }}>

//         <div className="providers-list" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            
//             <h1 style={{ marginBottom: '2rem' }}> Service Providers</h1>
            
//             <div className="search-bar mb-4" style={{ width: '80%', maxWidth: '600px', marginBottom: '2rem' }}>
//                 <input
//                     type="text"
//                     placeholder="Search by name, service, or location"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     className="w-full p-2 border border-gray-300 rounded"
//                     style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
//                 />
//             </div>
            
//             <div style={{ width: '100%', overflowX: 'auto' }}>
//                 <table className="min-w-full divide-y divide-gray-200" style={{ width: '80%', maxWidth: '1000px', margin: '0 auto' }}>
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Picture</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredProviders.length > 0 ? (
//                             filteredProviders.map((provider) => (
//                                 <tr key={provider._id}>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <img src={provider.profilePicture || "https://via.placeholder.com/40"} alt={provider.name} className="h-12 w-12 rounded-full" />
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.name}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.service}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.specialization}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.location}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDetails(provider._id)}
//                                             className="text-indigo-600 hover:text-indigo-900"
//                                         >
//                                             View Details
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No providers found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//         </div>
//         </div>
//         <Footer/>
//         </>
//     );
// };

// export default ApprovedProviders;


// import React, { useEffect, useState } from 'react';
// import { fetchApprovedAndUnblockedProviders } from '../../api/userAPI';
// import { ServiceProvider } from '../../types/SeviceProviders';
// import { useNavigate } from 'react-router-dom';
// // import UserSidebar from "../../components/common_pages/UserSidebar";
// import Footer from '../../components/common_pages/Footer';
// // import { Button } from 'react-bootstrap';
// import UserNavbar from '../../components/common_pages/UserHeader';
// // import { FaBars } from 'react-icons/fa';

// const ApprovedProviders: React.FC = () => {
//     // const [show, setShow] = useState(false);
//     const [providers, setProviders] = useState<ServiceProvider[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
//     // const handleClose = () => setShow(false);
//     // const handleShow = () => setShow(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const loadProviders = async () => {
//             try {
//                 const data = await fetchApprovedAndUnblockedProviders();
//                 setProviders(data);
//                 setFilteredProviders(data);
//             } catch (err) {
//                 setError('Failed to fetch providers');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadProviders();
//     }, []);

//     useEffect(() => {
//         const filterProviders = () => {
//             const lowercasedSearchTerm = searchTerm.toLowerCase();
//             const filtered = providers.filter(provider =>
//                 provider.name.toLowerCase().includes(lowercasedSearchTerm) ||
//                 provider.service.toLowerCase().includes(lowercasedSearchTerm) ||
//                 provider.location.toLowerCase().includes(lowercasedSearchTerm)
//             );
//             setFilteredProviders(filtered);
//         };

//         filterProviders();
//     }, [searchTerm, providers]);

//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(event.target.value);
//     };

//     const handleViewDetails = (providerId: string) => {
//         navigate(`/user/serviceProviderDetails/${providerId}`); // Adjust the route to your details page
//     };

//     const handleViewSlots = (providerId: string) => {
//         navigate(`/user/get-service-providers-slots-details/${providerId}`); // Navigate to the slots page
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <>
//         <UserNavbar/>
//         <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

//         {/* <Button 
//           variant="primary" 
//           onClick={handleShow} 
//           style={{ 
//             position: 'absolute', 
//             top: '1rem', 
//             left: '1rem', 
//             zIndex: 1000 
//           }}
//         >
//           <FaBars /> Menu
//         </Button> */}
//         {/* <UserSidebar show={show} handleClose={handleClose} /> */}
//         <br />
//         <div style={{ flex: 1, padding: '2rem' }}>

//         <div className="providers-list" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            
//             <h1 style={{ marginBottom: '2rem' }}> Service Providers</h1>
            
//             <div className="search-bar mb-4" style={{ width: '80%', maxWidth: '600px', marginBottom: '2rem' }}>
//                 <input
//                     type="text"
//                     placeholder="Search by name, service, or location"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     className="w-full p-2 border border-gray-300 rounded"
//                     style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
//                 />
//             </div>
            
//             <div style={{ width: '100%', overflowX: 'auto' }}>
//                 <table className="min-w-full divide-y divide-gray-200" style={{ width: '80%', maxWidth: '1000px', margin: '0 auto' }}>
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Picture</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Slots</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {filteredProviders.length > 0 ? (
//                             filteredProviders.map((provider) => (
//                                 <tr key={provider._id}>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <img src={provider.profilePicture || "https://via.placeholder.com/40"} alt={provider.name} className="h-12 w-12 rounded-full" />
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.name}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.service}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.specialization}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.location}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                         <button
//                                             onClick={() => handleViewDetails(provider._id)}
//                                             className="text-indigo-600 hover:text-indigo-900"
//                                         >
//                                             View Details
//                                         </button>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                         <button
//                                             onClick={() => handleViewSlots(provider._id)}
//                                             className="text-blue-600 hover:text-blue-900"
//                                         >
//                                             View Slots
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">No providers found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//         </div>
//         </div>
//         <Footer/>
//         </>
//     );
// };

// export default ApprovedProviders;

import React, { useEffect, useState } from 'react';
import { fetchApprovedAndUnblockedProviders, fetchCategories } from '../../api/userAPI'; // Assume fetchCategories is a new API function
import { ServiceProvider } from '../../types/SeviceProviders';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/common_pages/Footer';
import UserNavbar from '../../components/common_pages/UserHeader';

const ApprovedProviders: React.FC = () => {
    const [providers, setProviders] = useState<ServiceProvider[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
    const [categories, setCategories] = useState<string[]>([]); // New state for categories
    const [selectedCategory, setSelectedCategory] = useState<string>(''); // New state for selected category
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
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        loadProvidersAndCategories();
    }, []);

    useEffect(() => {
        const filterProviders = () => {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const filtered = providers.filter(provider => {
                const matchesSearchTerm = provider.name.toLowerCase().includes(lowercasedSearchTerm) ||
                                          provider.service.toLowerCase().includes(lowercasedSearchTerm) ||
                                          provider.location.toLowerCase().includes(lowercasedSearchTerm);
                const matchesCategory = selectedCategory === '' || provider.service === selectedCategory;
                return matchesSearchTerm && matchesCategory;
            });
            setFilteredProviders(filtered);
        };

        filterProviders();
    }, [searchTerm, selectedCategory, providers]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const handleViewDetails = (providerId: string) => {
        navigate(`/user/serviceProviderDetails/${providerId}`);
    };

    const handleViewSlots = (providerId: string) => {
        navigate(`/user/get-service-providers-slots-details/${providerId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
        <UserNavbar />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <br />
        <div style={{ flex: 1, padding: '2rem' }}>

        <div className="providers-list" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            
            <h1 style={{ marginBottom: '2rem' }}> Service Providers</h1>
            
            <div className="filters" style={{ display: 'flex', width: '80%', maxWidth: '600px', marginBottom: '2rem', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Search by name, service, or location"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="p-2 border border-gray-300 rounded"
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Profile</th>

                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Name</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Service</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Specialization</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Location</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Details</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600">Slots</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProviders.length > 0 ? (
                            filteredProviders.map((provider) => (
                                <tr key={provider._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={provider.profilePicture || "https://via.placeholder.com/40"} alt={provider.name} className="h-12 w-12 rounded-full" />
                                  </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.service}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.specialization}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <button onClick={() => handleViewDetails(provider._id)} className="text-indigo-600 hover:text-indigo-900">View Details</button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <button onClick={() => handleViewSlots(provider._id)} className="text-indigo-600 hover:text-indigo-900">View Slots</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">No providers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        <Footer />
    </div>
    </>
    );
};

export default ApprovedProviders;
