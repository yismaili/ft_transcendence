import React from "react";
import "../home-css/chat-section-css/toggle-switch.css";

interface sides {
    leftSide: string;
    rightSide:string;
}

function TogleSwitch(props: sides){
    return(
        <div className="chat__toggle__switch" >
            <label htmlFor="toggle-switch" className="toggle__switch" >
                <input type="checkbox" id="toggle-switch" name="chatSwitch" className="toggle__switch__checkbox" placeholder="name to add" />
                <span className="toggle__switch__slider"></span>
            </label>
        </div>
    );
}
export default TogleSwitch;
