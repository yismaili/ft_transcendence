import { useState } from "react";
import Style from "./Group.module.css";
import ChangeGroupSetting from "./ChangeGroupSetting/ChangeGroupSetting";

type props = {
  room: AllRooms;
  choseChat: Function;
};

export default function Group({ room, choseChat }: props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className={Style.container} onClick={() => choseChat(room)}>
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
      {isOpen && <ChangeGroupSetting isOpen={isOpen} setOpen={setOpen} />}
    </>
  );
}
