import { useEffect, useState } from "react";
import Style from "./UserManagement.module.css";
import User from "./user/User";
import Cookies from "cookies-ts";
import { io, Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

type props = {
  room: AllRooms;
  setOpen: Function;
};

export default function UserManagement({ room, setOpen }: props) {
  const [allUsers, setAllUsers] = useState<User_Friend[]>();
  const [matchUsers, setMatchingUsers] = useState<User_Friend[]>([]);
  const [existsUsers, setExistsUsers] = useState<allGroupUsers[]>([]);
  const [isGroupUsers, setIsGroupUsers] = useState(true);

  const cookies = new Cookies();
  const Data = JSON.parse(JSON.stringify(cookies.get("userData")));

  const [socket] = useState(
    io("0.0.0.0:3001/chat", {
      extraHeaders: {
        Authorization: Data.response.token,
      },
    })
  );

  useEffect(() => {
    socket.emit("gitAllUsers", (response: User_Friend[]) => {
      setAllUsers(response);
    });
    socket.emit(
      "getAllUserOfChatRoom",
      {
        username: Data.response.user.username,
        chatRoomName: room.chatRooms.RoomId,
      },
      (response: allGroupUsers[]) => {
        setExistsUsers(response);
        if (isGroupUsers)
          setMatchingUsers(
            response
              .filter(
                (user) => user.user.username !== Data.response.user.username
              )
              .map((user) => user.user)
          );
        else setMatchingUsers([]);
      }
    );
  }, [isGroupUsers]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filtredInput = event.currentTarget.value.trim();
    setMatchingUsers([]);

    if (isGroupUsers) {
      // setMatchingUsers(existsUsers.map((user) => user.user));
      setMatchingUsers(
        existsUsers
          .filter((user) => user.user.username !== Data.response.user.username)
          .map((user) => user.user)
      );
      if (filtredInput) {
        setMatchingUsers([]);
        const filtredArray = existsUsers.filter((user) => {
          if (user.user.username !== Data.response.user.username)
            return user.user.username.includes(filtredInput);
        });
        setMatchingUsers(filtredArray.map((user) => user.user));
      }
    } else {
      if (allUsers && filtredInput) {
        allUsers.map((user) => {
          if (
            user.username.includes(filtredInput) &&
            user.username != Data.response.user.username &&
            !existsUsers.some(
              (existUser) => existUser.user.username == user.username
            )
          )
            setMatchingUsers((prev) => [...prev, user]);
        });
      }
    }
  };

  return (
    <>
      <div className={Style.container}>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            onChange={handleChange}
            placeholder={`user name to search for in ${
              isGroupUsers ? "this group " : "all usernames"
            }`}
          />
        </form>
        <div className={Style.Searchicon} />
        <div
          className={Style.showAllUsers}
          onClick={() => setIsGroupUsers((prev) => !prev)}
          style={{
            backgroundImage: isGroupUsers
              ? "url(/img/chat/multipleUsers.png)"
              : "url(/img/chat/user.png)",
          }}
        />
      </div>
      {isGroupUsers ? (
        <ul className={Style.users}>
          <AnimatePresence>
            {matchUsers &&
              matchUsers.map((user) => {
                return (
                  <motion.li
                    className={Style.user}
                    key={user.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <User
                      user={user}
                      room={room}
                      setOpen={setOpen}
                      isGroupUsers={isGroupUsers}
                      allGroupUsers={existsUsers}
                    />
                  </motion.li>
                );
              })}
          </AnimatePresence>
        </ul>
      ) : (
        <ul className={Style.users}>
          <AnimatePresence>
            {matchUsers &&
              matchUsers.map((user) => {
                return (
                  <motion.li
                    className={Style.user}
                    key={user.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <User
                      user={user}
                      room={room}
                      setOpen={setOpen}
                      isGroupUsers={isGroupUsers}
                      allGroupUsers={existsUsers}
                    />
                  </motion.li>
                );
              })}
          </AnimatePresence>
        </ul>
      )}
    </>
  );
}
