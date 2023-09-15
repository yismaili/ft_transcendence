import ChatHeader from "@/components/chat/chat_header/chat_header";
import ChatRoom from "@/components/chat/chat_room/chat_room";
import React from "react";


export default function Chat() {
    return (<div className="container">
        <ChatHeader />
        <ChatRoom />
    </div>)
}