import { useEffect, useRef } from "react";
import Style from "./Notification.module.css";
import { motion } from "framer-motion";

type props = {
  message: allMessages;
};

export default function Notification({ message }: props) {
  const handleContextMenu = () => {};
  const ref2 = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className={Style.container} onContextMenu={handleContextMenu}>
        <div
          className={Style.img}
          style={{ backgroundImage: `url(${message.user.picture})` }}
        ></div>
        <p className={Style.name}>{message.user.username}</p>
        <p className={Style.msg}>{message.message}</p>
        <p className={Style.time}>{message.dateToSend}</p>
      </div>
      {/* {isMenuOpen && (
        <FriendContextMenu
          setMenuOpen={setMenuOpen}
          menuPosition={menuPosition}
          friendData={friendData}
        />
      )} */}
    </>
  );
}
