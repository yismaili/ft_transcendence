import { useRouter } from "next/navigation";
import Style from "./GroupFriendContextMenu.module.css";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  setMenuOpen: Function;
  menuPosition: { x: number; y: number };
  user: User_Friend;
};

export default function GroupFriendContextMenu({
  setMenuOpen,
  menuPosition,
  user,
}: props) {
  const { socket, Data, onlineSocket, gameSocket } = useSocketContext();
  const router = useRouter();

  const handleAccept = () => {
    router.push(`gameMap?type=accept-${user.username}`);
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
        </menu>
      </div>
    </>
  );
}
