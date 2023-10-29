import { useState } from "react";
import Style from "./GameNotificationTmp.module.css";
import GroupFriendContextMenu from "./GroupFriendContextMenu/GroupFriendContextMenu";

type props = {
  user: User_Friend;
};

export default function GameNotificationTmp({
  user,
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
        <p className={Style.name}>{user.uniquename}</p>
      </div>
      <div className={Style.icon} onClick={handleContextMenu} />
      {isMenuOpen && (
        <GroupFriendContextMenu
          setMenuOpen={setMenuOpen}
          menuPosition={menuPosition}
          user={user}
        />
      )}
    </>
  );
}