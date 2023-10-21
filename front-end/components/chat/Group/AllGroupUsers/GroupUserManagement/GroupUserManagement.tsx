import { useEffect, useState } from "react";
import Style from "./GroupUserManagement.module.css";
import User from "../../ChangeGroupSetting/UserManagement/user/User";
import Cookies from "cookies-ts";
import { io, Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

type props = {
  room: AllRooms;
  setOpen: Function;
};

export default function GroupUserManagement({ room, setOpen }: props) {
  const [matchUsers, setMatchingUsers] = useState<User_Friend[]>([]);
  const [existsUsers, setExistsUsers] = useState<allGroupUsers[]>([]);

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
    socket.emit(
      "getAllUserOfChatRoom",
      {
        username: Data.response.user.username,
        chatRoomName: room.chatRooms.RoomId,
      },
      (response: allGroupUsers[]) => {
        setExistsUsers(response);
        setMatchingUsers(
          response
            .filter(
              (user) => user.user.username !== Data.response.user.username
            )
            .map((user) => user.user)
        );
      }
    );
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filtredInput = event.currentTarget.value.trim();
    setMatchingUsers([]);

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
  };

  return (
    <>
      <div className={Style.container}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            onChange={handleChange}
            placeholder="user name to search for in Group"
          />
        </form>
        <div className={Style.Searchicon} />
      </div>
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
                    isGroupUsers={true}
                    allGroupUsers={existsUsers}
                  />
                </motion.li>
              );
            })}
        </AnimatePresence>
      </ul>
    </>
  );
}
