import React from "react";
import "./chat-addbar.css";
import Image from "next/image";


function ChatAddBar(){
    return (<div className="chatroom__sidebar__addbar">
        <input type="text" className="add__bar" id="addbar" maxLength={15}/>
        <label htmlFor="addbar" className="add__btn">
            <Image src="/img/add.png" height={40} width={40} alt="" className="add__icon" />
        </label>
    </div>);
}

export default ChatAddBar;