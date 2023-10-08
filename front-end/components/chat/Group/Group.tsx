import { useState } from "react";
import Style from "./Group.module.css";
import CustomMenu from "./CustomMenu/CustomMenu";
import ChangeGroupSetting from "./ChangeGroupSetting/ChangeGroupSetting";

type props = {
  room: AllRooms;
  choseChat: Function;
};

export default function Group({ room, choseChat }: props) {
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
      <div
        className={Style.container}
        onClick={() => choseChat(room)}
        onContextMenu={handleContextMenu}
      >
        <div className={Style.imgContainer}>
          <div
            className={Style.avatar}
            // style={{ backgroundImage: `url("${data.picture}")` }}
          ></div>
          {/* <div className={Style.onlineStatus}></div> */}
        </div>
        <p className={Style.name}>{room.chatRooms.name}</p>
        <div className={Style.icon} onClick={() => setOpen((prev) => !prev)} />
      </div>
      {isOpen && <ChangeGroupSetting setOpen={setOpen} />}
      {isMenuOpen && (
        <CustomMenu setMenuOpen={setMenuOpen} menuPosition={menuPosition} />
      )}
    </>
  );
}
