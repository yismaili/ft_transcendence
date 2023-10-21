import { useEffect, useState } from "react";
import Style from "./GroupManagement.module.css";
import User from "./Room/Room";
import { motion, AnimatePresence } from "framer-motion";
import { useSocketContext } from "@/contexts/socket-context";

type props = {
  setOpen: Function;
};

export default function GroupManagement({ setOpen }: props) {
  const { socket, Data } = useSocketContext();
  const [allRooms, setAllRooms] = useState<CreateRoom[]>([]);
  const [matchRooms, setMatchingRooms] = useState<CreateRoom[]>([]);
  const [allRoomsOfUser, setAllRoomsOfUser] = useState<AllRooms[]>([]);

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

    socket.emit(
      "chatRoomOfUser",
      { username: Data.response.user.username },
      (response: AllRooms[]) => {
        setAllRoomsOfUser(response);
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
          room.status != "private" &&
          !allRoomsOfUser.some(
            (roomForUser) => roomForUser.chatRooms.RoomId === room.RoomId
          )
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
