import { useEffect, useState } from "react";
import Style from "./FriendRequest.module.css";
import User from "./user/User";
import Cookies from "cookies-ts";
import { io, Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

type props = {
  setOpen: Function;
  friends: UserArrayData;
};

export default function FriendRequest({ setOpen, friends }: props) {
  const [allRequests, setAllRequests] = useState<FriendRequest[]>();
  const [matchUsers, setMatchingUsers] = useState<User_Friend[]>([]);
  const [swap, setSwap] = useState<FriendRequest[]>([]);
  const [existsUsers, setExistsUsers] = useState<allGroupUsers[]>([]);
  const [isGroupUsers, setIsGroupUsers] = useState(true);

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
    socket.on("updateUI", (messaged: string) => {
      console.log(messaged);

      if (messaged.split(" ")[0] === "sendRequest") {
        if (messaged.split(" ")[1] === Data.response.user.username) {
          getAllRequests();
        }
      }
    });

    const getAllRequests = async () => {
      const res = await fetch(
        `http://localhost:3001/users/profile/${Data.response.user.username}/requests`,
        {
          cache: "no-cache",
          headers: { authorization: `Bearer ${Data.response.token}` },
        }
      );
      const data = await res.json();
      setAllRequests(data);
      setSwap(data);
    };
    getAllRequests();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filtredInput = event.currentTarget.value.trim();

    if (allRequests && !filtredInput) setAllRequests(swap);

    if (filtredInput && allRequests) {
      setAllRequests([]);
      const filtredArray = swap.filter((user) =>
        user.user.username.includes(filtredInput)
      );
      setAllRequests(filtredArray);
    }
  };

  return (
    <>
      <div className={Style.container}>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            onChange={handleChange}
            placeholder={"user name to search for in requests"}
          />
        </form>
        <div className={Style.Searchicon} />
      </div>
      <ul className={Style.users}>
        <AnimatePresence>
          {allRequests &&
            allRequests.map((user) => {
              return (
                <motion.li
                  className={Style.user}
                  key={user.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <User user={user.user} setOpen={setOpen} />
                </motion.li>
              );
            })}
        </AnimatePresence>
      </ul>
    </>
  );
}
