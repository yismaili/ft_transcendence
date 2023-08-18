import React from "react";
import "../css_files/resets.css";
import "../css_files/utilityClasses.css";
import "../css_files/components/chat-friends.css";
import Image from "next/image";
import avatar from "../img/friend_avatar.png";
import Options from "../img/Vector.png"

function ChatFriends(){
    return (
        <div className="friends__container">
            <div className="chat__friend">
                <div className="chat__friend__identity">
                    <Image src={avatar} width={80} height={80} className="avatar" alt="profile__pic"/>
                    <h3>khalid mn fes</h3>
                </div>
                <Image src={Options} alt="options" className="chat__friend__options" />
            </div>
    </div>);
}

export default ChatFriends;