import { useEffect, useState } from "react";
import Style from "./FriendGameRequest.module.css";
import User from "./user/User";
import { motion, AnimatePresence } from "framer-motion";

type props = {
  setOpen: Function;
  data: gameRequest[];
};

export default function FriendGameRequest({ setOpen, data }: props) {

  return (
    <ul className={Style.users}>
      <AnimatePresence>
        {data &&
          data.map((user) => {
            return (
              <motion.li
                className={Style.user}
                key={user.sender.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <User user={user.sender} setOpen={setOpen} />
              </motion.li>
            );
          })}
      </AnimatePresence>
    </ul>
  );
}
