import Style from "./GroupContextMenu.module.css";
import { useState } from "react";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  setMenuOpen: Function;
  menuPosition: { x: number; y: number };
  room: AllRooms;
};

export default function GroupContextMenu({
  setMenuOpen,
  menuPosition,
  room,
}: props) {
  const { socket, Data } = useSocketContext();

  const leave = () => {
    socket.emit("leaveChatRoom", {
      username: Data.response.user.username,
      chatRoomName: room.chatRooms.RoomId,
    });

    socket.emit("updateUI", {
      message: `leaveChatRoom ${Data.response.user.username}`,
    });
  };

  return (
    <>
      <div
        className={Style.backDrop___}
        onClick={() => setMenuOpen((prev: boolean) => !prev)}
      />
      <div
        style={{ top: menuPosition.y, left: menuPosition.x }}
        className={Style.context}
      >
        <menu className={Style.context__menu}>
          <li className={Style.context__menu__opt} onClick={leave}>
            <p>Leave Group</p>
          </li>
        </menu>
      </div>
    </>
  );
}
