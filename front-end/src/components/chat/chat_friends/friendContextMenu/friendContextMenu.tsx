"use client";

import { FC } from "react";
import "./friendContextMenu.css";

interface friendContextMenuProps {
  x: number;
  y: number;
  friendUsername: string;
  //   ref: React.Ref<HTMLInputElement>;
}

const FriendContextMenu: FC<friendContextMenuProps> = ({ x, y }) => {
  return (
    <div style={{ top: `${y}px`, left: `${x}px` }} className="context">
      <menu className="context__menu">
        <li
          className="context__menu__opt"
          onClick={() => {
            console.log("test");
          }}
        >
          <span className="context__menu__opt__icon Battle"></span>
          <p>Play</p>
        </li>
        <li className="context__menu__opt borders">
          <span className="context__menu__opt__icon Profile"></span>
          <p>Profile</p>
        </li>
        <li className="context__menu__opt">
          <span className="context__menu__opt__icon Block"></span>
          <p>Block</p>
        </li>
      </menu>
    </div>
  );
};

const ServerContextMenu: FC<friendContextMenuProps> = ({ x, y }) => {
  return (
    <div style={{ top: `${y}px`, left: `${x}px` }} className="context">
      <menu className="context__menu">
        <li
          className="context__menu__opt"
          onClick={() => {
            console.log("test");
          }}
        >
          <p>remove</p>
        </li>
        <li className="context__menu__opt borders">
          <p>mute / unmute</p>
        </li>
        <li className="context__menu__opt">
          <p>Ban</p>
        </li>
        <li className="context__menu__opt">
          <p>Promote / demote</p>
        </li>
      </menu>
    </div>
  );
};

export {FriendContextMenu, ServerContextMenu};
