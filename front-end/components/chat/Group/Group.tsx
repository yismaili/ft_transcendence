import { useState } from "react";
import Style from "./Group.module.css";
import GroupContextMenu from "./GroupContextMenu/GroupContextMenu";
import ChangeGroupSetting from "./ChangeGroupSetting/ChangeGroupSetting";
import AllGroupUsers from "./AllGroupUsers/AllGroupUsers";
import AllGroupUsersAdmin from "./AllGroupUsersAdmin/AllGroupUsersAdmin";

type props = {
  room: AllRooms;
  choseChat: Function;
  left: Function;
};

export default function Group({ room, choseChat, left }: props) {
  const [isOpen, setOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMenuOpen((prev) => !prev);

    const x = e.clientX;
    const y = e.clientY;

    setMenuPosition({ x, y });
  };

  return (
    <>
      <div className={Style.container} onContextMenu={handleContextMenu}>
        <div
          className={Style.test}
          onClick={() => {
            choseChat(room);
            left(false);
          }}
        >
          <div className={Style.imgContainer}>
            <div
              className={Style.avatar}
              style={{ backgroundImage: `url("${room.chatRooms.picture}")` }}
            ></div>
          </div>
          <p className={Style.name}>{room.chatRooms.name}</p>
        </div>
        <div className={Style.icon} onClick={() => setOpen((prev) => !prev)} />
      </div>
      {isOpen && room.statusPermissions === "admin" && room.owner && (
        <ChangeGroupSetting setOpen={setOpen} room={room} />
      )}
      {isOpen && room.statusPermissions === "admin" && !room.owner && (
        <AllGroupUsersAdmin setOpen={setOpen} room={room} />
      )}
      {isOpen && room.statusPermissions !== "admin" && (
        <AllGroupUsers setOpen={setOpen} room={room} />
      )}
      {isMenuOpen && (
        <GroupContextMenu
          setMenuOpen={setMenuOpen}
          menuPosition={menuPosition}
          room={room}
        />
      )}
    </>
  );
}
