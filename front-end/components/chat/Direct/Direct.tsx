import { useEffect, useState } from "react";
import Style from "./Direct.module.css";
import { useSocketContext } from "@/contexts/socket-context";
import FriendContextMenu from "./FriendContextMenu/FriendContextMenu";

type props = {
  data: User_Friend;
  choseChat: Function;
};

export default function Direct({ data, choseChat }: props) {
  const { socket, Data } = useSocketContext();
  const [status, setStatus] = useState(data.status);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const choseConversation = () => {
    choseChat(data);
  };

  useEffect(() => {
    socket.on("updateUI", (messaged: string) => {
      console.log(messaged);
      if (messaged.split(" ")[0] === "status") {
        setStatus(messaged.split(" ")[1]);
      }
    });
  }, []);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    setMenuOpen((prev) => !prev);

    const x = e.clientX;
    const y = e.clientY;

    setMenuPosition({ x, y });
  };

  return (
    <>
      <div className={Style.container} onClick={choseConversation}>
        <div className={Style.imgContainer}>
          <div
            className={Style.avatar}
            style={{ backgroundImage: `url("${data.picture}")` }}
          ></div>
          <div
            className={`${Style.onlineStatus} ${
              status === "online" && Style.On
            }`}
          ></div>
        </div>
        <p className={Style.name}>{data.username}</p>
        <div className={Style.icon} onClick={handleContextMenu} />
      </div>
      {isMenuOpen && (
        <FriendContextMenu
          setMenuOpen={setMenuOpen}
          menuPosition={menuPosition}
          friendData={data}
        />
      )}
    </>
  );
}
