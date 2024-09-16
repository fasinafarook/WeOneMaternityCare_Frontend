import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUserchatt } from '../api/userAPI';

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const data = await getUserchatt(); // Use the API function here
        setConversations(data);
      } catch (error:any) {
        console.error('Fetch error:', error.message);
        toast.error('Failed to fetch conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversation;
