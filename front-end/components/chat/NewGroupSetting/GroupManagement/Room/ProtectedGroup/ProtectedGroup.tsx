import { useRef, useState } from "react";
import Style from "./ProtectedGroup.module.css";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  room: CreateRoom;
  setOpen: Function;
};
export default function ProtectedGroup({ room, setOpen }: props) {
  const { socket, Data } = useSocketContext();
  const [isRightPassword, setIsRightPassword] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    ref.current?.reset();
    const password = formData.get("password")?.toString();

    if (password?.length) {
      socket.emit(
        "joinChatRoom",
        {
          username: Data.response.user.username,
          chatRoomName: room.RoomId,
          password: password,
        },
        (response: any) => {
          setOpen((prev: boolean) => !prev);
        }
      );
    }
    socket.emit("updateUI", {
      message: `joinChatRoom ${Data.response.user.username}`,
    });
    setIsRightPassword(true);
  };

  return (
    <main className={Style.auth__card}>
      <div className={Style.auth__credentials}>
        <h1 className={Style.auth__msg}> Enter Password</h1>
        <form
          action={handleAction}
          id="password_group"
          ref={ref}
          className={`${isRightPassword && Style.falsePassword}`}
        >
          <input type="password" name="password" placeholder="enter password" />
        </form>
        <button type="submit" form="password_group" className={Style.auth__btn}>
          Join Group
        </button>
      </div>
    </main>
  );
}
