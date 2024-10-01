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
      setValue("title", serviceProviderInfo.service);
      setValue("price", serviceProviderInfo.rate);

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

    try {
      const response = await addSlot(data);
      
      if (response && response.success) {
        toast.success("Slot added successfully!");
        navigate("/serviceProvider/get-slots");
      } else {
        toast.error(response?.message || "Time slot already taken");
      }
    } catch (error: any) {
      console.error('Error adding slot:', error.message);
      toast.error(error.response?.data?.message || "There was an error adding the slot. Please try again.");
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
  };

  return (
    <>
      <AppNavbar />
      <div style={{
        minHeight: '100vh',
        backgroundImage: "url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '12px 0',
      }}>
        <div style={{
          maxWidth: '600px',
          margin: 'auto',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}>
          <div style={{
            backgroundColor: '#91939f',
            color: 'white',
            padding: '24px',
            textAlign: 'center',
          }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Add a Slot</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '32px', display: 'grid', gap: '16px' }}>
            <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px' }}>Select Date</label>
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
                      style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
                    />
                  )}
                />
                {errors.date && <p style={{ marginTop: '8px', color: 'red' }}>{errors.date.message}</p>}
              </div>

              <div>
                <label htmlFor="start-time" style={{ display: 'block', marginBottom: '8px' }}>Start time</label>
                <input
                  type="time"
                  id="start-time"
                  {...register("timeFrom", { required: "Start time is required" })}
                  style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                {errors.timeFrom && <p style={{ marginTop: '8px', color: 'red' }}>{errors.timeFrom.message}</p>}
              </div>

              <div>
                <label htmlFor="end-time" style={{ display: 'block', marginBottom: '8px' }}>End time</label>
                <input
                  type="time"
                  id="end-time"
                  {...register("timeTo", { required: "End time is required" })}
                  style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                {errors.timeTo && <p style={{ marginTop: '8px', color: 'red' }}>{errors.timeTo.message}</p>}
              </div>

              <div>
                <label htmlFor="domain" style={{ display: 'block', marginBottom: '8px' }}>Main Category</label>
                <input
                  type="text"
                  value={serviceProviderInfo?.service || ""}
                  disabled
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f7f7f7',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px' }}>Sub-Services</label>
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
                {errors.services && <p style={{ marginTop: '8px', color: 'red' }}>{errors.services.message}</p>}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', resize: 'none', height: '100px' }}
                />
                {errors.description && <p style={{ marginTop: '8px', color: 'red' }}>{errors.description.message}</p>}
              </div>

              <div>
                <label htmlFor="price" style={{ display: 'block', marginBottom: '8px' }}>Price</label>
                <input
                  type="number"
                  id="price"
                  {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be positive" } })}
                  style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                {errors.price && <p style={{ marginTop: '8px', color: 'red' }}>{errors.price.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                marginTop: '16px',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#45a049'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#4caf50'}
            >
              Add Slot
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddSlot;
