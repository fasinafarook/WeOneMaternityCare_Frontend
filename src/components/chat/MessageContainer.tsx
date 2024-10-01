import React, { useEffect, useState } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from "react-icons/ti";
import useconversation from '../../zustand/useConversation';
import Api from '../../Services/axios';  
import userEndpoint from '../../Services/endpoints/userEndpoints'; 

const MessageContainer: React.FC = () => {
    const { selectedConversation, setSelectedConversation } = useconversation();
    const [username, setUsername] = useState<string>(''); 

    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const { data } = await Api.get(userEndpoint.getProfileDetails);
                setUsername(data?.data.name || 'User');  
            } catch (error) {
                console.error("Error fetching profile details:", error);
            }
        };

        fetchProfileDetails();

        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected username={username} />
            ) : (
                <>
                    <div className='bg-white px-4 py-2 mb-2'>
                        <span className='label-text'>To:</span>{""}
                        <span className='text-grey-900 font-bold'>{selectedConversation.name}</span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default MessageContainer;

interface NoChatSelectedProps {
    username: string;
}

const NoChatSelected: React.FC<NoChatSelectedProps> = ({ username }) => {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-grey-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome, {username}</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className="text-3xl md:text-6xl text-center" />
            </div>
        </div>
    );
};
