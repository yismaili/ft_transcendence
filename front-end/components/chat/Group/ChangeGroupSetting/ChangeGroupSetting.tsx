import { useState } from "react";
import Style from "./ChangeGroupSetting.module.css";
import UserManagement from "./UserManagement/UserManagement";
import ChangeGroupInput from "./ChangeGroupInput/ChangeGroupInput";

type props = {
  setOpen: Function;
  room: AllRooms;
};

export default function ChangeGroupSetting({ setOpen, room }: props) {
  const [isgroupSetting, setgroupSetting] = useState(true);

  return (
    <>
      <div
        className={Style.backDrop}
        onClick={() => setOpen((prev: boolean) => !prev)}
      />
      <div className={Style.popUpContainer}>
        <div
          className={Style.closeImg}
          onClick={() => setOpen((prev: boolean) => !prev)}
        />
        <div className={Style.avatar}>
          <div className={Style.changeImg} />
        </div>
        <div className={Style.main}>
          <div className={Style.header}>
            <div
              className={`${Style.groupBtn} ${!isgroupSetting && Style.OnLeft}`}
              onClick={() => setgroupSetting(true)}
            >
              <p>Group Setting</p>
            </div>
            <div
              className={`${Style.usersBtn} ${isgroupSetting && Style.OnRight}`}
              onClick={() => setgroupSetting(false)}
            >
              <p>Users Management</p>
            </div>
          </div>
          {isgroupSetting ? (
            <>
              <ChangeGroupInput setOpen={setOpen} />
            </>
          ) : (
            <>
              <UserManagement room={room} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
