import Style from "./GroupMsgContextMenu.module.css";
import io from "socket.io-client";
import Cookies from "cookies-ts";
import { useEffect, useState } from "react";
import GetMuteTime from "./GetMuteTime/GetMuteTime";

type props = {
  setMenuOpen: Function;
  menuPosition: { x: number; y: number };
  allGroupUsers: allGroupUsers[];
  friendData: User_Friend;
  room: AllRooms;
};

export default function GroupMsgContextMenu({
  setMenuOpen,
  menuPosition,
  allGroupUsers,
  friendData,
  room,
}: props) {
  const [timeToMute, setTimeToMute] = useState(0);
  const [istimeToMuteOpen, setIsTimeToMuteOpen] = useState(false);
  const [timeMenuPosition, setTimeMenuPosition] = useState({ x: 0, y: 0 });

  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  const [kicker] = useState(
    allGroupUsers.find(
      (user) => user.user.username === Data.response.user.username
    )
  );
  const [getKicked] = useState(
    allGroupUsers.find((user) => user.user.username === friendData.username)
  );

  const [socket] = useState(
    io("0.0.0.0:3001", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  const kick = () => {
    if (
      kicker?.statusPermissions === "admin" &&
      getKicked?.statusPermissions === "member"
    ) {
      socket.emit(
        "kickUser",
        {
          username: Data.response.user.username,
          chatRoomName: room.chatRooms.RoomId,
          userGetkick: friendData.username,
        },
        (response: any) => {
          console.log(response);
        }
      );
    }
  };

  useEffect(() => {
    if (
      timeToMute &&
      kicker?.statusPermissions === "admin" &&
      getKicked?.statusPermissions === "member"
    ) {
      socket.emit(
        "muteUser",
        {
          username: Data.response.user.username,
          chatRoomName: room.chatRooms.RoomId,
          userGetmute: getKicked?.user.username,
          time: timeToMute,
        },
        (response: any) => {
          console.log(response);
        }
      );
    }
  }, [timeToMute]);

  const handleContextMenu = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    setIsTimeToMuteOpen((prev) => !prev);

    const x = e.clientX;
    const y = e.clientY;

    setTimeMenuPosition({ x, y });
  };

  console.log(timeToMute);

  return (
    <>
      <div
        className={Style.backDrop___}
        onClick={() => setMenuOpen((prev: boolean) => !prev)}
      />
      <div
        style={{ top: menuPosition.y, left: menuPosition.x }}
        className={Style.context}
      >
        <menu className={Style.context__menu}>
          <li
            className={`${Style.context__menu__opt} ${
              (kicker?.statusPermissions !== "admin" ||
                getKicked?.statusPermissions === "admin") &&
              Style.hide
            }`}
            onClick={kick}
          >
            <p>kick</p>
          </li>
          <li
            className={`${Style.context__menu__opt} ${
              (kicker?.statusPermissions !== "admin" ||
                getKicked?.statusPermissions === "admin") &&
              Style.hide
            } ${Style.borders}`}
            onClick={handleContextMenu}
          >
            <p>mute / unmute</p>
          </li>
          <li
            className={`${Style.context__menu__opt} ${
              (kicker?.statusPermissions !== "admin" ||
                getKicked?.statusPermissions === "admin") &&
              Style.hide
            } ${Style.borders}`}
            onClick={kick}
          >
            <p>Ban</p>
          </li>
          <li className={`${Style.context__menu__opt} ${Style.borders}`}>
            <p>Promote / demote</p>
          </li>
          <li className={`${Style.context__menu__opt} ${Style.borders}`}>
            <p>Play</p>
          </li>
          <li className={`${Style.context__menu__opt} ${Style.borders}`}>
            <p>Profile</p>
          </li>
        </menu>
      </div>
      {istimeToMuteOpen && (
        <GetMuteTime
          setTimeToMute={setTimeToMute}
          timeMenuPosition={timeMenuPosition}
          setIsTimeToMuteOpen={setIsTimeToMuteOpen}
        />
      )}
    </>
  );
}
