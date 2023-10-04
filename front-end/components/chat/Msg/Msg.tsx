import Style from "./Msg.module.css";
import LeftChat from "./LeftChat/LeftChat";
import RightChat from "./RightChat/RightChat";
import InputChat from "./InputChat/InputChat";
import io from "socket.io-client";
import Cookies from "cookies-ts";
import { useEffect, useRef, useState } from "react";
import { useAnimation, motion } from "framer-motion";

type props = {
  friendData: User_Friend;
  myData: User;
};

export default function Msg({ friendData, myData }: props) {
  const [allMessages, setAllMessages] = useState<allMessages[]>();
  const [newMessage, setNewMessage] = useState<allMessages[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  // console.log(friendData);

  const sendMessage: allMessages = {
    dateToSend: "",
    id: 0,
    message: "",
    user: {
      email: "",
      firstName: "",
      id: 0,
      lastName: "",
      picture: "",
      username: "",
    },
  };

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
    socket.on("message", (message: allMessages[]) => {
      // console.log('mesage is: ', message);
      
      setNewMessage((prevMessages) => [...prevMessages, message[message.length - 1]]);
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
    sendMessage.message = MessagetoSend;
    sendMessage.user.username = myData.data.username;
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
            console.log('test', newMessage);
            
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
