import React from "react";
import "../css_files/resets.css";
import "../css_files/utilityClasses.css";
import "../css_files/components/toggle-switch.css";

function TogleSwitch(){
    return(
    <div className="chat__toggle__switch">
        <label htmlFor="toggle-switch" className="toggle__switch">
            <input type="checkbox" id="toggle-switch" name="chatSwitch" className="toggle__switch__checkbox" placeholder="name to add"/>
            <span className="toggle__switch__slider"></span>
        </label>
        </div>
    );
}

export default TogleSwitch;
