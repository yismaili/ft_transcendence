import { useState } from "react";
import Style from "./GroupSetting.module.css";
import GroupInput from "./GroupInput/GroupInput";

export default function GroupSetting() {
  const [isOpen, setOpen] = useState(false);
  const [isgroupSetting, setgroupSetting] = useState(true);

  const closePopUp = () => setOpen(!isOpen);

  return (
    <>
      <div className={Style.container} onClick={closePopUp} />
      {isOpen && (
        <>
          <div className={Style.backDrop} onClick={closePopUp} />
          <div className={Style.popUpContainer}>
            <div className={Style.closeImg} onClick={closePopUp} />
            <div className={Style.avatar}>
              <div className={Style.changeImg} />
            </div>
            <div className={Style.main}>
              <div className={Style.header}>
                <div
                  className={`${Style.groupBtn} ${!isgroupSetting && Style.On}`}
                  onClick={() => setgroupSetting(true)}
                >
                  <p>Group Setting</p>
                </div>
                <div
                  className={`${Style.usersBtn} ${isgroupSetting && Style.On}`}
                  onClick={() => setgroupSetting(false)}
                >
                  <p>Users Management</p>
                </div>
              </div>
              {isgroupSetting ? (
                <>
                  <GroupInput />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
