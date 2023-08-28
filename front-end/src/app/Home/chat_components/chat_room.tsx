import React from "react";
import "../home-css/chat-section-css/chat-room.css";
import ChatSection from "./chat_section";
import ChatSideBar from "./chat_side_bar";

function ChatRoom(){
    return (
    <div className="chatRoom">
            <ChatSideBar />
            <ChatSection />
    </div>);
}

export default ChatRoom;