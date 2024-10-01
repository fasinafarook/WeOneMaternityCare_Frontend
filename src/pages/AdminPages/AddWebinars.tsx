import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { addWebinar } from '../../api/adminAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiChevronLeft } from 'react-icons/fi';
import AdminNavbar from '../../components/common_pages/AdminHeader';
import Footer from '../../components/common_pages/Footer';

interface WebinarData {
    title: string;
    quotes: string;
    thumbnail: FileList;
    video: FileList;
}

const AddWebinar: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<WebinarData>();

    const title = watch('title');
    const quotes = watch('quotes');
    const thumbnail = watch('thumbnail');
    const video = watch('video');

    const isValidated = title && quotes && thumbnail?.length > 0 && video?.length > 0;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('quotes', data.quotes);
        if (data.thumbnail.length > 0) {
            formData.append('thumbnail', data.thumbnail[0]);
        }
        if (data.video.length > 0) {
            formData.append('video', data.video[0]);
        }

        try {
            const response = await addWebinar(formData);
            console.log('Response:', response);

            if (response.webinarId) {
                toast.success('Webinar added successfully!');
                navigate('/admin/webinars');
            } else {
                toast.error(response.message || 'Something went wrong');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const backgroundImage = 'https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg';

    return (
        <>
            <AdminNavbar />
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    paddingTop: '60px',
                    paddingBottom: '60px',
                }}
            >
                <div
                    style={{
                        maxWidth: '700px',
                        margin: 'auto',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        padding: '40px',
                        borderRadius: '8px',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '30px',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#333',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <FiPlus style={{ marginRight: '10px' }} />
                            Add New Webinar
                        </h1>
                        <button
                            onClick={() => navigate('/admin/webinars')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'skyblue',
                                color: '#333',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: '0.3s',
                            }}
                        >
                            <FiChevronLeft style={{ marginRight: '5px' }} /> Back to Webinars
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ marginBottom: '20px' }}>
                            <label
                                htmlFor="title"
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    marginBottom: '5px',
                                    display: 'block',
                                    color: '#444',
                                }}
                            >
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Enter webinar title"
                                {...register('title', { required: 'Title is required' })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                    fontSize: '14px',
                                    transition: '0.3s',
                                }}
                            />
                            {errors.title && (
                                <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label
                                htmlFor="quotes"
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    marginBottom: '5px',
                                    display: 'block',
                                    color: '#444',
                                }}
                            >
                                Quotes
                            </label>
                            <textarea
                                id="quotes"
                                placeholder="Enter webinar quotes"
                                {...register('quotes', { required: 'Quotes are required' })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                    fontSize: '14px',
                                    transition: '0.3s',
                                }}
                            />
                            {errors.quotes && (
                                <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                    {errors.quotes.message}
                                </p>
                            )}
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label
                                htmlFor="thumbnail"
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    marginBottom: '5px',
                                    display: 'block',
                                    color: '#444',
                                }}
                            >
                                Thumbnail
                            </label>
                            <input
                                id="thumbnail"
                                type="file"
                                accept="image/*"
                                {...register('thumbnail', { required: 'Thumbnail is required' })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                    fontSize: '14px',
                                    transition: '0.3s',
                                }}
                            />
                            {errors.thumbnail && (
                                <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                    {errors.thumbnail.message}
                                </p>
                            )}
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label
                                htmlFor="video"
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    marginBottom: '5px',
                                    display: 'block',
                                    color: '#444',
                                }}
                            >
                                Video
                            </label>
                            <input
                                id="video"
                                type="file"
                                accept="video/*"
                                {...register('video', { required: 'Video is required' })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                    fontSize: '14px',
                                    transition: '0.3s',
                                }}
                            />
                            {errors.video && (
                                <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                    {errors.video.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={!isValidated || isSubmitting}
                            style={{
                                width: '100%',
                                padding: '15px',
                                backgroundColor: isValidated ? 'green' : 'gray',
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: isValidated ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: '0.3s',
                            }}
                        >
                            <FiPlus style={{ marginRight: '10px' }} />
                            {isSubmitting ? 'Adding...' : 'Add Webinar'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddWebinar;
