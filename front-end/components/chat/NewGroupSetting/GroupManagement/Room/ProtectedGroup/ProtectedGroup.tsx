import { useRef, useState } from "react";
import Style from "./ProtectedGroup.module.css";
import Cookies from "cookies-ts";
import io from "socket.io-client";

type props = {
  room: CreateRoom;
  setOpen: Function;
};
export default function ProtectedGroup({ room, setOpen }: props) {
  const [isRightPassword, setIsRightPassword] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  const [socket] = useState(
    io("0.0.0.0:3001", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

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
