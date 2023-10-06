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
  // setData: Function;
  room: AllRooms;
  setMessage: Function;
};

export default function GroupMsg({
  groupInput,
  // setData,
  room,
  setMessage,
}: props) {
  // const cookies = new Cookies();
  // const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  // useEffect(() => {
  //   if (Data) setData(Data);
  // }, []);

  // const [socket] = useState(
  //   io("0.0.0.0:3001", {
  //     extraHeaders: {
  //       Authorization: Data.response.token,
  //     },
  //   })
  // );

  return (
    <div className={Style.container}>
      {/* <motion.ul initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {allMessages &&
          allMessages.map((message, index) => {
            const isLastMessage = index === allMessages.length - 1;
            return (
              <li key={message.id}>
                {message.user.username == myData.data.username ? (
                  <RightChatGroup oldMessage={message} newMessage={undefined} />
                ) : (
                  <LeftChatGroup
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
            console.log("test", newMessage);

            return (
              <li key={message.id}>
                {message.user.username == myData.data.username ? (
                  <RightChatGroup oldMessage={undefined} newMessage={message} />
                ) : (
                  <LeftChatGroup
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
      <InputChat socket={socket} setMessage={setMessage} /> */}
      <InputChatGroup setMessage={setMessage} />
      test
    </div>
  );
}
