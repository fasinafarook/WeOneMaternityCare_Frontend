import { useEffect, useState } from 'react';
import { fetchBlogs } from '../../api/userAPI'; // Import the fetchBlogs function
import Footer from '../../components/common_pages/Footer';
import UserNavbar from '../../components/common_pages/UserHeader';

interface Blog {
    _id: string;
    title: string;
    content: string;
    image: string;
    date: string;
    isListed: boolean;
}

const BlogList = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(5); // Define the number of blogs per page

    useEffect(() => {
        const loadBlogs = async () => {
            setLoading(true);
            try {
                const data = await fetchBlogs(page, limit);
                setBlogs(data.blogs || []);
            } catch (error) {
                setError('Failed to fetch blogs');
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, [page, limit]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <UserNavbar />
            <div className="min-h-screen p-8 bg-gray-100">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">Blogs</h1>
                    {blogs.length === 0 ? (
                        <p>No blogs available</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <div key={blog._id} className="bg-white p-4 rounded-lg shadow-lg">
                                    <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-t-lg mb-4" />
                                    <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                                    <p className="text-gray-600 mb-4">{blog.content.slice(0, 100)}...</p>
                                    <p className="text-gray-400 text-sm">{blog.date}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-8 flex justify-center">
                        <button 
                            onClick={() => setPage((prev) => prev + 1)}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
                        >
                            Next Page
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogList;
