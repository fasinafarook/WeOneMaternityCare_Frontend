import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Api from '../Services/axios';
import userEndpoint from '../Services/endpoints/userEndpoints';
import useconversation from '../zustand/useConversation';

const userSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useconversation();

    const sendMessage = async (message: string) => {
        setLoading(true);
        try {
            const response = await Api.post(
                `${userEndpoint.sendMessage}/${selectedConversation._id}`,
                { message }
            );
            const data = response.data;
            if (data.error) throw new Error(data.error);
            setMessages([...messages, data]);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default userSendMessage;