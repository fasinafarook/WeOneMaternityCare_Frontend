import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getWebinars, toggleWebinarListing } from '../../api/adminAPI'; // Ensure you have this API function
import toast from 'react-hot-toast';
import { FiPlus, FiPackage } from 'react-icons/fi';
import Pagination from '../../components/common_pages/Pagination';
import WebinarShimmer from '../../components/common_pages/webinar';
import AdminNavbar from '../../components/common_pages/AdminHeader';
import Footer from '../../components/common_pages/Footer';

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

  const currentPage = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');

  const fetchWebinars = useCallback(async (page: number, limit: number) => {
    setLoading(true);
    try {
      const response = await getWebinars(page, limit);
      if (Array.isArray(response)) {
        setWebinars(response);
        setTotalPages(Math.ceil(response.length / limit));
      } else {
        toast.error('Unexpected response format');
      }
    } catch (error) {
      toast.error('Failed to fetch webinars');
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
        <span>{isCurrentlyListed ? 'Unlist this webinar?' : 'List this webinar?'}</span>
        <button
          onClick={async () => {
            try {
              const updatedWebinar = await toggleWebinarListing(webinarId, !isCurrentlyListed);
              if (updatedWebinar) {
                setWebinars((prevWebinars) =>
                  prevWebinars.map((webinar) =>
                    webinar.webinarId === webinarId ? { ...webinar, isListed: !isCurrentlyListed } : webinar
                  )
                );
                toast.success(`Webinar ${isCurrentlyListed ? 'unlisted' : 'listed'} successfully`);
              }
            } catch (error) {
              toast.error('Failed to update webinar status');
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

  const handleToggleListing = (webinarId: string, isCurrentlyListed: boolean) => {
    showConfirmation(webinarId, isCurrentlyListed);
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen p-8">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <h1 className="text-3xl font-bold mb-4 sm:mb-0 text-gray-800">
              <FiPackage className="inline-block mr-2" />
              Webinar Management
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/admin/add-webinars')}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition duration-300 ease-in-out flex items-center"
              >
                <FiPlus className="mr-2" /> Add Webinar
              </button>
            </div>
          </div>

          {loading ? (
            <WebinarShimmer />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {webinars.map((webinar) => (
                <div
                  key={webinar.webinarId}
                  className="bg-white rounded-lg overflow-hidden border border-gray-800 transition duration-300 ease-in-out hover:shadow-lg"
                >
                  <div className="p-4 border-b border-gray-700">
                    <h5 className="text-xl font-semibold text-gray-800 truncate">{webinar.title}</h5>
                  </div>
                  <div className="p-4">
                    <video
                      src={webinar.videoUrl}
                      controls
                      width="300"
                      poster={webinar.thumbnail} // Use the thumbnail as the poster image
                      className="rounded-lg shadow-lg"
                    />
                    <p>{new Date(webinar.createdAt).toLocaleDateString()}</p>
                    <p className="text-xl font-semibold text-gray-800 truncate">{webinar.quotes}</p>
                    <button
                      onClick={() => handleToggleListing(webinar.webinarId, webinar.isListed)}
                      className={`mt-4 py-2 px-4 rounded ${
                        webinar.isListed ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                      } text-white transition duration-300 ease-in-out`}
                    >
                      {webinar.isListed ? 'Unlist Webinar' : 'List Webinar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Webinars;
