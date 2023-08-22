import React from "react";
import "../css_files/resets.css";
import "../css_files/utilityClasses.css";
import "../../css_files/components/chat-secction-css/chat-side-bar.css";
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