import { useEffect, useState } from "react";
import Style from "./NewGroupSetting.module.css";
import NewGroupInput from "./NewGroupInput/NewGroupInput";
import GroupManagement from "./GroupManagement/GroupManagement";

type props = {
  setGroupInput: Function;
};

export default function NewGroupSetting({ setGroupInput }: props) {
  const [isOpen, setOpen] = useState(false);
  const [input, setInput] = useState<GroupInput>();
  const [isgroupSetting, setgroupSetting] = useState(true);

  const closePopUp = () => setOpen(!isOpen);

  useEffect(() => {
    if (input) setGroupInput(input);
  }, [input]);

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
                  className={`${Style.groupBtn} ${
                    !isgroupSetting && Style.OnLeft
                  }`}
                  onClick={() => setgroupSetting(true)}
                >
                  <p>Group Setting</p>
                </div>
                <div
                  className={`${Style.usersBtn} ${
                    isgroupSetting && Style.OnRight
                  }`}
                  onClick={() => setgroupSetting(false)}
                >
                  <p>Find Group</p>
                </div>
              </div>
              {isgroupSetting ? (
                <NewGroupInput setInput={setInput} closePopUp={closePopUp} />
              ) : (
                <>
                  <GroupManagement setOpen={setOpen} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
