"use client";
import FriendManagement from "./FriendManagement/FriendManagement";
import GameNotification from "./GameNotification/GameNotification";
import NewGroupSetting from "./NewGroupSetting/NewGroupSetting";
import { useSocketContext } from "@/contexts/socket-context";
import SlideButton from "./SlideButton/SlideButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GroupMsg from "./GroupMsg/GroupMsg";
import Blocked from "./Blocked/Blocked";
import Style from "./Chat.module.css";
import Direct from "./Direct/Direct";
import Group from "./Group/Group";
import Link from "next/link";
import Msg from "./Msg/Msg";

export default function Chat() {
  const { socket, Data, onlineSocket, gameSocket } = useSocketContext();
  const [isGroup, setGroup] = useState(false);
  let [friends, setFriends] = useState<UserArrayData>();
  let [user, setUser] = useState<User>();
  const [userFriend, setUserFriend] = useState<User_Friend>();
  const [groupInput, setGroupInput] = useState<GroupInput>();
  const [allRooms, setAllRooms] = useState<AllRooms[]>();
  const [room, setRoom] = useState<AllRooms>();
  const [game, setGame] = useState<gameRequest[]>([]);
  const [blocked, setBlocked] = useState<FriendRequest2[]>([]);
  const router = useRouter();

  useEffect(() => {
    socket.on("updateUI", (messaged: string) => {
      console.log(messaged);

      if (messaged.split(" ")[0] === "kickUser") {
        if (messaged.split(" ")[1] === Data.response.user.username) {
          setRoom(undefined);
        }
      } else if (messaged.split(" ")[0] === "banUser") {
        if (messaged.split(" ")[1] === Data.response.user.username) {
          setRoom(undefined);
        }
      } else if (messaged.split(" ")[0] === "changePermission") {
        if (messaged.split(" ")[1] === Data.response.user.username) {
          setRoom(undefined);
        } else if (messaged.split(" ")[2] === Data.response.user.username) {
          setRoom(undefined);
        }
      } else if (messaged.split(" ")[0] === "changeFriend") {
        if (messaged.split(" ")[1] === Data.response.user.username) {
          fetching();
        } else if (messaged.split(" ")[2] === Data.response.user.username) {
          fetching();
        }
      } else if (messaged.split(" ")[0] === "JoinUsertoRoom") {
        if (messaged.split(" ")[1] === Data.response.user.username) {
          setRoom(undefined);
        } else if (messaged.split(" ")[2] === Data.response.user.username) {
          setRoom(undefined);
          // fetching();s
        }
      } else if (messaged.split(" ")[0] === "leaveChatRoom") {
        if (messaged.split(" ")[1] === Data.response.user.username) {
          setRoom(undefined);
          // fetching();
        }
      } else if (messaged.split(" ")[0] === "joinChatRoom") {
        if (messaged.split(" ")[1] === Data.response.user.username) {
          setRoom(undefined);
        }
      } else if (messaged.split(" ")[0] === "block") {
        if (messaged.split(" ")[1] === Data.response.user.username) {
          fetching();
          setUserFriend(undefined);
        } else if (messaged.split(" ")[2] === Data.response.user.username) {
          fetching();
          setUserFriend(undefined);
        }
      } else if (messaged.split(" ")[0] === "game") {
        if (messaged.split(" ")[1] === Data.response.user.username) {
          console.log('chat', socket);
          console.log('game', gameSocket);
          console.log('online', onlineSocket);
          router.push(
            `/users/${Data.response.user.username}/${
              Data.response.user.username
            }-vs-${messaged.split(" ")[2]}`
          );
        }
      }

      socket.emit(
        "chatRoomOfUser",
        {
          username: Data.response.user.username,
        },
        (response: AllRooms[]) => {
          setAllRooms(response);
        }
      );
    });
    console.log('im here');
    

    gameSocket.on("inviteFriend", (response: gameRequest) => {
      console.log("new invire for game in chat: ", response);
      if (!game.length) setGame([response]);
      else
        game.map((request) => {
          if (request.sender.username !== response.sender.username)
            setGame((prevGame) => [...prevGame, response]);
        });
    });

    fetching();
  }, []);

  useEffect(() => {
    // Use a setTimeout to remove the first element after 10 seconds
    const timeout = setTimeout(() => {
      setGame((prevGame) => {
        if (prevGame.length > 0) {
          const updatedGame = [...prevGame];
          updatedGame.splice(0, 1); // Remove the first element
          return updatedGame;
        }
        return prevGame; // No change if the array is empty
      });
    }, 15000); // 10 seconds in milliseconds

    // Clear the timeout to prevent it from running if the component unmounts
    return () => clearTimeout(timeout);
  }, [game]);

  useEffect(() => {
    socket.emit(
      "chatRoomOfUser",
      {
        username: Data.response.user.username,
      },
      (response: AllRooms[]) => {
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

  const fetching = async () => {
    const resFriend = await fetch("http://localhost:3000/api/chat");
    const friend = await resFriend.json();
    setFriends(friend);

    const resUser = await fetch("http://localhost:3000/api/home");
    const user = await resUser.json();
    setUser(user);

    const resBlocked = await fetch(
      `http://localhost:3001/users/profile/${Data.response.user.username}/blocked`,
      {
        cache: "no-cache",
        headers: { authorization: `Bearer ${Data.response.token}` },
      }
    );
    const blocked = await resBlocked.json();
    setBlocked(blocked);
  };

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
          <Link
            href={`/users/${Data.response.user.username}`}
            className={Style.profileBtn}
          >
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
        <Link
          href={`/users/${Data.response.user.username}`}
          className={Style.profileBtn}
        >
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
            {!isGroup &&
              blocked &&
              blocked.map((user) => {
                return (
                  <li key={user.id}>
                    <Blocked data={user.friend} />
                  </li>
                );
              })}
          </ul>
          {isGroup ? (
            <NewGroupSetting setGroupInput={setGroupInput} />
          ) : (
            <FriendManagement setGroupInput={setGroupInput} friends={friends} />
          )}
          {game && <GameNotification data={game} />}
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
