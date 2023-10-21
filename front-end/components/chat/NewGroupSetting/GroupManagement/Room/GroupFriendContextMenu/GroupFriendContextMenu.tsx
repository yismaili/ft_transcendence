import Style from "./GroupFriendContextMenu.module.css";
import { useState } from "react";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  setMenuOpen: Function;
  menuPosition: { x: number; y: number };
  room: CreateRoom;
  setOpen: Function;
  password: string;
  setIsPassword: Function;
};

export default function GroupFriendContextMenu({
  setMenuOpen,
  menuPosition,
  room,
  setOpen,
  password,
  setIsPassword,
}: props) {
  const { socket, Data } = useSocketContext();

  const joinUserToRoom = () => {
    if (room.status === "protected") {
      setIsPassword(true);
      setMenuOpen((prev: boolean) => !prev);
    } else {
      socket.emit(
        "joinChatRoom",
        {
          username: Data.response.user.username,
          chatRoomName: room.RoomId,
          password: password,
        },
        (response: any) => {
          if (response)
          socket.emit("updateUI", {
            message: `joinChatRoom ${Data.response.user.username}`,
          });
          setOpen((prev: boolean) => !prev);
        }
      );
    }
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
          <li className={Style.context__menu__opt} onClick={joinUserToRoom}>
            <p>join room</p>
          </li>
        </menu>
      </div>
    </>
  );
}
