import React from "react";
import "../home-css/chat-section-css/side-icons.css"
import Image from "next/image";
import group from "../../img/groups_icon.svg"
import direct from "../../img/Mask group.svg"

function SideIcons(){
    return (<div className="side__icons">
        <div className="side__icons__btn">
            <Image src={group} alt="group-icon" layout="fill" className="side__icons__btn__icon"/>
            <span>groups</span>
        </div>
        <div className="side__icons__btn">
            <Image src={direct} alt="direct-icon" layout="fill" className="side__icons__btn__icon"/>
            <span>direct</span>
        </div>
    </div>);
}

export default SideIcons;