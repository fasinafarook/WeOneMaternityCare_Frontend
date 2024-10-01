import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCategorys, unlistCategory } from "../../api/adminAPI";
import toast from "react-hot-toast";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { FiPlus, FiList, FiTrash2, FiCheckSquare, FiPackage, FiLayers } from 'react-icons/fi';
import Pagination from "../../components/common_pages/Pagination";
import CategoryShimmer from "../../components/common_pages/category";
import AdminNavbar from "../../components/common_pages/AdminHeader";
import Footer from "../../components/common_pages/Footer";
import Swal from "sweetalert2";

interface Category {
  _id: string;
  categoryName: string;
  subCategories: string[];
  isListed: boolean;
}

const Category = () => {
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = 6; // Set the limit to 6 items per page

  const fetchCategorys = useCallback(async (page: number, limit: number = 6) => {
    setLoading(true);
    try {
      const response = await getCategorys(page, limit);
      if (response.success) {
        setCategorys(response.data);
        setTotalPages(Math.ceil(response.total / limit)); // Calculate total pages correctly
      }
    } catch (error) {
      toast.error("Failed to fetch Categories");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUnlist = async (categoryId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${categorys.find(cat => cat._id === categoryId)?.isListed ? "unlist" : "list"} this category?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed) {
      const response = await unlistCategory(categoryId);
      if (response.data) {
        toast.success(response.data.isListed ? "Category Listed" : "Category Unlisted");
        setCategorys(prevCategory => prevCategory.map(categorys => categorys._id === categoryId ? { ...categorys, isListed: !categorys.isListed } : categorys));
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  useEffect(() => {
    fetchCategorys(currentPage, limit);
  }, [currentPage, limit, fetchCategorys]);

  const listedStacks = categorys.filter(category => category.isListed);
  const unlistedStacks = categorys.filter(category => !category.isListed);

  return (
    <>
      <AdminNavbar />
      <div
        className="min-h-screen p-8 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="container mx-auto bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 sm:mb-0 flex items-center">
              <FiPackage className="inline-block mr-2 text-blue-600" />
              Category Management
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/admin/add-category")}
                className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-2 px-6 rounded-lg shadow-md flex items-center transition duration-300 ease-in-out"
              >
                <FiPlus className="mr-2" /> Add Category
              </button>
              <button
                onClick={() => setOpen(true)}
                className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white py-2 px-6 rounded-lg shadow-md flex items-center transition duration-300 ease-in-out"
              >
                <FiList className="mr-2" /> Unlisted Categories
              </button>
            </div>
          </div>

          {loading ? (
            <CategoryShimmer />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listedStacks.map((category: Category) => (
                <div
                  key={category._id}
                  className="bg-white rounded-lg overflow-hidden border border-gray-300 shadow-lg transition-transform transform hover:scale-105 duration-300"
                >
                  <div className="p-4 border-b border-gray-200">
                    <h5 className="text-xl font-semibold text-gray-800 truncate">{category.categoryName}</h5>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.subCategories.map((subCategory, index) => (
                        <span key={index} className="bg-blue-100 text-blue-900 px-2 py-1 rounded-lg text-sm">
                          {subCategory}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 flex items-center text-sm">
                        <FiLayers className="mr-1" /> {category.subCategories.length} Sub-Categories
                      </span>
                      <button
                        onClick={() => handleUnlist(category._id)}
                        className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                      >
                        {category.isListed ? <FiTrash2 /> : <FiCheckSquare />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />

      {/* Dialog for unlisted categories */}
      <Dialog open={open} size="lg" handler={() => setOpen(!open)}>
        <DialogHeader>Unlisted Categories</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {unlistedStacks.map((category: Category) => (
              <div
                key={category._id}
                className="bg-white rounded-lg overflow-hidden border border-gray-300 shadow-lg transition-transform transform hover:scale-105 duration-300"
              >
                <div className="p-4 border-b border-gray-200">
                  <h5 className="text-xl font-semibold text-gray-800 truncate">{category.categoryName}</h5>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.subCategories.map((subCategory, index) => (
                      <span key={index} className="bg-blue-100 text-blue-900 px-2 py-1 rounded-lg text-sm">
                        {subCategory}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 flex items-center text-sm">
                      <FiLayers className="mr-1" /> {category.subCategories.length} Sub-Categories
                    </span>
                    <button
                      onClick={() => handleUnlist(category._id)}
                      className="text-green-600 hover:text-green-800 transition duration-300 ease-in-out"
                    >
                      {category.isListed ? <FiTrash2 /> : <FiCheckSquare />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default Category;
