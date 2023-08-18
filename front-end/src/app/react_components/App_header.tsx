import React from "react";
import "../css_files/resets.css";
import "../css_files/utilityClasses.css";
import "../css_files/components/App-header.css";

function AppHeader() {
  return (<>
    <header className="app__header">
      <nav>
        <a className="app__header__chat">chat room</a>
        <a className="app__header__profile">profile</a>
      </nav>
    </header>
  </>);
}

export default AppHeader;
