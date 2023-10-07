import { revalidatePath } from "next/cache";
import Style from "./InputChatGroup.module.css";
import { useRef, useState } from "react";
import Cookies from "cookies-ts";
import io from "socket.io-client";

type props = {
  room: AllRooms;
};

export default function InputChatGroup({ room }: props) {
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

  const setMessage = (message: any) => {
    // console.log('mess', message);
    
    socket.emit(
      "sendMessageToChatRoom",
      {
        message: message,
        username: Data.response.user.username,
        chatRoomName: room.chatRooms.RoomId,
      },
      (response: any) => {
        // console.log("Message sent", response);
        console.log('yo--');
        
      }
    );
  };


  const create = async (formData: FormData) => {
    ref.current?.reset();
    if (formData.get("message"))
      setMessage(formData.get("message"));
  };

  return (
    <div className={Style.container}>
      <div className={Style.subContainer}>
        <form ref={ref} action={create}>
          <input
            placeholder="Enter message"
            name="message"
            autoComplete="off"
          />
          <button className={Style.sendIcon}></button>
        </form>
      </div>
    </div>
  );
}
