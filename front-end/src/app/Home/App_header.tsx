'use client'
import React, { useState } from "react";
import "../global_css/resets.css";
import "../global_css/utilityClasses.css";
import "./home-css/App-header.css";

interface header{
  state:Function;
  nav_side:Function;
}

const Profile_side = (props : header) => {
  return (<>
      <a className="app__header__chat opac" onClick={() => {
        props.nav_side(false);
        props.state(false);}
        }>chat room</a>
      <a className="app__header__profile" >profile</a>  
  </>);
}

const Chat_side = (props : header) => {
  return (<>
      <a className="app__header__chat ">chat room</a>
      <a className="app__header__profile opac" onClick={() => {
        props.nav_side(true);
        props.state(true);}
        }>profile</a>  
  </>);
}

function AppHeader(props : header) {
  const [side, setSide] = useState(true);

  return (<>
    <header className="app__header">
      <nav>
        {side && <Profile_side state={props.state} nav_side={setSide} />}
        {!side && <Chat_side state={props.state} nav_side={setSide} />}
      </nav>
    </header>
  </>);
}

export default AppHeader;
