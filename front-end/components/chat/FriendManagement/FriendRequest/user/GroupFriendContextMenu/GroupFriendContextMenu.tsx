import Style from "./GroupFriendContextMenu.module.css";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  setMenuOpen: Function;
  menuPosition: { x: number; y: number };
  user: User_Friend;
  setOpen: Function;
};

export default function GroupFriendContextMenu({
  setMenuOpen,
  menuPosition,
  user,
  setOpen,
}: props) {
  const { socket, Data } = useSocketContext();

  const handleAccept = async () => {
    const res = await fetch(
      `backend:3001/users/profile/${Data.response.user.username}/acceptRequest/${user.username}`,
      {
        method: "PUT",
        headers: { authorization: `Bearer ${Data.response.token}` },
      }
    );

    const data = await res.json();

    socket.emit("updateUI", {
      message: `changeFriend ${Data.response.user.username} ${user.username}`,
    });

    setOpen((prev: boolean) => !prev);
  };

  const handleReject = async () => {
    const res = await fetch(
      `backend:3001/users/profile/${Data.response.user.username}/rejectRequest/${user.username}`,
      {
        method: "DELETE",
        headers: { authorization: `Bearer ${Data.response.token}` },
      }
    );
    const data = await res.json();

    setOpen((prev: boolean) => !prev);
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
          <li className={Style.context__menu__opt} onClick={handleAccept}>
            <p>accept Request</p>
          </li>
          <li
            className={`${Style.context__menu__opt} ${Style.borders}`}
            onClick={handleReject}
          >
            <p>reject Request</p>
          </li>
        </menu>
      </div>
    </>
  );
}
