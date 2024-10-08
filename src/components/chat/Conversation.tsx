import React from "react";
import useConversation from "../../zustand/useConversation";
import useSocket from "../../hooks/useSocket";

interface ConversationProps {
  conversation: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  lastIdx: boolean;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  lastIdx,
}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocket(); // Destructure onlineUsers from useSocket

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id); // Check if the conversation user is online

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-blue-500 hover:text-white rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-blue-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            {conversation?.profilePicture ? (
              <img
                src={conversation.profilePicture}
                alt="user avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <img
                src="https://th.bing.com/th/id/OIP.Gr08ttdkyNaZGKJflDeRrAHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="default avatar"
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.name}</p>
            {/* <span className='text-xl'>o</span> */}
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
