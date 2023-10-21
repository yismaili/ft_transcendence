import Style from "./GroupContextMenu.module.css";
import io from "socket.io-client";
import Cookies from "cookies-ts";
import { useState } from "react";

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
  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  const [socket] = useState(
    io("0.0.0.0:3001", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  const leave = () => {
    socket.emit(
      "leaveChatRoom",
      {
        username: Data.response.user.username,
        chatRoomName: room.chatRooms.RoomId,
      },
      (response: any) => {
        console.log(response);
      }
    );
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
