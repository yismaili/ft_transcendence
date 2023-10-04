"use client";
import FriendRequest from "./FriendRequest/FriendRequest";
import NewGroupSetting from "./GroupSetting/NewGroupSetting";
import SlideButton from "./SlideButton/SlideButton";
import { useEffect, useState } from "react";
import GroupMsg from "./GroupMsg/GroupMsg";
import Style from "./Chat.module.css";
import Direct from "./Direct/Direct";
import Group from "./Group/Group";
import Link from "next/link";
import Msg from "./Msg/Msg";

export default function Chat() {
  const [isGroup, setGroup] = useState(false);
  let [friends, setFriends] = useState<UserArrayData>();
  let [user, setUser] = useState<User>();
  const [userFriend, setUserFriend] = useState<User_Friend>();
  const [groupInput, setGroupInput] = useState<GroupInput>();

  useEffect(() => {
    const fetching = async () => {
      const resFriend = await fetch("http://localhost:3000/api/chat");
      const friend = await resFriend.json();
      setFriends(friend);

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
    friends == undefined ||
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
              <Group data={{} as User_Friend} choseChat={setUserFriend} />
            ) : (
              friends.data.map((friend) => {
                return (
                  <li key={friend.id}>
                    {user?.data.username == friend.user.username ? (
                      <Direct data={friend.friend} choseChat={setUserFriend} />
                    ) : (
                      <Direct data={friend.user} choseChat={setUserFriend} />
                    )}
                  </li>
                );
              })
            )}
          </ul>
          {isGroup ? <NewGroupSetting setGroupInput={setGroupInput} /> : <FriendRequest />}
        </div>
        <div className={Style.right} key={userFriend?.id}>
          {userFriend && !isGroup && (
            <Msg friendData={userFriend} myData={user} />
          )}
          {isGroup && <GroupMsg groupInput={groupInput}/>}
        </div>
      </div>
    </div>
  );
}
