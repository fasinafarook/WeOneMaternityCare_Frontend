import React, { useEffect, useState } from 'react';
import { getProfileDetails } from '../../api/userAPI'; // Update with the actual path

interface MessageProps {
  message: {
    senderId: string;
    message: string;
    createdAt: string; // Ensure createdAt is included in the message props
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const profile = await getProfileDetails();
        console.log('profile', profile);
        console.log('profileid', profile.data._id);
        setUserId(profile.data._id); // Assuming _id is the user ID in the profile data
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Check if the message was sent by the authenticated user
  const fromMe = userId === message.senderId;

  // Set class names and styles based on whether it's a sent or received message
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';  // Right if sent, left if received
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-300'; // Blue for sent, gray for received
  const textColor = fromMe ? 'text-white' : 'text-black';  // White text for sent, black text for received
 
  // Format the createdAt timestamp
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = hours.toString().padStart(2, '0');
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  return (
    <div className={`chat ${chatClassName}`}>
      {/* Avatar */}
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img
            alt="User avatar"
            src="https://th.bing.com/th/id/OIP.Gr08ttdkyNaZGKJflDeRrAHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          />
        </div>
      </div>
      
      {/* Message bubble */}
      <div className={`chat-bubble ${textColor} ${bubbleBgColor} pb-2`}>
        {message.message}
      </div>

      {/* Message footer with timestamp */}
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
        {formatDate(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
