import React, { useEffect } from "react";
import "./chat-friends.css";
import ChatFriend from "./chat_friend/chat_friend";
import Image from "next/image";
import { cookies } from "next/headers";

async function ChatFriends() {
  let cookieStore = cookies();
  const data: Friend[] = await fetch(
    "http://localhost:3000/api/friends",
    {
      credentials: "same-origin",
      headers: {
        cookie: "userData=" + cookieStore.get("userData")?.value,
        SameSite: "none",
      },
    }
  ).then(data =>  data.json()).then(test => test.friends);
  console.log(data);

  return (
    <div className="friends__container">
      {data.map((F) => { return (<ChatFriend friend={F}/>); })}
    </div>
  );
}

export default ChatFriends;
