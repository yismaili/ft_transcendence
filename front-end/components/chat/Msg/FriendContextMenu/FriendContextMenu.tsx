import { useSocketContext } from "@/contexts/socket-context";
import "./FriendContextMenu.css";
import Link from "next/link";

type props = {
  setMenuOpen: Function;
  menuPosition: { x: number; y: number };
  friendData: User_Friend;
};

export default function FriendContextMenu({
  setMenuOpen,
  menuPosition,
  friendData,
}: props) {
  const { socket, Data, onlineSocket, gameSocket } = useSocketContext();

  const handleBlock = async () => {
    const res = await fetch(
      `http://localhost:3001/users/profile/${Data.response.user.username}/block/${friendData.username}`,
      {
        method: "PUT",
        cache: "no-cache",
        headers: { authorization: `Bearer ${Data.response.token}` },
      }
    );
    // const data = await res.json();

    socket.emit("updateUI", {
      message: `block ${Data.response.user.username} ${friendData.username}`,
    });
    setMenuOpen((prev: boolean) => !prev);
  };

  const handlePlay = () => {
    gameSocket.emit(
      "inviteFriend",
      {
        username: Data.response.user.username,
        friendUsername: friendData.username,
      },
      (response: any) => {
        console.log("inviteFriend res :", response);
      }
    );
  };

  return (
    <>
      <div
        className="backDrop___"
        onClick={() => setMenuOpen((prev: boolean) => !prev)}
      />
      <div
        style={{ top: menuPosition.y, left: menuPosition.x }}
        className="context"
      >
        <menu className="context__menu">
          <li className="context__menu__opt" onClick={handlePlay}>
            <span className="context__menu__opt__icon Battle"></span>
            <p>Play</p>
          </li>
          <Link href={`/users/${friendData.username}`}>
            <li className="context__menu__opt borders">
              <span className="context__menu__opt__icon Profile"></span>
              <p>Profile</p>
            </li>
          </Link>
          <li className="context__menu__opt" onClick={handleBlock}>
            <span className="context__menu__opt__icon Block"></span>
            <p>Block</p>
          </li>
        </menu>
      </div>
    </>
  );
}
