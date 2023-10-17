import Style from "./GroupMsgContextMenu.module.css";
import io from "socket.io-client";
import Cookies from "cookies-ts";
import { useEffect, useState } from "react";
import GetMuteTime from "./GetMuteTime/GetMuteTime";
import Link from "next/link";

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

  if (getKicked)
    var [isBaned, setIsBaned] = useState(getKicked.statusUser === "banned");

  const [socket] = useState(
    io("0.0.0.0:3001", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  const ban = () => {
    if (
      kicker?.statusPermissions === "admin" &&
      getKicked?.statusPermissions === "member"
    ) {
      if (isBaned) {
        socket.emit(
          "unbannedUser",
          {
            username: Data.response.user.username,
            chatRoomName: room.chatRooms.RoomId,
            userGetBan: friendData.username,
          },
          (response: any) => {
            if (response.message === "User unbanned successfully") {
              setIsBaned((prev) => !prev);
              socket.emit("updateUI", {
                message: `banUser ${friendData.username}`,
              });
            }
          }
        );
      } else {
        socket.emit(
          "banUser",
          {
            username: Data.response.user.username,
            chatRoomName: room.chatRooms.RoomId,
            userGetBan: friendData.username,
          },
          (response: any) => {
            if (response.message === "User banned successfully") {
              setIsBaned((prev) => !prev);
              socket.emit("updateUI", {
                message: `banUser ${friendData.username}`,
              });
            }
          }
        );
      }
    }
  };

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
          if (response.message == "User kicked successfully")
            socket.emit("updateUI", {
              message: `kickUser ${friendData.username}`,
            });
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
          if (response.message === "User muted successfully") {
            setTimeToMute(0);
            setIsTimeToMuteOpen((prev) => !prev);
            socket.emit("updateUI", {
              message: `muteUser ${friendData.username} ${timeToMute}`,
            });
          }
        }
      );
    }
  }, [timeToMute]);

  const promote = () => {
    if (
      kicker?.statusPermissions === "admin" &&
      getKicked?.statusPermissions === "member"
    ) {
      socket.emit(
        "changePermission",
        {
          username: Data.response.user.username,
          chatRoomName: room.chatRooms.RoomId,
          userGetBan: friendData.username,
        },
        (response: any) => {
          console.log("promote", response);
          if (response.message === "User unbanned successfully") {
            socket.emit("updateUI", {
              message: `changePermission ${friendData.username} ${Data.response.user.username}`,
            });
          }
        }
      );
    }
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (
      kicker?.statusPermissions === "admin" &&
      getKicked?.statusPermissions === "member"
    ) {
      setIsTimeToMuteOpen((prev) => !prev);
    }

    const x = e.clientX;
    const y = e.clientY;

    setTimeMenuPosition({ x, y });
  };

  const block = () => {
    if (
      kicker?.statusPermissions === "admin" &&
      getKicked?.statusPermissions === "member"
    ) {
      socket.emit("")
    }
  };

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
            <p>Mute / Unmute</p>
          </li>
          <li
            className={`${Style.context__menu__opt} ${
              (kicker?.statusPermissions !== "admin" ||
                getKicked?.statusPermissions === "admin") &&
              Style.hide
            } ${Style.borders}`}
            onClick={ban}
          >
            <p>Ban / unBan</p>
          </li>
          <li
            className={`${Style.context__menu__opt} ${Style.borders} ${
              (kicker?.statusPermissions !== "admin" ||
                getKicked?.statusPermissions === "admin") &&
              Style.hide
            }`}
            onClick={promote}
          >
            <p>Promote to admin</p>
          </li>
          <li className={`${Style.context__menu__opt} ${Style.borders}`}>
            <p>Play</p>
          </li>
          <Link href={`/${friendData.username}`}>
            <li className={`${Style.context__menu__opt} ${Style.borders}`}>
              <p style={{ color: "#FFFADE" }}>Profile</p>
            </li>
          </Link>
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
