import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPackage, FiPlus, FiChevronLeft } from 'react-icons/fi';
import AdminNavbar from "../../components/common_pages/AdminHeader";
import Footer from "../../components/common_pages/Footer";
import { addBlog } from "../../api/adminAPI";

interface BlogData {
  title: string;
  image: File[];
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

  const isValidated = title && image.length > 0 && content;

  const onSubmit: SubmitHandler<BlogData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('image', data.image[0]);
      formData.append('content', data.content);

      const response = await addBlog(formData);
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
      <div
        style={{
          backgroundImage: "url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', color: '#333' }}>
              <FiPackage style={{ marginRight: '10px' }} />
              Add New Blog
            </h1>
            <button
              onClick={() => navigate("/admin/blogs")}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#00A3FF',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '5px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              <FiChevronLeft style={{ marginRight: '5px' }} /> Back to Blogs
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600', color: '#555' }}>
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter blog title"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '14px',
                }}
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.title.message}</p>}
            </div>
            <div>
              <label htmlFor="image" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600', color: '#555' }}>
                Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '14px',
                }}
                {...register("image", { required: "Image is required" })}
              />
              {errors.image && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.image.message}</p>}
            </div>
            <div>
              <label htmlFor="content" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600', color: '#555' }}>
                Content
              </label>
              <textarea
                id="content"
                placeholder="Enter blog content"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '14px',
                  resize: 'vertical',
                }}
                rows={6}
                {...register("content", { required: "Content is required" })}
              />
              {errors.content && <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.content.message}</p>}
            </div>
            <button
              type="submit"
              disabled={!isValidated}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: isValidated ? '#28A745' : '#ccc',
                color: isValidated ? '#fff' : '#666',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: isValidated ? 'pointer' : 'not-allowed',
              }}
            >
              <FiPlus style={{ marginRight: '8px' }} /> Add Blog
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddBlog;
