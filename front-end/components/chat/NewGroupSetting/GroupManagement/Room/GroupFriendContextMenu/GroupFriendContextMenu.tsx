import Style from "./GroupFriendContextMenu.module.css";
import Cookies from "cookies-ts";
import { useState } from "react";
import io from "socket.io-client";

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
  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  const [socket] = useState(
    io("0.0.0.0:3001/chat", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

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
