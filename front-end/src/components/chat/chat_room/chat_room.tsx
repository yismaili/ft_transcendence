import React from "react";
import "./chat-room.css";
import ChatSection from "../chat_section/chat_section";
import ChatSideBar from "../chat-side-bar/chat_side_bar";

function ChatRoom() {
  return (
    <div className="chatRoom">
      <ChatSideBar />
      <ChatSection />
    </div>
  );
}

export default ChatRoom;
