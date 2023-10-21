import Style from "./Msg.module.css";
import LeftChat from "./LeftChat/LeftChat";
import RightChat from "./RightChat/RightChat";
import InputChat from "./InputChat/InputChat";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  friendData: User_Friend;
  myData: User;
};

export default function Msg({ friendData, myData }: props) {
  const { socket } = useSocketContext();
  const [allMessages, setAllMessages] = useState<allMessages[]>();
  const [newMessage, setNewMessage] = useState<allMessages[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.on("message", (message: allMessages[]) => {
      setNewMessage((prevMessages) => [...prevMessages, message[0]]);
    });

    socket.emit(
      "findAllChat",
      {
        user: myData.data.username,
        secondUser: friendData.username,
      },
      (response: allMessages[]) => {
        setAllMessages(response);
      }
    );
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ block: "end" });
  }, [allMessages]);

  useEffect(() => {
    if (ref.current)
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [newMessage]);

  const setMessage = (MessagetoSend: string) => {
    socket.emit("createChat", {
      message: MessagetoSend,
      user: myData.data.username,
      secondUser: friendData.username,
    });
  };

  return (
    <div className={Style.container}>
      <motion.ul initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {allMessages &&
          allMessages.map((message, index) => {
            const isLastMessage = index === allMessages.length - 1;
            return (
              <li key={message.id}>
                {message.user.username == myData.data.username ? (
                  <RightChat oldMessage={message} newMessage={undefined} />
                ) : (
                  <LeftChat
                    oldMessage={message}
                    newMessage={undefined}
                    friendData={friendData}
                  />
                )}
                {isLastMessage && <div ref={ref} />}
              </li>
            );
          })}
        {newMessage &&
          newMessage.map((message, index) => {
            const isLastMessage = index === newMessage.length - 1;
            return (
              <li key={message.id}>
                {message.user.username == myData.data.username ? (
                  <RightChat oldMessage={undefined} newMessage={message} />
                ) : (
                  <LeftChat
                    oldMessage={undefined}
                    newMessage={message}
                    friendData={friendData}
                  />
                )}
                {isLastMessage && <div ref={ref} />}
              </li>
            );
          })}
      </motion.ul>
      <InputChat socket={socket} setMessage={setMessage} />
    </div>
  );
}
