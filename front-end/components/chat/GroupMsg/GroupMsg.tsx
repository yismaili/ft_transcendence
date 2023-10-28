import Style from "./GroupMsg.module.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import LeftChatGroup from "./LeftChatGroup/LeftChatGroup";
import RightChatGroup from "./RightChatGroup/RightChatGroup";
import InputChatGroup from "./InputChatGroup/InputChatGroup";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  groupInput: GroupInput | undefined;
  room: AllRooms;
  blocked: FriendRequest[];
};

export default function GroupMsg({ groupInput, room, blocked }: props) {
  const { socket, Data } = useSocketContext();
  const [allMessages, setAllMessages] = useState<allGroupMessages[]>();
  const [newMessage, setNewMessage] = useState<allGroupMessages[]>([]);
  const [allGroupUsers, setAllGroupUsers] = useState<allGroupUsers[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isMute, setIsMute] = useState(false);

  useEffect(() => {
    socket.on("updateUI", (messaged: string) => {
      if (messaged.split(" ")[0] === "muteUser") {
        if (messaged.split(" ")[1] === Data.response.user.username) {
          setIsMute(true);
          let num: number = +messaged.split(" ")[2];
          setTimeout(() => {
            setIsMute(false);
          }, num * 60 * 1000);
        }
      }
    });
  }, []);

  useEffect(() => {
    socket.on("message", (message: allGroupMessages) => {
      if (message.user)
        socket.emit(
          "getAllUserOfChatRoom",
          {
            username: Data.response.user.username,
            chatRoomName: room.chatRooms.RoomId,
          },
          (response: allGroupUsers[]) => {
            const allBlockedUsers = blocked.map((user) => {
              if (user.user.username === Data.response.user.username)
                return user.friend.username;
              else return user.user.username;
            });

            const allFiltredUsers = response.filter(
              (user) => !allBlockedUsers.includes(user.user.username)
            );
            setAllGroupUsers(
              response.filter(
                (user) => !allBlockedUsers.includes(user.user.username)
              )
            );
            allFiltredUsers.map((user) => {
              if (message.user.username === user.user.username) {
                setNewMessage((prevMessages) => [...prevMessages, message]);
              }
            });
          }
        );
    });
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ block: "end" });
  }, [allMessages]);

  useEffect(() => {
    if (ref.current)
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [newMessage]);

  useEffect(() => {
    if (room) {
      socket.emit(
        "findAllChatRoomConversation",
        {
          username: Data.response.user.username,
          chatRoomName: room.chatRooms.RoomId,
        },
        (messages: allGroupMessages[]) => {
          socket.emit(
            "getAllUserOfChatRoom",
            {
              username: Data.response.user.username,
              chatRoomName: room.chatRooms.RoomId,
            },
            (response: allGroupUsers[]) => {
              const allBlockedUsers = blocked.map((user) => {
                if (user.user.username === Data.response.user.username)
                  return user.friend.username;
                else return user.user.username;
              });

              setAllMessages(
                messages.filter(
                  (msg) => !allBlockedUsers.includes(msg.user.username)
                )
              );
              setAllGroupUsers(
                response.filter(
                  (user) => !allBlockedUsers.includes(user.user.username)
                )
              );
            }
          );
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
                    allGroupUsers={allGroupUsers}
                    room={room}
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
                {message.user.username == Data.response.user.username ? (
                  <RightChatGroup oldMessage={undefined} newMessage={message} />
                ) : (
                  <LeftChatGroup
                    oldMessage={undefined}
                    newMessage={message}
                    friendData={message.user}
                    allGroupUsers={allGroupUsers}
                    room={room}
                  />
                )}
                {isLastMessage && <div ref={ref} />}
              </li>
            );
          })}
      </motion.ul>
      {!isMute && <InputChatGroup room={room} />}
    </div>
  );
}
