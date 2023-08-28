import React from "react";
import "../home-css/chat-section-css/chat-side-bar.css";
import TogleSwitch from "./chat_toggle_switch";
import ChatFriends from "./chat_friends";
import ChatAddBar from "./chat_addbar";
import SideIcons from "./chat_side_bar_icons";

function ChatSideBar(){
    return (<><section className="chatroom__sidebar ">
            <TogleSwitch leftSide="groups" rightSide="direct" />
            <SideIcons />
        </section></>);
}

export default ChatSideBar;