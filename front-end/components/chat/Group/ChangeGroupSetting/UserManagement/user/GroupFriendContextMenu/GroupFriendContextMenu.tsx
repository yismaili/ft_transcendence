import Style from "./GroupFriendContextMenu.module.css";
import Cookies from "cookies-ts";
import { useState } from "react";
import { io, Socket } from "socket.io-client";

type props = {
  setMenuOpen: Function;
  menuPosition: { x: number; y: number };
  user: User_Friend;
  room: AllRooms;
  setOpen: Function;
};

export default function GroupFriendContextMenu({
  setMenuOpen,
  menuPosition,
  user,
  room,
  setOpen
}: props) {
  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  const [socket] = useState(
    io("0.0.0.0:3001", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  const joinUserToRoom = (permission: string) => {
    setOpen((prev: boolean) => !prev);
    socket.emit("JoinUsertoRoom", {
      adminUsername: Data.response.user.username,
      username: user.username,
      statusPermissions: permission,
      chatRoomName: room.chatRooms.RoomId,
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
          <li
            className={Style.context__menu__opt}
            onClick={() => joinUserToRoom("admin")}
          >
            <p>add as Admin</p>
          </li>
          <li
            className={`${Style.context__menu__opt} ${Style.borders}`}
            onClick={() => joinUserToRoom("member")}
          >
            <p>add as Member</p>
          </li>
        </menu>
      </div>
    </>
  );
}
