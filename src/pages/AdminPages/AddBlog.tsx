import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPackage, FiPlus, FiChevronLeft } from 'react-icons/fi';
import AdminNavbar from "../../components/common_pages/AdminHeader";
import Footer from "../../components/common_pages/Footer";
import { addBlog } from "../../api/adminAPI";

interface BlogData {
  title: string;
  image: File[]; // Use FileList type to handle file input
  content: string;
}
const AddBlog = () => {
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BlogData>();

  const title = watch("title");
  const image = watch("image");
  const content = watch("content");

  console.log('image',image);
  

  const isValidated = title && image.length > 0 && content;

  const onSubmit: SubmitHandler<BlogData> = async (data) => {
    try {
      // Construct FormData
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('image', data.image[0]); // Use the first file from FileList
      formData.append('content', data.content);
      console.log('File to be uploaded:', data.image[0]);

      // Pass FormData to the API call
      const response = await addBlog(formData);
      console.log('dgsha',response);
      

      if (response.success) {
        toast.success("Blog added successfully!");
        navigate("/admin/blogs");
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <FiPackage className="mr-2" />
            Add New Blog
          </h1>
          <button
            onClick={() => navigate("/admin/blogs")}
            className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out flex items-center"
            style={{ background: 'skyblue' }}
          >
            <FiChevronLeft className="mr-1" /> Back to Blogs
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter blog title"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              placeholder="Enter blog content"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              rows={6}
              {...register("content", { required: "Content is required" })}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValidated}
            className={`w-full flex items-center justify-center ${
              isValidated
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out`}
            style={{ background: 'green' }}
          >
            <FiPlus className="mr-2" /> Add Blog
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddBlog;
