import { useState } from "react";
import Style from "./GameNotification.module.css";
import FriendGameRequest from "./FriendGameRequest/FriendGameRequest";
type props = {
  data: gameRequest[];
};

export default function GameNotification({ data }: props) {
  const [isOpen, setOpen] = useState(false);

  const closePopUp = () => setOpen(!isOpen);

  return (
    <>
      <div className={Style.container} onClick={closePopUp} />
      {isOpen && (
        <>
          <div className={Style.backDrop} onClick={closePopUp} />
          <div className={Style.popUpContainer}>
            <div className={Style.closeImg} onClick={closePopUp} />
            <div className={Style.main}>
              <div className={Style.header}>
                <div className={Style.usersBtn}>
                  <p>Game Request</p>
                </div>
              </div>
              <FriendGameRequest setOpen={setOpen} data={data} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
