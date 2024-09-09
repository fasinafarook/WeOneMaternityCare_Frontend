import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSlotsList, editSlot } from '../../api/serviceProviderAPI';
import AppNavbar from '../../components/common_pages/ProviderHeader';
import Footer from '../../components/common_pages/Footer';

const EditSlot: React.FC = () => {
  const [slotData, setSlotData] = useState({
    title: '',
    from: '',
    to: '',
    price: '',
    services: [] as string[],
    description: '',
    status: 'open', // Default status
  });

  const [loading, setLoading] = useState(true);
  const { slotId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('slotId:', slotId); // Add this line to debug

    const fetchSlotDetails = async () => {
      try {
        console.log('slotIds:', slotId); // Add this line to debug

        const { data } = await getSlotsList(1, 100, '');
        console.log('slotIdss:', data); // Add this line to debug
        // Adjust page and limit as needed
        const foundSlot = data.find((slot: any) => slot._id === slotId);
console.log('foundSlot',foundSlot);

        if (foundSlot) {
          // Assuming `schedule` contains the slot details you need
          const schedule = foundSlot.schedule[0] || {};
          
          // Convert UTC date to local date format (yyyy-MM-ddThh:mm)
          const formatDate = (date: string) => {
            const localDate = new Date(date);
            return localDate.toISOString().slice(0, 16);
          };

          setSlotData({
            title: foundSlot.title || '',
            from: formatDate(schedule.from || ''),
            to: formatDate(schedule.to || ''),
            price: schedule.price || '',
            services: schedule.services || [],
            description: schedule.description || '',
            status: foundSlot.status || 'open', // Update if needed
          });
        }
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching slot details:', error.message);
        setLoading(false); // Stop loading on error
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
    try {
      await editSlot(slotId as string, slotData);
      navigate('/serviceProvider/get-slots'); // Redirect after successful edit
    } catch (error: any) {
      console.error('Error updating slot:', error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <AppNavbar />
      <div style={{ maxWidth: '800px', margin: 'auto', padding: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Edit Slot</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>From</label>
            <input
              type="datetime-local"
              name="from"
              value={slotData.from}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '0.25rem' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>To</label>
            <input
              type="datetime-local"
              name="to"
              value={slotData.to}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '0.25rem' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Price</label>
            <input
              type="number"
              name="price"
              value={slotData.price}
              readOnly
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '0.25rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Services</label>
            <input
              type="text"
              name="services"
              value={slotData.services.join(', ')}
              readOnly
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '0.25rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Description</label>
            <textarea
              name="description"
              value={slotData.description}
              onChange={handleInputChange}
              style={{ width: '100%', height: '150px', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '0.25rem' }}
            ></textarea>
          </div>
          {/* Uncomment if you need to edit status */}
          {/* <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Status</label>
            <input
              type="text"
              name="status"
              value={slotData.status}
              readOnly
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '0.25rem' }}
            />
          </div> */}
          <button type="submit" style={{ padding: '0.75rem 1.5rem', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
            Update Slot
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditSlot;
