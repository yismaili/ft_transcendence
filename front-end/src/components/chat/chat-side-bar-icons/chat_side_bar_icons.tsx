import React from "react";
import "./side-icons.css"
import Image from "next/image";

function SideIcons(){
    return (<div className="side__icons">
        <div className="side__icons__btn">
            <Image src="/img/groups_icon.svg" alt="group-icon" layout="fill" className="side__icons__btn__icon"/>
            <span>groups</span>
        </div>
        <div className="side__icons__btn">
            <Image src="/img/Mask group.svg" alt="direct-icon" layout="fill" className="side__icons__btn__icon"/>
            <span>direct</span>
        </div>
    </div>);
}

export default SideIcons;