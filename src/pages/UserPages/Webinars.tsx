import React, { useEffect, useState } from 'react';
import { fetchListedWebinars } from '../../api/userAPI';
import Footer from '../../components/common_pages/Footer';
import UserNavbar from '../../components/common_pages/UserHeader';

interface IWebinar {
    webinarId: string;
    title: string;
    quotes: string;
    thumbnail: string;
    videoUrl: string;
    createdAt: string;
    isListed: boolean;
}

const WebinarsList: React.FC = () => {
    const [webinars, setWebinars] = useState<IWebinar[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const webinarsPerPage = 6;

    useEffect(() => {
        const loadWebinars = async () => {
            try {
                const webinarsData = await fetchListedWebinars();
                setWebinars(webinarsData);
                setTotalPages(Math.ceil(webinarsData.length / webinarsPerPage));
            } catch (error) {
                setError('Failed to load webinars');
            } finally {
                setLoading(false);
            }
        };

        loadWebinars();
    }, []);

    if (loading) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading webinars...</p>;
    if (error) return <p style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>{error}</p>;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const currentWebinars = webinars.slice((currentPage - 1) * webinarsPerPage, currentPage * webinarsPerPage);

    return (
        <>
            <UserNavbar />
            <div style={{
                padding: '40px 20px',
                backgroundColor: '#f5f5f5',
                minHeight: 'calc(100vh - 80px)',
            }}>
                <h1 style={{
                    textAlign: 'center',
                    color: '#333',
                    marginBottom: '40px',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                }}>Webinars</h1>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'center',
                }}>
                    {currentWebinars.map((webinar) => (
                        <div
                            key={webinar.webinarId}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                width: '300px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                backgroundColor: '#fff',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                const target = e.currentTarget;
                                target.style.transform = 'scale(1.03)';
                                target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                            }}
                            onMouseLeave={(e) => {
                                const target = e.currentTarget;
                                target.style.transform = 'scale(1)';
                                target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }}
                        >
                            <img
                                src={webinar.thumbnail}
                                alt={webinar.title}
                                style={{
                                    width: '100%',
                                    height: '180px',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                            <div style={{
                                padding: '15px',
                                textAlign: 'center'
                            }}>
                                <h2 style={{
                                    fontSize: '1.4rem',
                                    margin: '0 0 10px',
                                    color: '#333'
                                }}>{webinar.title}</h2>
                                <p style={{
                                    margin: '0 0 15px',
                                    color: '#666'
                                }}>{webinar.quotes}</p>
                                <a
                                    href={webinar.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-block',
                                        padding: '10px 20px',
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        borderRadius: '4px',
                                        fontSize: '0.9rem',
                                        fontWeight: 'bold',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        const target = e.currentTarget;
                                        target.style.backgroundColor = '#0056b3';
                                    }}
                                    onMouseLeave={(e) => {
                                        const target = e.currentTarget;
                                        target.style.backgroundColor = '#007bff';
                                    }}
                                >
                                    Watch Now
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{
                    textAlign: 'center',
                    marginTop: '30px'
                }}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            style={{
                                padding: '10px 20px',
                                margin: '0 5px',
                                border: 'none',
                                borderRadius: '4px',
                                backgroundColor: currentPage === index + 1 ? '#007bff' : '#ddd',
                                color: currentPage === index + 1 ? '#fff' : '#333',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default WebinarsList;


// import React, { useEffect, useState } from 'react';
// import { fetchAllWebinars } from '../../api/userAPI';
// import Footer from '../../components/common_pages/Footer';
// import UserNavbar from '../../components/common_pages/UserHeader';

// interface IWebinar {
//     webinarId: string;
//     title: string;
//     quotes: string;
//     thumbnail: string;
//     videoUrl: string;
//     createdAt: string;
//     isListed: boolean;
// }

// const WebinarsList: React.FC = () => {
//     const [webinars, setWebinars] = useState<IWebinar[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [totalPages, setTotalPages] = useState<number>(1);
//     const webinarsPerPage = 6;

//     useEffect(() => {
//         const loadWebinars = async () => {
//             try {
//                 const webinarsData = await fetchAllWebinars();
//                 setWebinars(webinarsData);
//                 setTotalPages(Math.ceil(webinarsData.length / webinarsPerPage));
//             } catch (error) {
//                 setError('Failed to load webinars');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadWebinars();
//     }, []);

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const handleToggleListing = async (webinarId: string) => {
//         try {
//             const response = await fetch(`/api/webinars/${webinarId}/toggle`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to toggle webinar listing');
//             }
//             const updatedWebinar = await response.json();
//             setWebinars((prevWebinars) =>
//                 prevWebinars.map((webinar) =>
//                     webinar.webinarId === webinarId ? updatedWebinar : webinar
//                 )
//             );
//         } catch (error) {
//             console.error('Error toggling webinar listing:', error);
//             setError('Failed to toggle webinar listing');
//         }
//     };

//     if (loading) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading webinars...</p>;
//     if (error) return <p style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>{error}</p>;

//     const currentWebinars = webinars.slice((currentPage - 1) * webinarsPerPage, currentPage * webinarsPerPage);

//     return (
//         <>
//             <UserNavbar />
//             <div style={{
//                 padding: '40px 20px',
//                 backgroundColor: '#f5f5f5',
//                 minHeight: 'calc(100vh - 80px)',
//             }}>
//                 <h1 style={{
//                     textAlign: 'center',
//                     color: '#333',
//                     marginBottom: '40px',
//                     fontSize: '2rem',
//                     fontWeight: 'bold'
//                 }}>Webinars</h1>
//                 <div style={{
//                     display: 'flex',
//                     flexWrap: 'wrap',
//                     gap: '20px',
//                     justifyContent: 'center',
//                 }}>
//                     {currentWebinars.map((webinar) => (
//                         <div
//                             key={webinar.webinarId}
//                             style={{
//                                 border: '1px solid #ddd',
//                                 borderRadius: '8px',
//                                 overflow: 'hidden',
//                                 width: '300px',
//                                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                                 backgroundColor: '#fff',
//                                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                                 cursor: 'pointer'
//                             }}
//                             onMouseEnter={(e) => {
//                                 const target = e.currentTarget;
//                                 target.style.transform = 'scale(1.03)';
//                                 target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
//                             }}
//                             onMouseLeave={(e) => {
//                                 const target = e.currentTarget;
//                                 target.style.transform = 'scale(1)';
//                                 target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
//                             }}
//                         >
//                             <img
//                                 src={webinar.thumbnail}
//                                 alt={webinar.title}
//                                 style={{
//                                     width: '100%',
//                                     height: '180px',
//                                     objectFit: 'cover',
//                                     transition: 'transform 0.3s ease',
//                                 }}
//                             />
//                             <div style={{
//                                 padding: '15px',
//                                 textAlign: 'center'
//                             }}>
//                                 <h2 style={{
//                                     fontSize: '1.4rem',
//                                     margin: '0 0 10px',
//                                     color: '#333'
//                                 }}>{webinar.title}</h2>
//                                 <p style={{
//                                     margin: '0 0 15px',
//                                     color: '#666'
//                                 }}>{webinar.quotes}</p>
//                                 <a
//                                     href={webinar.videoUrl}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     style={{
//                                         display: 'inline-block',
//                                         padding: '10px 20px',
//                                         backgroundColor: '#007bff',
//                                         color: '#fff',
//                                         textDecoration: 'none',
//                                         borderRadius: '4px',
//                                         fontSize: '0.9rem',
//                                         fontWeight: 'bold',
//                                         transition: 'background-color 0.3s ease'
//                                     }}
//                                     onMouseEnter={(e) => {
//                                         const target = e.currentTarget;
//                                         target.style.backgroundColor = '#0056b3';
//                                     }}
//                                     onMouseLeave={(e) => {
//                                         const target = e.currentTarget;
//                                         target.style.backgroundColor = '#007bff';
//                                     }}
//                                 >
//                                     Watch Now
//                                 </a>
//                                 <button
//                                     onClick={() => handleToggleListing(webinar.webinarId)}
//                                     style={{
//                                         display: 'block',
//                                         margin: '10px auto',
//                                         padding: '8px 16px',
//                                         backgroundColor: webinar.isListed ? '#dc3545' : '#28a745',
//                                         color: '#fff',
//                                         border: 'none',
//                                         borderRadius: '4px',
//                                         cursor: 'pointer',
//                                         fontSize: '0.9rem',
//                                         transition: 'background-color 0.3s ease'
//                                     }}
//                                     onMouseEnter={(e) => {
//                                         const target = e.currentTarget;
//                                         target.style.backgroundColor = webinar.isListed ? '#c82333' : '#218838';
//                                     }}
//                                     onMouseLeave={(e) => {
//                                         const target = e.currentTarget;
//                                         target.style.backgroundColor = webinar.isListed ? '#dc3545' : '#28a745';
//                                     }}
//                                 >
//                                     {webinar.isListed ? 'Unlist' : 'List'}
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div style={{
//                     textAlign: 'center',
//                     marginTop: '30px'
//                 }}>
//                     {Array.from({ length: totalPages }, (_, index) => (
//                         <button
//                             key={index + 1}
//                             onClick={() => handlePageChange(index + 1)}
//                             style={{
//                                 padding: '10px 20px',
//                                 margin: '0 5px',
//                                 border: 'none',
//                                 borderRadius: '4px',
//                                 backgroundColor: currentPage === index + 1 ? '#007bff' : '#ddd',
//                                 color: currentPage === index + 1 ? '#fff' : '#333',
//                                 cursor: 'pointer',
//                                 fontSize: '0.9rem',
//                                 transition: 'background-color 0.3s ease'
//                             }}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default WebinarsList;

