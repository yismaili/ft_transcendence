import React from "react";
import "./chat-friends.css";
import ChatFriend from "./chat_friend/chat_friend";


function ChatFriends(){
    return (<div className="friends__container">
        <ChatFriend />
        <ChatFriend />
        <ChatFriend />
        <ChatFriend /><ChatFriend /><ChatFriend /><ChatFriend /><ChatFriend /><ChatFriend /><ChatFriend /><ChatFriend /><ChatFriend />
    </div>);
}

export default ChatFriends;