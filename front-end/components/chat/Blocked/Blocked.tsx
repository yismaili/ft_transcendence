import { useEffect, useState } from "react";
import Style from "./Blocked.module.css";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  data: User_Friend;
};

export default function Blocked({ data }: props) {
  const { socket, Data } = useSocketContext();
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
      <div className={Style.container}>
        <div className={Style.imgContainer}>
          <div
            className={Style.avatar}
            style={{ backgroundImage: `url("${data.picture}")` }}
          ></div>
          <div className={Style.onlineStatus}/>
        </div>
          <div className={Style.blure}/>
        <p className={Style.name}>{data.username}</p>
        <div className={Style.icon}></div>
      </div>
  );
}
