
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { setSocket, setOnlineUsers, clearSocket } from '../redux/slice/socketSlice';
import { AppDispatch } from '../redux/store';
import { getProfileDetails } from '../api/userAPI'; 

const useSocket = () => {
  console.log('eh');
  
  const dispatch: AppDispatch = useDispatch();
  const [socket, setSocketState] = useState<Socket | null>(null); 
  const [userId, setUserId] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsersState] = useState<string[]>([]); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfileDetails();
        console.log('sckt prog',profileData);
        console.log('sckt progID',profileData?.data._id);

        
        setUserId(profileData?.data._id); 
        console.log('sckt progsetUserId',setUserId);

      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    console.log('User ID in socket effect:', userId);  // Check if userId is valid before initializing socket


    if (userId) {
      console.log('Initializing socket with userId:', userId);  // Confirm that this runs when userId is set
      
      const socket = io('https://weone-maternitycare.online', {
        query: { userId },
      });

      setSocketState(socket); 
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers', (users: string[]) => {
        setOnlineUsersState(users); 
        dispatch(setOnlineUsers(users));
      });

      return () => {
        dispatch(clearSocket());
        socket.disconnect();
      };
    }
  }, [userId, dispatch]);

  return { socket, onlineUsers }; 
};

export default useSocket;
