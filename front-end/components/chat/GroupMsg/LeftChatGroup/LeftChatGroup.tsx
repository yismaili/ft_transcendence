import { useState } from "react";
import Style from "./LeftChatGroup.module.css";
import GroupMsgContextMenu from "../GroupMsgContextMenu/GroupMsgContextMenu";

type props = {
  oldMessage: allGroupMessages | undefined;
  newMessage: allGroupMessages | undefined;
  friendData: User_Friend;
};

export default function LeftChatGroup({
  oldMessage,
  newMessage,
  friendData,
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

  if (oldMessage)
    return (
      <>
        <div className={Style.container} onContextMenu={handleContextMenu}>
          <div
            className={Style.img}
            style={{ backgroundImage: `url(${friendData.picture})` }}
          ></div>
          <p className={Style.name}>{friendData.username}</p>
          <p className={Style.msg}>{oldMessage.message}</p>
          <p className={Style.time}>{oldMessage.date}</p>
        </div>
        {isMenuOpen && (
          <GroupMsgContextMenu
            setMenuOpen={setMenuOpen}
            menuPosition={menuPosition}
          />
        )}
      </>
    );
  else if (newMessage)
    return (
      <>
        <div className={Style.container} onContextMenu={handleContextMenu}>
          <div
            className={Style.img}
            style={{ backgroundImage: `url(${friendData.picture})` }}
          ></div>
          <p className={Style.name}>{friendData.username}</p>
          <p className={Style.msg}>{newMessage.message}</p>
          <p className={Style.time}>{newMessage.date}</p>
        </div>
        {isMenuOpen && (
          <GroupMsgContextMenu
            setMenuOpen={setMenuOpen}
            menuPosition={menuPosition}
          />
        )}
      </>
    );
  else return <>test</>;
}
