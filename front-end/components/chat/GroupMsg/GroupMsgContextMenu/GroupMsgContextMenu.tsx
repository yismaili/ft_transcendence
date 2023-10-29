import Style from "./GroupMsgContextMenu.module.css";
import { useEffect, useState } from "react";
import GetMuteTime from "./GetMuteTime/GetMuteTime";
import Link from "next/link";
import { useSocketContext } from "@/contexts/socket-context";

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
  const { socket, Data } = useSocketContext();
  const [timeToMute, setTimeToMute] = useState(0);
  const [istimeToMuteOpen, setIsTimeToMuteOpen] = useState(false);
  const [timeMenuPosition, setTimeMenuPosition] = useState({ x: 0, y: 0 });

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

  const ban = () => {
    if (
      (kicker?.statusPermissions === "admin" &&
        getKicked?.statusPermissions === "member") ||
      kicker?.owner
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
      (kicker?.statusPermissions === "admin" &&
        getKicked?.statusPermissions === "member") ||
      kicker?.owner
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
      (timeToMute &&
        kicker?.statusPermissions === "admin" &&
        getKicked?.statusPermissions === "member") ||
      (timeToMute && kicker?.owner)
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
      (kicker?.statusPermissions === "admin" &&
        getKicked?.statusPermissions === "member") ||
      kicker?.owner
    ) {
      socket.emit(
        "changePermission",
        {
          username: Data.response.user.username,
          chatRoomName: room.chatRooms.RoomId,
          userGetBan: friendData.username,
        },
        (response: any) => {
          // console.log("promote", response);
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
      (kicker?.statusPermissions === "admin" &&
        getKicked?.statusPermissions === "member") ||
      kicker?.owner
    ) {
      setIsTimeToMuteOpen((prev) => !prev);
    }

    const x = e.clientX;
    const y = e.clientY;

    setTimeMenuPosition({ x, y });
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
              !kicker?.owner &&
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
              !kicker?.owner &&
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
              !kicker?.owner &&
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
              !kicker?.owner &&
              Style.hide
            }`}
            onClick={promote}
          >
            <p>Promote to admin</p>
          </li>
          <Link
            href={`/users/${Data.response.user.username}/gameMap?type=invite-${friendData.username}`}
          >
            <li className={`${Style.context__menu__opt} ${Style.borders}`}>
              <p style={{ color: "#FFFADE" }}>Play</p>
            </li>
          </Link>
          <Link href={`/users/${friendData.username}`}>
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
