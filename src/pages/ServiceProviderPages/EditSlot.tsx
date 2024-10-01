import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSlotsList, editSlot } from '../../api/serviceProviderAPI';
import AppNavbar from '../../components/common_pages/ProviderHeader';
import Footer from '../../components/common_pages/Footer';
import toast from 'react-hot-toast';

const EditSlot: React.FC = () => {
  const [slotData, setSlotData] = useState({
    title: '',
    from: '',
    to: '',
    price: '',
    services: [] as string[],
    description: '',
    status: 'open',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slotId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlotDetails = async () => {
      try {
        const { data } = await getSlotsList(1, 100, '');
        const foundSlot = data.find((slot: any) => slot._id === slotId);

        if (foundSlot) {
          const schedule = foundSlot.schedule[0] || {};

          const formatDate = (date: string) => {
            const localDate = new Date(date);
            const year = localDate.getFullYear();
            const month = String(localDate.getMonth() + 1).padStart(2, '0');
            const day = String(localDate.getDate()).padStart(2, '0');
            const hours = String(localDate.getHours()).padStart(2, '0');
            const minutes = String(localDate.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
          };

          setSlotData({
            title: foundSlot.title || '',
            from: formatDate(schedule.from || ''),
            to: formatDate(schedule.to || ''),
            price: schedule.price || '',
            services: schedule.services || [],
            description: schedule.description || '',
            status: foundSlot.status || 'open',
          });
        }
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching slot details:', error.message);
        setLoading(false);
      }
    };

    fetchSlotDetails();
  }, [slotId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSlotData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fromDate = new Date(slotData.from);
    const toDate = new Date(slotData.to);

    if (toDate <= fromDate) {
      setError('The "To" date must be greater than the "From" date.');
      return;
    }

    setError(null);

    try {
      await editSlot(slotId as string, slotData);
      toast.success('Slot updated successfully.');
      navigate('/serviceProvider/get-slots', { state: { refresh: true } });
    } catch (error: any) {
      console.error('Error updating slot:', error.message);
      toast.error(error.message);
    }
  };

  const currentDateTime = new Date().toISOString().slice(0, 16);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <AppNavbar />
      <div
        style={{
          backgroundImage: `url('https://www.healthymummy.com/wp-content/uploads/2016/10/Pregnant-woman-in-hospital-1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '3rem 0',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            maxWidth: '800px',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1.5rem',
            }}
          >
            Edit Slot
          </h1>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {error && (
              <div
                style={{
                  color: 'red',
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}
              >
                {error}
              </div>
            )}
            <div>
              <label
                style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                From
              </label>
              <input
                type="datetime-local"
                name="from"
                value={slotData.from}
                onChange={handleInputChange}
                min={currentDateTime}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                To
              </label>
              <input
                type="datetime-local"
                name="to"
                value={slotData.to}
                onChange={handleInputChange}
                min={currentDateTime}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                value={slotData.price}
                readOnly
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#f9f9f9',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                Services
              </label>
              <input
                type="text"
                name="services"
                value={slotData.services.join(', ')}
                readOnly
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#f9f9f9',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                Description
              </label>
              <textarea
                name="description"
                value={slotData.description}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  height: '150px',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                color: '#fff',
                backgroundColor: '#007bff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            >
              Update Slot
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditSlot;
