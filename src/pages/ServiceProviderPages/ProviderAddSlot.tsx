import { useForm, Controller, SubmitHandler } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addSlot, getDomains } from "../../api/serviceProviderAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AppNavbar from "../../components/common_pages/ProviderHeader";
import Footer from "../../components/common_pages/Footer";

interface Options {
  value: string;
  label: string;
}

interface Domain {
  _id: string;
  categoryName: string;
  subCategories: string[];
  isListed: boolean;
}

interface Slot {
  _id?: string;
  date: Date;
  description: string;
  services: Options[];
  price: number;
  timeFrom: Date;
  timeTo: Date;
  title: string;
  status?: "open" | "booked";
}

const AddSlot = () => {
  const [domainsList, setDomainsList] = useState<Domain[]>([]);
  const [services, setServices] = useState<Options[]>([]);
  const serviceProviderInfo = useSelector((state: RootState) => state.auth.serviceProviderInfo);

  const navigate = useNavigate();

  const { register, handleSubmit, control, setValue, formState: { errors }, trigger } = useForm<Slot>({
    defaultValues: {},
  });

  const fetchDomainList = async () => {
    const response = await getDomains();
    setDomainsList(response.data);
  };

  useEffect(() => {
    if (serviceProviderInfo && !serviceProviderInfo.isApproved) {
      navigate('/serviceProvider/get-slots');
      return;
    }
    fetchDomainList();

    if (serviceProviderInfo) {
      // Pre-fill main category and fee
      setValue("title", serviceProviderInfo.service);
      setValue("price", serviceProviderInfo.rate);

      // Fetch sub-categories based on the main category
      const selectedDomain = domainsList.find(domain => domain.categoryName === serviceProviderInfo.service);
      if (selectedDomain) {
        const options: Options[] = selectedDomain.subCategories.map(item => ({ value: item, label: item }));
        setServices(options);
      }
    }
  }, [serviceProviderInfo, domainsList]);

  const onSubmit: SubmitHandler<Slot> = async (data: Slot) => {
    console.log("Form Data:", data);

    const date = new Date(data.date);
    const dateString = date.toLocaleDateString("en-CA");

    const timeFrom = new Date(`${dateString}T${data.timeFrom}:00+05:30`);
    const timeTo = new Date(`${dateString}T${data.timeTo}:00+05:30`);

    data.timeFrom = timeFrom;
    data.timeTo = timeTo;

    const dateNow = new Date();

    if (timeFrom <= dateNow || timeTo <= dateNow) {
      toast.error("Please select a time later than the current time.");
      return;
    }

    if (timeFrom > timeTo) {
      toast.error("End time must be later than start time.");
      return;
    }

    const response = await addSlot(data);
    if (response.success) {
      toast.success("Slot added successfully!"); // Success message
      navigate("/serviceProvider/get-slots");
    } else {
      toast.error(response.message);
    }
  };

  const handleDomainChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDomain = e.target.value;

    const domainFullData = domainsList.filter(
      (stack) => stack.categoryName === selectedDomain
    );
    const options: Options[] = domainFullData[0]?.subCategories.map((item) => ({ value: item, label: item })) || [];

    setServices(options);
    setValue("services", []);
    setValue("title", selectedDomain);
    await trigger("title");
    console.log("domain full data: ", services);
  };

  return (
    <>
      <AppNavbar />
      <div className="min-h-screen bg-white-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-[#91939f] text-white py-6 px-8">
            <h1 className="text-3xl font-bold">Book a Slot</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholderText="Select date"
                      minDate={new Date()}
                    />
                  )}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
              </div>

              <div>
                <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-2">Start time</label>
                <input
                  type="time"
                  id="start-time"
                  {...register("timeFrom", { required: "Start time is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.timeFrom && <p className="mt-1 text-sm text-red-600">{errors.timeFrom.message}</p>}
              </div>

              <div>
                <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-2">End time</label>
                <input
                  type="time"
                  id="end-time"
                  {...register("timeTo", { required: "End time is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.timeTo && <p className="mt-1 text-sm text-red-600">{errors.timeTo.message}</p>}
              </div>

              <div className="col-span-2">
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">Main Category</label>
                <input
                  type="text"
                  value={serviceProviderInfo?.service || ""}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sub-Services</label>
                {services && (
                  <Controller
                    name="services"
                    control={control}
                    rules={{ required: "At least one service is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={services}
                        className="w-full"
                      />
                    )}
                  />
                )}
                {errors.services && <p className="mt-1 text-sm text-red-600">{errors.services.message}</p>}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none h-24"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Fee</label>
                <input
                  type="number"
                  value={serviceProviderInfo?.rate || ""}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="px-6 py-3 bg-[#19328F] text-white font-medium rounded-md hover:bg-[#142057] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Book Slot
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddSlot;
