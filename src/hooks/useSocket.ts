
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { setSocket, setOnlineUsers, clearSocket } from '../redux/slice/socketSlice';
import { AppDispatch } from '../redux/store';
import { getProfileDetails } from '../api/userAPI'; 

const useSocket = () => {
  const dispatch: AppDispatch = useDispatch();
  const [socket, setSocketState] = useState<Socket | null>(null); 
  const [userId, setUserId] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsersState] = useState<string[]>([]); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfileDetails();
        setUserId(profileData?.data._id); 
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (userId) {
      const socket = io('https://weone-maternitycare.online/ws/', {
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
