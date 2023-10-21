import { useSocketContext } from "@/contexts/socket-context";
import Style from "./InputChatGroup.module.css";
import { useRef, useState } from "react";

type props = {
  room: AllRooms;
};

export default function InputChatGroup({ room }: props) {
  const { socket, Data } = useSocketContext();
  const ref = useRef<HTMLFormElement>(null);

  const setMessage = (message: any) => {
    socket.emit(
      "getAllUserOfChatRoom",
      {
        username: Data.response.user.username,
        chatRoomName: room.chatRooms.RoomId,
      },
      (response: allGroupUsers[]) => {
        response.find((user) => {
          if (user.user.username === Data.response.user.username)
            if (user.statusUser == "member" || user.statusUser == "muted")
              socket.emit("sendMessageToChatRoom", {
                message: message,
                username: Data.response.user.username,
                chatRoomName: room.chatRooms.RoomId,
              });
        });
      }
    );
  };

  const create = async (formData: FormData) => {
    ref.current?.reset();
    if (formData.get("message")) setMessage(formData.get("message"));
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
