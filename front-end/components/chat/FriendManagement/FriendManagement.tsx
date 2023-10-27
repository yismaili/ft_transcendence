import { useEffect, useState } from "react";
import Style from "./FriendManagement.module.css";
import FriendRequest from "./FriendRequest/FriendRequest";
import NewFriend from "./NewFriend/NewFriend";

type props = {
  setGroupInput: Function;
  friends: UserArrayData;
};

export default function NewGroupSetting({ setGroupInput, friends }: props) {
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
            <div className={Style.avatar}></div>
            <div className={Style.main}>
              <div className={Style.header}>
                <div
                  className={`${Style.groupBtn} ${
                    !isgroupSetting && Style.OnLeft
                  }`}
                  onClick={() => setgroupSetting(true)}
                >
                  <p>Add Friend</p>
                </div>
                <div
                  className={`${Style.usersBtn} ${
                    isgroupSetting && Style.OnRight
                  }`}
                  onClick={() => setgroupSetting(false)}
                >
                  <p>Friend Request</p>
                </div>
              </div>
              {isgroupSetting ? (
                <NewFriend friends={friends} setOpen={setOpen} />
              ) : (
                <>
                  <FriendRequest setOpen={setOpen} friends={friends} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
