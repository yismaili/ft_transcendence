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
  const { socket, Data } = useSocketContext();

  const handleBlock = () => {
    console.log("block test");

    socket.emit(
      "blockUser",
      {
        username: Data.response.user.username,
        secondUser: friendData.username,
      },
      (response: any) => {
        console.log("block response: ", response);
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
          <li className="context__menu__opt">
            <span className="context__menu__opt__icon Battle"></span>
            <p>Play</p>
          </li>
          <Link href={`/UserProfile/${friendData.username}`}>
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
