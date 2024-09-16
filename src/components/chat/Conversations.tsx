import React from 'react'
import Conversation from './Conversation'
import useGetConversation from '../../hooks/useGetConversation'
const Conversations: React.FC = () => {
    console.log('no');
    
    const {loading ,conversations} = useGetConversation()
    console.log("conversations:",conversations);
    
console.log('ok');

  return (
    <div className='py-2 flex-col overflow-auto'>
        {conversations.map((conversation,idx)=>(
            <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversation.length - 1}
            />
        ))}
        {loading ? <span className='loading loading-spinner mx-auto'></span> : null}

        
      
    </div>
  )
}

export default Conversations
