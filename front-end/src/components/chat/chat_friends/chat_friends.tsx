import React from "react";
import "./chat-friends.css";
import Image from "next/image";
import avatar from "@/img/friend_avatar.png";
import Options from "@/img/Vector.png"

function ChatFriends(){
    return (
        <div className="friends__container">
            <div className="chat__friend">
                <div className="chat__friend__identity">
                    <Image src="/img/friend_avatar.png" width={80} height={80} className="avatar" alt="profile__pic"/>
                    <h3>khalid mn fes</h3>
                </div>
                <Image src="/img/Vector.png" alt="options" width={10} height={40} className="chat__friend__options" />
            </div>
    </div>);
}

export default ChatFriends;