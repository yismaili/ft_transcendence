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
  const [newMessage, setNewMessage] = useState<allMessages[]>([]);

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
      setNewMessage((prevMessages) => [...prevMessages, message[0]]);
    });
    console.log("sender", myData.data.username);
    console.log("receiver", friendData.user.username);

    socket.emit(
      "findAllChat",
      {
        user: myData.data.username,
        secondUser: friendData.user.username,
      },
      (response: allMessages[]) => {
        console.log('from here is :', response);
        
        setAllMessages(response);
      }
    );
  }, []);

  const setMessage = (MessagetoSend: string) => {
    sendMessage.message = MessagetoSend;
    sendMessage.user.username = myData.data.username;
    socket.emit("createChat", {
      message: MessagetoSend,
      user: myData.data.username,
      secondUser: friendData.user.username,
    });
  };

  return (
    <div className={Style.container}>
      <ul>
        {allMessages &&
          allMessages.map((message) => {
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
              </li>
            );
          })}
        {newMessage &&
          newMessage.map((message) => {
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
              </li>
            );
          })}
      </ul>
      <InputChat socket={socket} setMessage={setMessage} />
    </div>
  );
}
