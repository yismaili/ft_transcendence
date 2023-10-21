import Style from "./GroupFriendContextMenu.module.css";
import { useState } from "react";
import { useSocketContext } from "@/contexts/socket-context";
type props = {
  setMenuOpen: Function;
  menuPosition: { x: number; y: number };
  user: User_Friend;
  setOpen: Function;
};

export default function GroupFriendContextMenu({
  setMenuOpen,
  menuPosition,
  user,
  setOpen,
}: props) {
  const { socket } = useSocketContext();

  const joinUserToRoom = async () => {
    const sending = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify(user.username),
    })
      .then(async (res) => await res.json())
      .then((e) => {
        if (e === "exist") {
          socket.emit("updateUI", { message: `sendRequest ${user.username}` });
          setOpen((prev: boolean) => !prev);
        }
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
          <li className={Style.context__menu__opt} onClick={joinUserToRoom}>
            <p>Add To Friends</p>
          </li>
        </menu>
      </div>
    </>
  );
}
