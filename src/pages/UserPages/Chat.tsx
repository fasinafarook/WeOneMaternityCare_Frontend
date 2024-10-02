import React from "react";
import Sidebar from "../../components/chat/Sidebar";
import MessageContainer from "../../components/chat/MessageContainer";
import UserNavbar from "../../components/common_pages/UserHeader";
import Footer from "../../components/common_pages/Footer";
const Chat: React.FC = () => {
  return (
    <>
      <UserNavbar />
      <div
        className="p-4 h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://th.bing.com/th/id/OIP.pTI0qX8mWlHm4WyjPeUzLQHaNK?rs=1&pid=ImgDetMain')",
        }}
      >
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chat;
