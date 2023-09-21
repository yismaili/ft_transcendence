"use client";
import SlideButton from "./SlideButton/SlideButton";
import { useEffect, useState } from "react";
import Style from "./Chat.module.css";
import Direct from "./Direct/Direct";
import Group from "./Group/Group";
import Link from "next/link";
import Msg from "./Msg/Msg";

export default function Chat() {
  const [isGroup, setGroup] = useState(false);
  let [users, setUsers] = useState<UserArray>();
  const [userConversation, setUserConversation] = useState<UserFriend>();

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch("http://localhost:3000/api/chat");
      // I need to fetch the api/home to pass it to Msg ot socket.io event
      const users = await res.json();
      setUsers(users);
    };
    fetching();
  }, []);
  // if (users)
  // console.log(users);

  // users.data.map((user) => {
  //   console.log( user);
  // });

  const turnSwitch = () => {
    setGroup(!isGroup);
  };

  if (users == undefined)
    return (
      <div className={Style.container}>
        <header className={Style.header}>
          <div className={Style.chatRoomBtn}>
            <p>Loading ...</p>
          </div>
          <Link href="/home" className={Style.profileBtn}>
            <p>Loading ...</p>
          </Link>
        </header>
        <div className={Style.subContainer}>
          <div className={Style.left}>
            <SlideButton func={turnSwitch} resetChat={setUserConversation} />
            {/* {isGroup ? <Group /> : <Direct />} */}
          </div>
          <div className={Style.right}></div>
        </div>
      </div>
    );

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
          <SlideButton func={turnSwitch} resetChat={setUserConversation} />
          <ul>
            {isGroup ? (
              <Group />
            ) : (
              users.data.map((user) => {
                return (
                  <li key={user.id}>
                    <Direct data={user} choseChat={setUserConversation} />
                  </li>
                );
              })
            )}
          </ul>
        </div>
        <div className={Style.right}>
          <Msg datatoShow={userConversation} />
        </div>
      </div>
    </div>
  );
}
