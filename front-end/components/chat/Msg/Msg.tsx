import Style from "./Msg.module.css";
import LeftChat from "./LeftChat/LeftChat";
import RightChat from "./RightChat/RightChat";
import InputChat from "./InputChat/InputChat";
import io from "socket.io-client";
import Cookies from "cookies-ts";
import { useEffect, useState } from "react";

type props = {
  friendData: UserFriend;
  myData: User;
};

export default function Msg({ friendData, myData }: props) {
  const [allMessages, setAllMessages] = useState<allMessages[]>();
  const [newMessage, setNewMessages] = useState<any>();
  const [recMessage, setRecMessages] = useState<any>();

  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  const socket = io("0.0.0.0:3001", {
    extraHeaders: {
      Authorization: Data.response.token,
    },
  });

  useEffect(() => {
    socket.emit(
      "findAllChat",
      {
        user: myData.data.username,
        secondUser: friendData.user.username,
      },
      (response: allMessages[]) => {
        console.log("all messages: ", response);

        setAllMessages(response);
      }
    );

    socket.on("message", (message) => {
      setRecMessages(message);
      console.log("recive message: ", message);
    });
  }, []);

  const setMessage = (MessagetoSend: string) => {
    setNewMessages(MessagetoSend);

    socket.emit("createChat", {
      message: MessagetoSend,
      user: myData.data.username,
      secondUser: friendData.user.username,
    });
  };
  if (allMessages) {
    console.log("k", allMessages[0]);

    return (
      <div className={Style.container}>
        <ul>
          {allMessages.map((message) => {
            return (
              <li key={message.id}>
                {message.user.username == myData.data.username ? (
                  <RightChat message={message} />
                ) : (
                  <LeftChat message={recMessage} friendData={friendData} />
                )}
              </li>
            );
          })}
        </ul>
        <LeftChat message={newMessage} friendData={friendData} />
        <RightChat message={recMessage} />
        <InputChat socket={socket} setMessage={setMessage} />
      </div>
    );
  }
  return <>test</>;
}
