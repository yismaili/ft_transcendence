import { useEffect, useState } from "react";
import Style from "./GroupManagement.module.css";
import User from "./Room/Room";
import Cookies from "cookies-ts";
import { io, Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

type props = {
  setOpen: Function;
};

export default function GroupManagement({ setOpen }: props) {
  const [allRooms, setAllRooms] = useState<CreateRoom[]>([]);
  const [matchRooms, setMatchingRooms] = useState<CreateRoom[]>([]);

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
      "AllchatRoom",
      {
        username: Data.response.user.username,
      },
      (response: CreateRoom[]) => {
        setAllRooms(response);
      }
    );
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filtredInput = event.currentTarget.value.trim();
    setMatchingRooms([]);

    if (allRooms && filtredInput) {
      allRooms.map((room) => {
        if (
          room.name.includes(filtredInput) &&
          room.name != Data.response.user.username &&
          room.status != 'private'
        )
          setMatchingRooms((prev) => [...prev, room]);
      });
    }
  };

  return (
    <>
      <div className={Style.container}>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            onChange={handleChange}
            placeholder="user name to search for"
          />
        </form>
        <div className={Style.Searchicon} />
      </div>
      <ul className={Style.users}>
        <AnimatePresence>
          {matchRooms &&
            matchRooms.map((room) => {
              return (
                <motion.li
                  className={Style.user}
                  key={room.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <User room={room} setOpen={setOpen} />
                </motion.li>
              );
            })}
        </AnimatePresence>
      </ul>
    </>
  );
}
