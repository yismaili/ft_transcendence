import { useState } from "react";
import Style from "./LeftChatGroup.module.css";
import GroupMsgContextMenu from "../GroupMsgContextMenu/GroupMsgContextMenu";

type props = {
  oldMessage: allGroupMessages | undefined;
  newMessage: allGroupMessages | undefined;
  friendData: User_Friend;
  allGroupUsers: allGroupUsers[];
  room: AllRooms;
};

export default function LeftChatGroup({
  oldMessage,
  newMessage,
  friendData,
  allGroupUsers,
  room,
}: props) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMenuOpen((prev) => !prev);

    const x = e.clientX;
    if (e.clientY > 616) var y = e.clientY - 237;
    else var y = e.clientY;

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
          <p className={Style.name}>{friendData.uniquename}</p>
          <p className={Style.msg}>{oldMessage.message}</p>
          <p className={Style.time}>{oldMessage.date}</p>
        </div>
        {isMenuOpen && (
          <GroupMsgContextMenu
            setMenuOpen={setMenuOpen}
            menuPosition={menuPosition}
            allGroupUsers={allGroupUsers}
            friendData={friendData}
            room={room}
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
          <p className={Style.name}>{friendData.uniquename}</p>
          <p className={Style.msg}>{newMessage.message}</p>
          <p className={Style.time}>{newMessage.date}</p>
        </div>
        {isMenuOpen && (
          <GroupMsgContextMenu
            setMenuOpen={setMenuOpen}
            menuPosition={menuPosition}
            allGroupUsers={allGroupUsers}
            friendData={friendData}
            room={room}
          />
        )}
      </>
    );
  else return <>test</>;
}
