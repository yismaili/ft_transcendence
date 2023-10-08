import Style from "./GroupMsg.module.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import io from "socket.io-client";
import Cookies from "cookies-ts";
import LeftChatGroup from "./LeftChatGroup/LeftChatGroup";
import RightChatGroup from "./RightChatGroup/RightChatGroup";
import InputChatGroup from "./InputChatGroup/InputChatGroup";

type props = {
  groupInput: GroupInput | undefined;
  room: AllRooms;
};

export default function GroupMsg({ groupInput, room }: props) {
  const [allMessages, setAllMessages] = useState<allGroupMessages[]>();
  const [newMessage, setNewMessage] = useState<allGroupMessages[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  const [socket] = useState(
    io("0.0.0.0:3001", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  useEffect(() => {
    socket.on("message", (message: allGroupMessages[]) => {
      socket.emit(
        "getAllUserOfChatRoom",
        {
          username: Data.response.user.username,
          chatRoomName: room.chatRooms.RoomId,
        },
        (response: allGroupUsers[]) => {
          response.map((user) => {
            if (
              message[message.length - 1].user.username === user.user.username
            ) {
              setNewMessage((prevMessages) => [
                ...prevMessages,
                message[message.length - 1],
              ]);
            }
          });
        }
      );
      // if ()

      // setNewMessage((prevMessages) => [
      //   ...prevMessages,
      //   message[message.length - 1],
      // ]);
      // console.log("incoming message is:", message);
    });
  }, []);

  useEffect(() => {
    if (room) {
      socket.emit(
        "findAllChatRoomConversation",
        {
          username: Data.response.user.username,
          chatRoomName: room.chatRooms.RoomId,
        },
        (response: allGroupMessages[]) => {
          setAllMessages(response);
          // console.log("Fuckkk", response);
        }
      );
    }
  }, [room]);

  return (
    <div className={Style.container}>
      <motion.ul initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {allMessages &&
          allMessages.map((message, index) => {
            const isLastMessage = index === allMessages.length - 1;
            return (
              <li key={message.id}>
                {message.user.username == Data.response.user.username ? (
                  <RightChatGroup oldMessage={message} newMessage={undefined} />
                ) : (
                  <LeftChatGroup
                    oldMessage={message}
                    newMessage={undefined}
                    friendData={message.user}
                  />
                )}
                {isLastMessage && <div ref={ref} />}
              </li>
            );
          })}
        {newMessage &&
          newMessage.map((message, index) => {
            const isLastMessage = index === newMessage.length - 1;
            // console.log("test", newMessage);
            return (
              <li key={message.id}>
                {message.user.username == Data.response.user.username ? (
                  <RightChatGroup oldMessage={undefined} newMessage={message} />
                ) : (
                  <LeftChatGroup
                    oldMessage={undefined}
                    newMessage={message}
                    friendData={message.user}
                  />
                )}
                {isLastMessage && <div ref={ref} />}
              </li>
            );
          })}
      </motion.ul>
      <InputChatGroup room={room} />
    </div>
  );
}
