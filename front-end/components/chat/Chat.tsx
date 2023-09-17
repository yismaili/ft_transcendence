'use client'
import Style from "./Chat.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Chat() {
  let gg = ''
  return (
    <div className={Style.container}>
      <header className={Style.header}>
        <div className={Style.chatRoomBtn}>
          <p>chat room</p>
        </div>
        <Link href="/home" className={Style.profileBtn}>
          <p>profile</p>
        </Link>
      </header>
      <div className={Style.subContainer}>
        <div className={Style.left}>
          <div className={Style.slideBtn}>
            <p className={Style.directTxt}>Direct</p>
            <p className={Style.groupTxt}>Group</p>
            <motion.div>

            </motion.div>
          </div>
        </div>
        <div className={Style.right}></div>
      </div>
    </div>
  );
}
