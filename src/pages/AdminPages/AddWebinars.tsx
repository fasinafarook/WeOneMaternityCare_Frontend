// // import React from 'react';
// import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
// import { addWebinar } from '../../api/adminAPI';
// // import { TagsInput } from 'react-tag-input-component';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import { FiPlus, FiChevronLeft } from 'react-icons/fi';
// import AdminNavbar from '../../components/common_pages/AdminHeader';
// import Footer from '../../components/common_pages/Footer';

// interface WebinarData {
//     title: string;
//     quotes: string;
//     thumbnail: FileList;
//     video: FileList;
// }

// const AddWebinar = () => {
//     const navigate = useNavigate();
//     const {
//         register,
//         handleSubmit,
//         // setValue,
//         // getValues,
//         watch,
//         formState: { errors },
//     } = useForm<WebinarData>();

//     const title = watch('title');
//     const quotes = watch('quotes');
//     const thumbnail = watch('thumbnail');
//     const video = watch('video');

//     const isValidated = title && quotes && thumbnail?.length > 0 && video?.length > 0;

//     const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//         const formData = new FormData();
//         formData.append('title', data.title);
//         formData.append('quotes', data.quotes);
//         if (data.thumbnail.length > 0) {
//             formData.append('thumbnail', data.thumbnail[0]);
//         }
//         if (data.video.length > 0) {
//             formData.append('video', data.video[0]);
//         }

//         try {
//             const response = await addWebinar(formData);
//             console.log('res',response);
            
//             if (response.success) {
//                 toast.success('Webinar added successfully!');
//                 navigate('/admin/webinars');
//             } else {
//                 toast.error(response.message || 'Something went wrong');
//             }
//         } catch (error) {
//             toast.error('An unexpected error occurred');
//         }
//     };

//     return (
//         <>
//             <AdminNavbar />
//             <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//                 <div className="flex items-center justify-between mb-6">
//                     <h1 className="text-2xl font-bold text-gray-800 flex items-center">
//                         <FiPlus className="mr-2" />
//                         Add New Webinar
//                     </h1>
//                     <button
//                         onClick={() => navigate('/admin/webinars')}
//                         className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out flex items-center"
//                         style={{ background: 'skyblue' }}
//                     >
//                         <FiChevronLeft className="mr-1" /> Back to Webinars
//                     </button>
//                 </div>

//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                     <div>
//                         <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                             Title
//                         </label>
//                         <input
//                             id="title"
//                             type="text"
//                             placeholder="Enter webinar title"
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
//                             {...register('title', { required: 'Title is required' })}
//                         />
//                         {errors.title && (
//                             <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
//                         )}
//                     </div>

//                     <div>
//                         <label htmlFor="quotes" className="block text-sm font-medium text-gray-700 mb-1">
//                             Quotes
//                         </label>
//                         <textarea
//                             id="quotes"
//                             placeholder="Enter webinar quotes"
//                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
//                             {...register('quotes', { required: 'Quotes are required' })}
//                         />
//                         {errors.quotes && (
//                             <p className="text-red-500 text-sm mt-1">{errors.quotes.message}</p>
//                         )}
//                     </div>

//                     <div>
//                         <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
//                             Thumbnail
//                         </label>
//                         <input
//                             id="thumbnail"
//                             type="file"
//                             accept="image/*"
//                             {...register('thumbnail', { required: 'Thumbnail is required' })}
//                             className="w-full p-2 border border-gray-300 rounded-md transition duration-300 ease-in-out"
//                         />
//                         {errors.thumbnail && (
//                             <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>
//                         )}
//                     </div>

//                     <div>
//                         <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">
//                             Video
//                         </label>
//                         <input
//                             id="video"
//                             type="file"
//                             accept="video/*"
//                             {...register('video', { required: 'Video is required' })}
//                             className="w-full p-2 border border-gray-300 rounded-md transition duration-300 ease-in-out"
//                         />
//                         {errors.video && (
//                             <p className="text-red-500 text-sm mt-1">{errors.video.message}</p>
//                         )}
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={!isValidated}
//                         className={`w-full flex items-center justify-center ${
//                             isValidated
//                                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                         } font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out`}
//                         style={{ background: 'green' }}
//                     >
//                         <FiPlus className="mr-2" /> Add Webinar
//                     </button>
//                 </form>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default AddWebinar;
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
    
            // Assuming the success condition is based on having a valid `webinarId`
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
    
    return (
        <>
            <AdminNavbar />
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                        <FiPlus className="mr-2" />
                        Add New Webinar
                    </h1>
                    <button
                        onClick={() => navigate('/admin/webinars')}
                        className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out flex items-center"
                        style={{ background: 'skyblue' }}
                    >
                        <FiChevronLeft className="mr-1" /> Back to Webinars
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
                            placeholder="Enter webinar title"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="quotes" className="block text-sm font-medium text-gray-700 mb-1">
                            Quotes
                        </label>
                        <textarea
                            id="quotes"
                            placeholder="Enter webinar quotes"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                            {...register('quotes', { required: 'Quotes are required' })}
                        />
                        {errors.quotes && (
                            <p className="text-red-500 text-sm mt-1">{errors.quotes.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                            Thumbnail
                        </label>
                        <input
                            id="thumbnail"
                            type="file"
                            accept="image/*"
                            {...register('thumbnail', { required: 'Thumbnail is required' })}
                            className="w-full p-2 border border-gray-300 rounded-md transition duration-300 ease-in-out"
                        />
                        {errors.thumbnail && (
                            <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">
                            Video
                        </label>
                        <input
                            id="video"
                            type="file"
                            accept="video/*"
                            {...register('video', { required: 'Video is required' })}
                            className="w-full p-2 border border-gray-300 rounded-md transition duration-300 ease-in-out"
                        />
                        {errors.video && (
                            <p className="text-red-500 text-sm mt-1">{errors.video.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!isValidated || isSubmitting}
                        className={`w-full flex items-center justify-center ${
                            isValidated
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        } font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out`}
                        style={{ background: 'green' }}
                    >
                        <FiPlus className="mr-2" /> {isSubmitting ? 'Adding...' : 'Add Webinar'}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default AddWebinar;
