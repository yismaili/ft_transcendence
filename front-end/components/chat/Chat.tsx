"use client";
import NewGroupSetting from "./NewGroupSetting/NewGroupSetting";
import FriendRequest from "./FriendRequest/FriendRequest";
import SlideButton from "./SlideButton/SlideButton";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import GroupMsg from "./GroupMsg/GroupMsg";
import Style from "./Chat.module.css";
import Direct from "./Direct/Direct";
import Group from "./Group/Group";
import Cookies from "cookies-ts";
import Link from "next/link";
import Msg from "./Msg/Msg";

export default function Chat() {
  const [isGroup, setGroup] = useState(false);
  let [friends, setFriends] = useState<UserArrayData>();
  let [user, setUser] = useState<User>();
  const [userFriend, setUserFriend] = useState<User_Friend>();
  const [groupInput, setGroupInput] = useState<GroupInput>();
  const [allRooms, setAllRooms] = useState<AllRooms[]>();
  const [room, setRoom] = useState<AllRooms>();
  // const [updateChatRoom, setUpdateChatRoom] = useState(false);

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
      "chatRoomOfUser",
      {
        username: Data.response.user.username,
      },
      (response: AllRooms[]) => {
        console.log('res', response);
        setAllRooms(response);
      }
    );
    if (groupInput) {
      socket.emit(
        "createChatRoom",
        {
          name: groupInput.name,
          status: groupInput.status,
          user: Data.response.user.username,
          password: groupInput.password,
          picture: groupInput.picture,
          statusPermissions: "admin",
        },
        () => {
          socket.emit(
            "chatRoomOfUser",
            {
              username: Data.response.user.username,
            },
            (response: AllRooms[]) => {
              setAllRooms(response);
            }
          );
          setGroupInput(undefined);
        }
      );
    }
  }, [groupInput]);

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
            <SlideButton
              func={turnSwitch}
              resetChat={setUserFriend}
              choseChat={setRoom}
            />
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
          <SlideButton
            func={turnSwitch}
            resetChat={setUserFriend}
            choseChat={setRoom}
          />
          <ul>
            {isGroup
              ? allRooms &&
                allRooms.map((room) => {
                  return (
                    <li key={room.id}>
                      <Group room={room} choseChat={setRoom} />
                    </li>
                  );
                })
              : friends.data.map((friend) => {
                  return (
                    <li key={friend.id}>
                      {user?.data.username == friend.user.username ? (
                        <Direct
                          data={friend.friend}
                          choseChat={setUserFriend}
                        />
                      ) : (
                        <Direct data={friend.user} choseChat={setUserFriend} />
                      )}
                    </li>
                  );
                })}
          </ul>
          {isGroup ? (
            <NewGroupSetting setGroupInput={setGroupInput} />
          ) : (
            <FriendRequest />
          )}
        </div>
        <div className={Style.right} key={!isGroup ? userFriend?.id : room?.id}>
          {userFriend && !isGroup && (
            <Msg friendData={userFriend} myData={user} />
          )}
          {isGroup && room && <GroupMsg groupInput={groupInput} room={room} />}
        </div>
      </div>
    </div>
  );
}
