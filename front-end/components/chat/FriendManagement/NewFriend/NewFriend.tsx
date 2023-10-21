import { useSocketContext } from "@/contexts/socket-context";
import { useEffect, useState } from "react";
import Style from "./NewFriend.module.css";
import User from "./user/User";
import { motion, AnimatePresence } from "framer-motion";
type props = {
  setOpen: Function;
  friends: UserArrayData;
};

export default function NewFriend({ setOpen, friends }: props) {
  const { socket, Data } = useSocketContext();
  const [allUsers, setAllUsers] = useState<User_Friend[]>();
  const [matchUsers, setMatchingUsers] = useState<User_Friend[]>([]);

  useEffect(() => {
    socket.emit("gitAllUsers", (response: User_Friend[]) => {
      setAllUsers(response);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filtredInput = event.currentTarget.value.trim();
    setMatchingUsers([]);

    if (allUsers && filtredInput) {
      allUsers.map((user) => {
        if (
          user.username.includes(filtredInput) &&
          user.username != Data.response.user.username &&
          !friends.data.some((alreadyFriend) => {
            if (alreadyFriend.user.username === Data.response.user.username)
              return alreadyFriend.friend.username === user.username;
            else return alreadyFriend.user.username === user.username;
          })
        ) {
          setMatchingUsers((prev) => [...prev, user]);
        }
      });
    }
  };

  return (
    <>
      <div className={Style.container}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            onChange={handleChange}
            placeholder={"user name to add as friend"}
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
                  <User user={user} setOpen={setOpen} />
                </motion.li>
              );
            })}
        </AnimatePresence>
      </ul>
    </>
  );
}
