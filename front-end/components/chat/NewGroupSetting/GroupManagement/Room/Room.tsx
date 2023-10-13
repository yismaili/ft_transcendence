import { useState } from "react";
import Style from "./Room.module.css";
import GroupFriendContextMenu from "./GroupFriendContextMenu/GroupFriendContextMenu";
import ProtectedGroup from "./ProtectedGroup/ProtectedGroup";

type props = {
  room: CreateRoom;
  setOpen: Function;
};

export default function Room({ room, setOpen }: props) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isPassword, setIsPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMenuOpen((prev) => !prev);

    const x = e.clientX;
    const y = e.clientY;

    setMenuPosition({ x, y });
  };

  return (
    <>
      <div className={Style.firstChild}>
        <div
          className={Style.avatar}
          // style={{ backgroundImage: `url(${room.picture})` }}
        />
        <p className={Style.name}>{room.name}</p>
      </div>
      <div className={Style.icon} onClick={handleContextMenu} />
      {isMenuOpen && (
        <GroupFriendContextMenu
          setMenuOpen={setMenuOpen}
          menuPosition={menuPosition}
          room={room}
          setOpen={setOpen}
          password={password}
          setIsPassword={setIsPassword}
        />
      )}
      {isPassword && <ProtectedGroup room={room} setOpen={setOpen} />}
    </>
  );
}
