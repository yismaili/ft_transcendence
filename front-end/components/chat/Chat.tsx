"use client";
import Style from "./Chat.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import SlideButton from "./SlideButton/SlideButton";
import Direct from "./Direct/Direct";
import Group from "./Group/Group";

export default function Chat() {
  const [isGroup, setGroup] = useState(false);
  let [user, setUser] = useState<User>();

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch("http://localhost:3000/api/chat");
      const user = await res.json();
      setUser(user);
      console.log(user);
    };
      fetching();
  }, []);

  

  const turnSwitch = () => {
    setGroup(!isGroup);
  };

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
          <SlideButton func={turnSwitch}/>
          {isGroup ? <Group /> : <Direct />}
        </div>
        <div className={Style.right}></div>
      </div>
    </div>
  );
}
