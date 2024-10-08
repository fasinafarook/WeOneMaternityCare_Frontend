import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from './MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages: React.FC = () => {
  const { messages = [], loading } = useGetMessages(); 
  useListenMessages()
  console.log('msg', messages);

  const lastMessageRef = useRef();
  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior:'smooth'})

    })
  },[messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 &&
       messages.map((messages) => (
        <div key={messages._id}
        ref={lastMessageRef}
        >
        <Message  message={messages} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
