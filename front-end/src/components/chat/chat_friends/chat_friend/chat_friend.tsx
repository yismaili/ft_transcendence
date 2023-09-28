"use client";
import Image from "next/image";
import "./chat_friend.css";
import { useEffect, useRef, useState } from "react";
import FriendContextMenu from "../friendContextMenu/friendContextMenu";

interface amigos {
  friend: Friend;
}

const initialContextMenu = {
  toggle: false,
  x: 0,
  y: 0,
};

export default function ChatFriend(props: amigos) {
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const contextMenuRef = useRef(null);

  // useEffect{ () =>{
  //   function handler(eve) {
  //     if (contextMenuRef.current) {
  //       if (!(contextMenuRef.current.contains(eve.target))) {
  //         setContextMenu(initialContextMenu);
  //       }
  //     }
      
  //     document.addEventListener('click', handler)
  //     return () => {
  //       document.removeEventListener('click', handler);
  //     }
  // }};
  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    const { pageX, pageY } = e;
    setContextMenu({ toggle: true, x: pageX, y: pageY });
  };


  return (
    <div onContextMenu={handleContextMenu} className="chat__friend">
      {contextMenu.toggle && <FriendContextMenu x={contextMenu.x} y={contextMenu.y} />}
      <div className="chat__friend__identity">
        <span
          className="friend__pic"
          style={{ backgroundImage: `url(${props.friend.user.picture})` }}
        ></span>
        <h3>{props.friend.user.username}</h3>
      </div>
      <Image
        src="/img/Vector.png"
        alt="options"
        width={10}
        height={40}
        className="chat__friend__options"
      />
    </div>
  );
}
