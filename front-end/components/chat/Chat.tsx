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
  let [firends, setFriends] = useState<UserArray>();
  let [user, setUser] = useState<User>();
  const [userFriend, setUserFriend] = useState<UserFriend>();

  useEffect(() => {
    const fetching = async () => {
      const resFriend = await fetch("http://localhost:3000/api/chat");
      const firends = await resFriend.json();
      setFriends(firends);

      const resUser = await fetch("http://localhost:3000/api/home");
      const user = await resUser.json();
      setUser(user);
    };
    fetching();
  }, []);

  const turnSwitch = () => {
    setGroup(!isGroup);
  };

  // console.log(user.length == 0);

  if (
    firends == undefined ||
    user == undefined ||
    JSON.stringify(user).length <= 2
  )
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
            <SlideButton func={turnSwitch} resetChat={setUserFriend} />
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
          <SlideButton func={turnSwitch} resetChat={setUserFriend} />
          <ul>
            {isGroup ? (
              <Group />
            ) : (
              firends.data.map((firend) => {
                return (
                  <li key={firend.id}>
                    <Direct data={firend} choseChat={setUserFriend} />
                  </li>
                );
              })
            )}
          </ul>
        </div>
        <div className={Style.right}>
          {userFriend ? <Msg friendData={userFriend} myData={user} /> : <></>}
        </div>
      </div>
    </div>
  );
}
