import { useState } from "react";
import Style from "./User.module.css";
import GroupFriendContextMenu from "./GroupFriendContextMenu/GroupFriendContextMenu";

type props = {
  user: User_Friend;
  isMenuOpen: boolean;
  setMenuOpen: Function;
  menuPosition: { x: number; y: number };
};

export default function User({
  user,
  isMenuOpen,
  setMenuOpen,
  menuPosition,
}: props) {
  return (
    <>
      <div className={Style.firstChild}>
        <div
          className={Style.avatar}
          style={{ backgroundImage: `url(${user.picture})` }}
        />
        <p className={Style.name}>{user.username}</p>
      </div>
      <div className={Style.icon} />
      {isMenuOpen && (
        <GroupFriendContextMenu
          setMenuOpen={setMenuOpen}
          menuPosition={menuPosition}
        />
      )}
    </>
  );
}
