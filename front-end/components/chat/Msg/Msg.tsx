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

const cookies = new Cookies();
const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

const socket = io("0.0.0.0:3001", {
  extraHeaders: {
    Authorization: Data.response.token,
  },
});

export default function Msg({ friendData, myData }: props) {
  const [allMessages, setAllMessages] = useState<allMessages[]>();
  const [newMessage, setNewMessage] = useState<allMessages[]>([]);
  const [id, setId] = useState(123);

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

  // const cookies = new Cookies();
  // const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  // const socket = io("0.0.0.0:3001", {
  //   extraHeaders: {
  //     Authorization: Data.response.token,
  //   },
  // });

  // useEffect(() => {
  //   socket.emit(
  //     "findAllChat",
  //     {
  //       user: myData.data.username,
  //       secondUser: friendData.user.username,
  //     },
  //     (response: allMessages[]) => {
  //       setAllMessages(response);
  //       // console.log('first test1', response);
  //     }
  //   );
  // }, []);

  const getAllMessages = (): allMessages[] =>  {
    let res: allMessages[] = {} as allMessages[];

    socket.emit(
      "findAllChat",
      {
        user: myData.data.username,
        secondUser: friendData.user.username,
      },
      (response: allMessages[]) => {
        res = response;
        console.log("first test1", response);
      }
      );
      console.log("outside", res);
      
      return res;
    }
    
    // const tmp = getAllMessages();
    // console.log('tmp is: ', tmp);
    
    setAllMessages(tmp);


  socket.on("message", (message: allMessages[]) => {
    setNewMessage((prevMessages) => [...prevMessages, ...message]);
  });

  const setMessage = (MessagetoSend: string) => {
    sendMessage.message = MessagetoSend;
    sendMessage.user.username = myData.data.username;
    sendMessage.id = id;
    setId(id + 1);
    setNewMessage((prevMessages) => [...prevMessages, sendMessage]);

    socket.emit("createChat", {
      message: MessagetoSend,
      user: myData.data.username,
      secondUser: friendData.user.username,
    });
  };

  if (allMessages)
    console.log(
      "inside :",
      allMessages
    );

  return (
    <div className={Style.container}>
      <ul>
        {/* {allMessages &&
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
          })} */}
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
      {/* {newMessage && (
        <RightChat newMessage={newMessage} oldMessage={undefined} />
      )}
      {recMessage && (
        <LeftChat
          oldMessage={undefined}
          newMessage={recMessage}
          friendData={friendData}
        />
      )} */}
      <InputChat socket={socket} setMessage={setMessage} />
    </div>
  );
}
