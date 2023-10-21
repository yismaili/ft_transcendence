import { useState } from "react";
import Style from "./User.module.css";
import GroupFriendContextMenu from "./GroupFriendContextMenu/GroupFriendContextMenu";
import GroupMsgContextMenu from "../../../../GroupMsg/GroupMsgContextMenu/GroupMsgContextMenu";

type props = {
  user: User_Friend;
  room: AllRooms;
  setOpen: Function;
  isGroupUsers: boolean;
  allGroupUsers: allGroupUsers[];
};

export default function User({
  user,
  room,
  setOpen,
  isGroupUsers,
  allGroupUsers,
}: props) {
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
      <div className={Style.firstChild}>
        <div
          className={Style.avatar}
          style={{ backgroundImage: `url(${user.picture})` }}
        />
        <p className={Style.name}>{user.username}</p>
      </div>
      <div className={Style.icon} onClick={handleContextMenu} />
      {isMenuOpen && !isGroupUsers && (
        <GroupFriendContextMenu
          setMenuOpen={setMenuOpen}
          menuPosition={menuPosition}
          user={user}
          room={room}
          setOpen={setOpen}
        />
      )}
      {isMenuOpen && isGroupUsers && (
        <GroupMsgContextMenu
          menuPosition={menuPosition}
          setMenuOpen={setMenuOpen}
          allGroupUsers={allGroupUsers}
          friendData={user}
          room={room}
          // set open here to fix 
        />
      )}
    </>
  );
}
