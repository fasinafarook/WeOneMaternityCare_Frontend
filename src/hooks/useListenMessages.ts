import { useEffect } from 'react';
import useSocket from './useSocket';
import useConversation from '../zustand/useConversation';

interface Message {
  senderId: string;
  text: string;
  
}

const useListenMessages = () => {
  const { socket } = useSocket(); 
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on('newMessage', (newMessage: Message) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      socket?.off('newMessage');
    };
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
