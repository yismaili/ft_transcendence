import React from "react";
import "./chat-side-bar.css";
import TogleSwitch from "../toggle-switch/chat_toggle_switch";
import ChatFriends from "../chat_friends/chat_friends";
import ChatAddBar from "../chat_addbar/chat_addbar";
import SideIcons from "../chat-side-bar-icons/chat_side_bar_icons";

function ChatSideBar() {
  return (
    <>
      <section className="chatroom__sidebar ">
        <TogleSwitch />
        <ChatFriends />
        <ChatAddBar />      
        <SideIcons />
      </section>
    </>
  );
}

export default ChatSideBar;
