import { useState } from "react";
import Style from "./LeftChat.module.css";
import FriendContextMenu from "../FriendContextMenu/FriendContextMenu";

type props = {
  oldMessage: allMessages | undefined;
  newMessage: allMessages | undefined;
  friendData: User_Friend;
};

export default function LeftChat({
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
          <p className={Style.name}>{friendData.uniquename}</p>
          <p className={Style.msg}>{oldMessage.message}</p>
          <p className={Style.time}>{oldMessage.dateToSend}</p>
        </div>
        {isMenuOpen && (
          <FriendContextMenu
            setMenuOpen={setMenuOpen}
            menuPosition={menuPosition}
            friendData={friendData}
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
          <p className={Style.time}>{newMessage.dateToSend}</p>
        </div>
        {isMenuOpen && (
          <FriendContextMenu
            setMenuOpen={setMenuOpen}
            menuPosition={menuPosition}
            friendData={friendData}
          />
        )}
      </>
    );
  else return <>test</>;
}
