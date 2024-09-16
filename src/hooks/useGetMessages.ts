import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Api from '../Services/axios';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
  
    useEffect(() => {
      const getMessages = async () => {
        setLoading(true);
        try {
          console.log(`Fetching messages for conversation ID: ${selectedConversation?._id}`);
          const res = await Api.get(`/message/${selectedConversation?._id}`);
          console.log('Response:', res.data);
          const data = res.data;
          if (data.error) throw new Error(data.error);
          setMessages(data);
        } catch (error: any) {
          console.error('Error fetching messages:', error.message);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);
  
    return { messages, loading };
  };
  
export default useGetMessages;
