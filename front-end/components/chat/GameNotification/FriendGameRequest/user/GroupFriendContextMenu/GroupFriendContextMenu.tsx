import { useRouter } from "next/navigation";
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
  const { socket, Data, onlineSocket, gameSocket } = useSocketContext();
  const router = useRouter();

  const handleAccept = () => {
    gameSocket.emit("responseFromFriend", true);
    socket.emit("updateUI", {
      message: `game ${user.username}`,
    });
    router.push(`/users/${Data.response.user.username}/game`);
    setOpen((prev: boolean) => !prev);
  };

  const handleReject =  () => {
    gameSocket.emit("cancelGame", { cancel: true });
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
