"use client";
import FriendRequest from "./FriendRequest/FriendRequest";
import NewGroupSetting from "./NewGroupSetting/NewGroupSetting";
import SlideButton from "./SlideButton/SlideButton";
import { useEffect, useState } from "react";
import GroupMsg from "./GroupMsg/GroupMsg";
import Style from "./Chat.module.css";
import Direct from "./Direct/Direct";
import Group from "./Group/Group";
import { io, Socket } from "socket.io-client";
import Link from "next/link";
import Msg from "./Msg/Msg";

export default function Chat() {
  const [isGroup, setGroup] = useState(false);
  let [friends, setFriends] = useState<UserArrayData>();
  let [user, setUser] = useState<User>();
  const [userFriend, setUserFriend] = useState<User_Friend>();
  const [groupInput, setGroupInput] = useState<GroupInput>();
  const [data, setData] = useState<any>();
  const [allRooms, setAllRooms] = useState<AllRooms[]>();
  const [choseRoom, setChoseRoom] = useState<AllRooms>();
  // const [messageGroup, setMessageGroup] = useState<string>();
  // const [key, setKey] = useState(0);
  let socket: any;

  useEffect(() => {
    if (data) {
      socket = io("0.0.0.0:3001", {
        extraHeaders: { Authorization: data.response.token },
      });
      socket.emit(
        "AllchatRoom",
        {
          username: data.response.user.username,
        },
        (response: AllRooms[]) => {
          setAllRooms(response);
        }
      );
    }
    if (groupInput) {
      socket.emit(
        "createChatRoom",
        {
          name: groupInput.name,
          status: groupInput.status,
          user: data.response.user.username,
          password: groupInput.password,
          statusPermissions: "admin",
        },
        (response: CreateRoom) => {
          console.log("Yo response", response);
          socket.emit(
            "AllchatRoom",
            {
              username: data.response.user.username,
            },
            (response: AllRooms[]) => {
              setAllRooms(response);
            }
          );
          setGroupInput(undefined);
        }
      );
      // setKey(key => key + 1);
    }
    if (choseRoom) {
      socket.emit(
        "findAllChatRoomConversation",
        {
          username: data.response.user.username,
          chatRoomName: choseRoom.RoomId,
        },
        (response: any) => {
          console.log("Fuck ", response);
        }
      );
    }
  }, [data, groupInput, choseRoom]);
  
  const setMessage = (message: string) => {
    console.log(socket);
    
    socket.emit(
      "sendMessageToChatRoom",
      {
        message: message,
        username: data.response.user.username,
        chatRoomName: choseRoom?.RoomId,
      },
      (response: any) => {
        console.log("Message sent", response);
      }
    );
  };

  // console.log('---', choseRoom?.RoomId);
  

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
            {isGroup
              ? data &&
                allRooms &&
                allRooms.map((room) => {
                  return (
                    <li key={room.id}>
                      <Group room={room} choseChat={setChoseRoom} />
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
            <NewGroupSetting setGroupInput={setGroupInput} setData={setData} />
          ) : (
            <FriendRequest />
          )}
        </div>
        <div
          className={Style.right}
          key={!isGroup ? userFriend?.id : choseRoom?.id}
        >
          {userFriend && !isGroup && (
            <Msg friendData={userFriend} myData={user} />
          )}
          {isGroup && choseRoom && (
            <GroupMsg
              groupInput={groupInput}
              room={choseRoom}
              setMessage={setMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
