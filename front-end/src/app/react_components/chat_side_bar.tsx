import React from "react";
import "../css_files/resets.css";
import "../css_files/utilityClasses.css";
import "../css_files/components/chat-side-bar.css";
import TogleSwitch from "./toggle_switch";
import ChatFriends from "./chat_friends";
import ChatAddBar from "./chat_addbar";
import SideIcons from "./chat_side_bar_icons";

function ChatSideBar(){
    return (<><section className="chatroom__sidebar ">
            <TogleSwitch />
            <SideIcons />
        </section></>);
}

export default ChatSideBar;