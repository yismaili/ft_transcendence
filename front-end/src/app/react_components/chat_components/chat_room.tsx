import React from "react";
import "../css_files/resets.css";
import "../css_files/utilityClasses.css";
import "../../css_files/components/chat-secction-css/chat-room.css";
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