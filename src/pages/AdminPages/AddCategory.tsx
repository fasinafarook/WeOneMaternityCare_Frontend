import { TagsInput } from "react-tag-input-component";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { addCategory } from "../../api/adminAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiPackage, FiPlus, FiChevronLeft } from 'react-icons/fi';
import AdminNavbar from "../../components/common_pages/AdminHeader";
import Footer from "../../components/common_pages/Footer";

interface CategoryData {
  categoryName: string;
  subCategories: string[];
}

const AddCategory = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<CategoryData>();

  const categoryName = watch("categoryName");
  const subCategories = watch("subCategories");

  const isValidated = categoryName && subCategories?.length > 0;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await addCategory(data as CategoryData);
      if (response.success) {
        toast.success("Stack added successfully!");
        navigate("/admin/categorys-list");
      } else {
        console.log(response);
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <>
    <AdminNavbar/>
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FiPackage className="mr-2" />
          Add New Category
        </h1>
        <br /><br />
        <button
          onClick={() => navigate("/admin/categorys-list")}
          className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out flex items-center" style={{background:'skyblue'}}
        >
          <FiChevronLeft className="mr-1" /> Back to Category
        </button>
      </div>
<br /><br />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
            Name of Category
          </label>
          <input
            id="categoryName"
            type="text"
            placeholder="Enter stack name"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
            {...register("categoryName", { required: "Stack name is required" })}
          />
          {errors.categoryName && (
            <p className="text-red-500 text-sm mt-1">{errors.categoryName.message}</p>
          )}
        </div>
<br />
        <div>
          <label htmlFor="subCategories" className="block text-sm font-medium text-gray-700 mb-1">
          subCategories
          </label>
          <TagsInput
            value={getValues("subCategories") || []}
            onChange={(tags) => setValue("subCategories", tags)}
            name="subCategories"
            placeHolder="Enter Sub-Categorys and press enter"
            classNames={{
              input: "w-full p-2 border border-gray-300 rounded-md  transition duration-300 ease-in-out",
              tag: "bg-blue-100 text-blue-800 rounded-full px-2 py-1 m-1 text-sm",
            }}
          />
        </div>
        <br />

        <button
          type="submit"      
          disabled={!isValidated}
          className={`w-full flex items-center justify-center ${
            isValidated
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out`} style={{background:'green'}}
        >
          <FiPlus className="mr-2" /> Add Category
        </button>
      </form>
    </div>
    <br /><br /><br />
    <Footer/>
    </>
  );
};

export default AddCategory;